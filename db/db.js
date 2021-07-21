// Connecting to Database

const mongoose = require("mongoose");
module.exports = mongoose
  .connect(
    'mongodb+srv://fileupload:B87gRKZ3ZFafS0fH@cluster0.wg1xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true, dbName: "fileupload" }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
