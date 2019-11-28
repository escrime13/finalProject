let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let hash = require("object-hash");
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("uploads", express.static("uploads"));
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

let mongoFindOne = async (collectionName, criteria) => {
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
let mongoInsertOne = async (collectionName, document) => {
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
let mongoUpdate = async (collectionName, criteria, projection) => {
  return new Promise((res, rej) => {
    dbo
      .collection(collectionName)
      .findOne(criteria, projection, (err, result) => {
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
  console.log(req.body);
  let {
    username,
    humanFirstName,
    humanLastName,
    neighborhoods,
    humanAvailabilities
  } = req.body;
  let password = hash({ passwordHashed: req.body.password });

  let user = await mongoFindOne("humanProfile", { username: username });
  if (user !== null) {
    console.log("username already taken");
    res.json({ success: false, message: "Username already taken" });
    return;
  }
  if (user === null) {
    console.log("username available");
    let sessionId = generateSessionId();
    res.cookie("sid", sessionId);
    let user_id = await mongoInsertOne("humanProfile", {
      username,
      password,
      humanFirstName,
      humanLastName,
      humanAvailabilities,
      neighborhoods
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
app.post("/dogProfiles", upload.array("img"), (req, res) => {
  console.log(req.body);
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
    energyLevel,
    pictures
  } = req.body;

  let user = mongoFindOne("dogProfile", { dogName: dogName });
  if (user) {
    console.log("username already taken");
    res.json({ success: false, message: "Name already taken" });
  }
  console.log("dogName available");
  mongoInsertOne("dogProfile", {
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
    pictures
  });
});
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
