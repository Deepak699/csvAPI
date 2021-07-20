const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  phoneno: {
    type: Number,
  },
});
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
