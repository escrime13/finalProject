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
app.use("uploads", express.static("uploads"));
app.use("/", express.static("public")); // Needed for local assets
app.use("/img", express.static("public/img"));
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
app.post("/createDogProfiles", upload.array("img"), async (req, res) => {
  console.log("request to createDogProfiles:", req.body);
  let files = req.files;
  let frontendPath = [];
  if (req.files.length > 0) {
    frontendPath = [];
    files.forEach(image => {
      frontendPath.push("/uploads/" + image.filename);
    });
  }
  let creationDate = new Date();
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
      creationDate
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
        res.json({ success: false, message: " " });
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
app.get("/dogProfiles", async (req, res) => {
  console.log("request to get the dog Profiles");
  let sessionId = req.cookies.sid;
  let human = await dbFindOne("humanProfile", { sessionId: sessionId });
  if (human !== null) {
    let dogProfiles = Promise.all(
      human.dogProfilesId.map(async profile => {
        let oneDog = await dbFindOne("dogProfile", { _id: ObjectID(profile) });
        return oneDog;
      })
    );
    console.log("dogProfiles", dogProfiles);
    if ((await dogProfiles) === null) {
      res.send({
        success: false,
        message: "There are no dog profiles associated to this human"
      });
    }
    if ((await dogProfiles) !== null) {
      res.send({ success: true, dogProfiles: await dogProfiles });
    }
  }
});
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
