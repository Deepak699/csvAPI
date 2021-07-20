// Connecting to Database

const mongoose = require("mongoose");
module.exports = mongoose
  .connect(
    process.env.MONGODB_URL,
    { useUnifiedTopology: true, useNewUrlParser: true, dbName: "fileupload" }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
