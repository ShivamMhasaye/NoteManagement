const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  // label: {
  //   type: String,
  //   required: false,
  // },
  location: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: false,
  // },
  // theme: {
  //   type: String,
  //   required: false,
  // },
  collaborator: {
    type: String,
    required: false,
  },
});

// model has two properties collection name and schema.
const NotesModel = mongoose.model("notes", NotesSchema);

module.exports = NotesModel;
