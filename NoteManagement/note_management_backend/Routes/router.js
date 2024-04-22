const router = require("express").Router();
const loginRouter = require("./loginRoutes");
const notesRouter = require("./notesRoutes");
const signUpRouter = require("./signUpRouter");

router.use("/login", loginRouter);
router.use("/signUp", signUpRouter);
router.use("/notes", notesRouter);

module.exports = router;
