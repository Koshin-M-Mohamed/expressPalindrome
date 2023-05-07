const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const port = 8080;
var db, collection;
const ObjectId = require("mongodb").ObjectID;

const url =
  "mongodb+srv://koshinmongo:myMongo@cluster0.ozyrwol.mongodb.net/palindrome?retryWrites=true&w=majority";
const dbName = "palindrome";

app.listen(port, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
      console.log("LISTENING AT PORT #", port);
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  db.collection("palindrome")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", {
        result: result,
      });
    });
});
app.post("/api", (req, res) => {
  let word = req.body.palindrome;
  console.log(req.body.palindrome);

  if (word.toLowerCase() == word.toLowerCase().split("").reverse().join("")) {
    result = "Palindrome";
  } else {
    result = "Not A Palindrome";
  }

  db.collection("palindrome").save(
    { result: result, id: new ObjectId(), word: word },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/index.ejs");
    }
  );
});

app.delete("/delete", (req, res) => {
  db.collection("palindrome").findOneAndDelete(
    { id: ObjectId(req.body.id) },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
