const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  token: {
    type: String,
    default: "",
    required: false,
  },
});

// model has two properties collection name and schema.
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
