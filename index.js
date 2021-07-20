//Requiring Modules
const express = require("express");
const multer = require("multer");
require('dotenv').config()
const csv = require("csvtojson");
const util = require("util");
const Users = require("./models/Users");
require("./db/db");
const app = express();

//File Upload Validation
const upload = multer({
  dest: "Excel",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(".csv")) {
      return cb(new Error("Please upload a Excel File"));
    }

    cb(undefined, true);
  },
});

//Route to upload File
app.post("/uploads", upload.single("file"), async (req, res) => {
  const name = req.file.filename;
  let arr = [];
  //converting Excel data into JSON obj
  csv()
    .fromFile("./Excel/" + name)
    .then((jsonObj) => {
      //Looping throught every data in csv file and sending it to database
      for (let i = 0; i < jsonObj.length; i++) {
        try {
          const user = new Users(jsonObj[i]);
          user.save();
        } catch (e) {
          return res.status(400).send();
        }
      }
      res.status(200).send();
    });
});

//Server Port to listen
app.listen("3000", () => {
  console.log("Running");
});
