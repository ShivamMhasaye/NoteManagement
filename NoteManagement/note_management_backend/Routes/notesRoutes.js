const notesRouter = require("express").Router();
const NotesModel = require("../models/notes");

notesRouter.post("/Add", async (req, res) => {
  const data = new NotesModel({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
    location: req.body.location,
    collaborator: req.body.collaborator,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
    // console.log(req.body);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

notesRouter.get("/getAll/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const data = await NotesModel.find({
      username: username,
      location: "main",
    });
    res.json(data);
    // console.log(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

notesRouter.get("/getAll/:username/:location", async (req, res) => {
  try {
    const data = await NotesModel.find({
      $or: [
        { username: req.params.username },
        { collaborator: req.params.username },
      ],
      location: req.params.location,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

notesRouter.patch("/modify/:id", async (req, res) => {
  try {
    const data = await NotesModel.findById(req.params.id);
    const updatedData = req.body;
    console.log(updatedData);
    const options = { new: true };
    const result = await NotesModel.findByIdAndUpdate(
      data._id,
      updatedData,
      options
    );
    res.send(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

notesRouter.delete("/delete/:id", async (req, res) => {
  try {
    const data = await NotesModel.findByIdAndDelete(req.params.id);
    res.send(`Note has been deleted`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

notesRouter.get("/get/:id", async (req, res) => {
  try {
    // const id = {_id: ObjectId(req.params.id)};
    const data = await NotesModel.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.send(500).json("Internal Server Error");
  }
});

module.exports = notesRouter;
