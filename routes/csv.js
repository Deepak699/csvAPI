//Importing Modules
const express = require("express");
const multer = require("multer");
const csv = require("csvtojson");
const Users = require("../models/Users");
const fs = require('fs')
const router = express.Router()


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
  router.post("/uploads", upload.single("file"), async (req, res) => {
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
        //Removing File after Storing its Data
        fs.unlinkSync('./Excel/'+name)
        res.redirect('/')
        res.status(200).send();
        
        
        
      });
  });

  module.exports = router