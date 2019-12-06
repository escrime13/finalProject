let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let hash = require("object-hash");
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads"));
app.use("/", express.static("public")); // Needed for local assets
app.use("/img", express.static("public/images"));
let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@asmc-4xkvt.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(
  url,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    dbo = db.db("FluffyBuddies");
  }
);

let generateSessionId = () => {
  return "" + Math.floor(Math.random() * 1000000000000);
};

//function to retrieve information from Mongodb:
let dbFind = async (collectionName, criteria) => {
  return new Promise((res, rej) => {
    dbo
      .collection(collectionName)
      .find(criteria)
      .toArray((err, result) => {
        if (err) {
          rej(err);
          return;
        }
        res(result);
      });
  });
};

let dbFindOne = async (collectionName, criteria) => {
  return new Promise((res, rej) => {
    dbo.collection(collectionName).findOne(criteria, (err, user) => {
      if (err) {
        rej(err);
        return;
      }
      res(user);
    });
  });
};
let dbInsertOne = async (collectionName, document) => {
  return new Promise((res, rej) => {
    dbo.collection(collectionName).insertOne(document, (err, user_id) => {
      if (err) {
        rej(err);
        return;
      }
      res(user_id);
    });
  });
};
let dbUpdate = async (collectionName, criteria, projection) => {
  return new Promise((res, rej) => {
    dbo
      .collection(collectionName)
      .updateOne(criteria, projection, (err, result) => {
        if (err) {
          rej(err);
          return;
        }
        res(result);
      });
  });
};

// Your endpoints go after this line

app.post("/updateDogProfile", upload.single("img"), async (req, res) => {
  console.log("information to update human profile", req.body);
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  console.log("After map frontEndPath", frontendPath);
  let {
    dogName,
    dogAge,
    dogSex,
    dogBreed,
    dogHeight,
    dogWeight,
    likes,
    dislikes,
    interests,
    lookingFor,
    energyLevel
  } = req.body;

  let update = await dbUpdate(
    "dogProfile",
    {
      dogName: dogName
    },
    {
      $set: {
        dogName,
        dogAge,
        dogSex,
        dogBreed,
        dogHeight,
        dogWeight,
        likes,
        dislikes,
        interests,
        lookingFor,
        energyLevel
      }
    }
  );
  if (update === null) {
    res.send({ success: false });
  }
  if (update !== null) {
    res.send({ success: true });
  }
});
app.post("/humanUpdate", upload.none(""), async (req, res) => {
  console.log("information to update human profile", req.body);
  let { userName, humanFirstName, humanLastName } = req.body;
  let password = hash({ passwordHashed: req.body.password });
  let neighborhoodsClicked = JSON.parse(req.body.neighborhoodsClicked);
  let humanAvailabilities = JSON.parse(req.body.humanAvailabilities);
  let sessionId = req.cookies.sid;
  let update = await dbUpdate(
    "humanProfile",
    {
      sessionId: sessionId
    },
    {
      $set: {
        userName,
        password,
        humanFirstName,
        humanLastName,
        humanAvailabilities,
        neighborhoodsClicked
      }
    }
  );
  if (update === null) {
    res.send({ success: false });
  }
  if (update !== null) {
    res.send({ success: true });
  }
});

app.post("/signup", upload.none(""), async (req, res) => {
  console.log("request to sign up", req.body);
  let { userName, humanFirstName, humanLastName } = req.body;
  let password = hash({ passwordHashed: req.body.password });
  let neighborhoodsClicked = JSON.parse(req.body.neighborhoodsClicked);
  let humanAvailabilities = JSON.parse(req.body.humanAvailabilities);

  let user = await dbFindOne("humanProfile", { userName: userName });
  if (user !== null) {
    console.log("username already taken");
    res.json({ success: false, message: "Username already taken" });
    return;
  }
  if (user === null) {
    console.log("username available");
    let sessionId = generateSessionId();
    res.cookie("sid", sessionId);
    let dogProfilesId = [];
    let user_id = await dbInsertOne("humanProfile", {
      sessionId,
      userName,
      password,
      humanFirstName,
      humanLastName,
      humanAvailabilities,
      neighborhoodsClicked,
      dogProfilesId
    });
    if (user_id !== null) {
      console.log("New User Created, userID: ", user_id);
      res.json({ success: true }, "UserId:", user_id);
      return;
    }
    if (user_id === null) {
      console.log("User not created");
      res.json({ success: false });
    }
  }
});
app.post("/login", upload.none(), async (req, res) => {
  console.log("request to login", req.body);
  let lUserName = req.body.userName;
  let lPassword = hash({ passwordHashed: req.body.password });
  let human = await dbFindOne("humanProfile", { userName: lUserName });
  if (human === null || human.password !== lPassword) {
    res.json("Invalid username or password");
    return;
  }
  if (human.password === lPassword) {
    let sessionId = generateSessionId();
    res.cookie("sid", sessionId);
    let update = await dbUpdate(
      "humanProfile",
      { userName: lUserName },
      { $set: { sessionId: sessionId } }
    );
    if (update === null) {
      res.json({ success: false });
      return;
    }
    if (update !== null) {
      res.json({ success: true });
    }
  }
});
app.get("/isUserLoggedIn", async function(req, res) {
  let sessionId = req.cookies.sid;
  let human = await dbFindOne("humanProfile", { sessionId: sessionId });
  if (human === null) {
    console.log("no profile found");
    res.json({ success: false });
    return;
  }
  if (human !== null) console.log("profile found");
  res.json({ success: true });
});
app.post("/logout", upload.none(), (req, res) => {
  console.log("request to logout");
  let lgSessionId = req.cookies.sid;
  dbFindOne(
    "humanProfile",
    { sessionId: lgSessionId },
    { $set: { sessionId: " " } }
  );
  res.cookie("sid", { expires: Date.now() });
  res.json({ success: true });
});
app.post("/getADogProfile", upload.none(), async (req, res) => {
  console.log("request to /getADogProfile", req.body);
  let dog_id = req.body.dog_id;
  console.log("dog_id:", dog_id);
  let dog = await dbFindOne("dogProfile", { _id: ObjectID(dog_id) });
  if (dog !== null) {
    res.json({ success: true, dog: dog });
  }
  if (dog === null) {
    res.json({ success: false });
  }
});
app.post("/createDogProfiles", upload.single("img"), async (req, res) => {
  //console.log("request to createDogProfiles:", req.body);
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  console.log("After map frontEndPath", frontendPath);
  let creationDate = new Date();
  let messages = [];
  let {
    dogName,
    dogAge,
    dogSex,
    dogBreed,
    dogHeight,
    dogWeight,
    likes,
    dislikes,
    interests,
    lookingFor,
    energyLevel
  } = req.body;

  let dog = await dbFindOne("dogProfile", { dogName: dogName });
  if (dog !== null) {
    console.log("username already taken");
    res.json({ success: false, message: "Name already taken" });
  }
  if (dog === null) {
    console.log("dogName available");
    console.log("frontendPath:", frontendPath);
    let result = await dbInsertOne("dogProfile", {
      dogName,
      dogAge,
      dogSex,
      dogBreed,
      lookingFor,
      dogHeight,
      dogWeight,
      likes,
      dislikes,
      lookingFor,
      interests,
      energyLevel,
      frontendPath,
      creationDate,
      messages
    });
    if (result !== null) {
      console.log("dog_id: ", result.insertedId);
      let dogId = result.insertedId;
      let updateUserDogProfiles = await dbUpdate(
        "humanProfile",
        { sessionId: req.cookies.sid },
        { $push: { dogProfilesId: ObjectID(dogId) } }
      );
      if (updateUserDogProfiles === null) {
        console.log("there was an issue with the update");
        res.json({ success: false });
      }
      if (updateUserDogProfiles !== null) {
        console.log(
          "the profile was successfully updated:",
          updateUserDogProfiles
        );
        res.json({ success: true });
      }
    }
  }
});

app.post("/updateDogProfileWithMessage", upload.none(), async (req, res) => {
  console.log("Appending message to dog profile:", req.body);
  let dogId = req.body.dog_id;
  let message = JSON.parse(req.body.message);
  let updateDogProfileWithMessage = await dbUpdate(
    "dogProfile",
    { _id: ObjectID(dogId) },
    { $push: { messages: message } }
  );
  if (updateDogProfileWithMessage === null) {
    res.json({ success: false });
  }
  if (updateDogProfileWithMessage === null) {
    res.json({ success: true });
  }
});
app.post("/humanProfileByDogId", upload.none(), async (req, res) => {
  console.log("request to get the humanProfile by dog id", req.body);
  let dog_id = req.body.dog_id;
  dbo
    .collection("humanProfile")
    .findOne({ dogProfilesId: ObjectID(dog_id) }, (err, result) => {
      if (err) {
        rej(err);
        return;
      }
      console.log("result elem:", result);
      res.json({ success: true, humanProfile: result });
    });
  return;
});
app.get("/humanProfile", async (req, res) => {
  console.log("request to get the humanProfile");
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);
  let human = await dbFindOne("humanProfile", { sessionId: sessionId });
  console.log("human:", human);
  if (human === null) {
    res.json({ success: false });
  }
  console.log("human in if", human);
  if (human !== null) {
    res.json({ success: true, humanProfile: human });
  }
});

app.get("/dogProfiles", async (req, res) => {
  console.log("request to get the dog Profiles");
  let sessionId = req.cookies.sid;
  let human = await dbFindOne("humanProfile", { sessionId: sessionId });
  if (human !== null) {
    let dogProfiles = await Promise.all(
      human.dogProfilesId.map(async profile => {
        let oneDog = await dbFindOne("dogProfile", { _id: ObjectID(profile) });
        return oneDog;
      })
    );
    console.log("dogProfiles", dogProfiles);
    if (dogProfiles === null) {
      res.json({
        success: false
      });
    }
    if (dogProfiles !== null) {
      res.json({ success: true, dogProfiles: dogProfiles });
    }
  }
});
app.get("/allDogsProfiles", async (req, res) => {
  console.log("request to get all dogs Profiles");
  let dogProfiles = await dbFind("dogProfile", {});
  console.log("dogProfiles", dogProfiles);
  if ((await dogProfiles) === null) {
    res.send({
      success: false
    });
  }
  if ((await dogProfiles) !== null) {
    res.send({ success: true, dogProfiles: await dogProfiles });
  }
});
// Your endpoints go before this line
app.get("/public/images");

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
