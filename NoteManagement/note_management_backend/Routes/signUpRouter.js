const signUpRouter = require("express").Router();
const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const validator = require("validator");

signUpRouter.post("/Add", async (req, res) => {
  const data = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
  });

  const rePassword = req.body.rePassword;

  const user = await UserModel.findOne({ username: data.username });

  if (user) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const usernameRegex = /^(?=.{6,20}$)[a-zA-Z0-9]+$/;

  if (data.username.length < 6 || data.username.length > 20) {
    return res.status(400).json({
      error: "Username should be more than 6 and less than 20 characters",
    });
  }

  if (!usernameRegex.test(data.username)) {
    return res
      .status(400)
      .json({ error: "Username must not contain any special characters" });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])(.{8,20})$/;

  if (data.password.length < 8 || data.password.length > 20) {
    return res.status(400).json({
      error: "Password should be more than 8 and less than 20 characters",
    });
  }
  if (!passwordRegex.test(data.password)) {
    return res.status(400).json({
      error:
        "Password must contain a capital letter, a small letter, a number and a special character",
    });
  }

  if (!validator.isEmail(data.email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  if (!validateDateOfBirth(data.dob)) {
    return res
      .status(400)
      .json({ error: "You should be at least 5 years old" });
  }

  if (data.password !== rePassword) {
    return res.status(400).json({ error: "Passwords doesn't match" });
  }

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(data.password, salt, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        // Handle error gracefully (e.g., log, inform user)
        return;
      }

      data.password = hash;
      console.log("Hashed password:", hash);
      // Store the hash in your database securely
      try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        console.log(data);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  });
});

function validateDateOfBirth(dateOfBirth) {
  // Get today's date
  const today = new Date();
  console.log(today);
  // Convert date of birth to Date object
  const dob = new Date(dateOfBirth);
  console.log(dob);
  // Calculate minimum allowed date by subtracting 5 years from today
  const minAllowedDob = new Date(
    today.getFullYear() - 5,
    today.getMonth(),
    today.getDate()
  );

  // Check if date of birth is greater than or equal to the minimum allowed date
  return dob <= minAllowedDob;
}

module.exports = signUpRouter;
