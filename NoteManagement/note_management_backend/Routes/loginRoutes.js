const loginRouter = require("express").Router();
const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const SendResetPasswordMail = async (name, email, OTP) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "InLine Password Recovery",
      html: `<p>Hi ${name}, your OTP for Password Recovery is ${OTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been sent:-", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const login = async (req, res) => {
  const data = req.body;
  const user = await UserModel.findOne({ username: data.username });
  if (!user) {
    return res.status(401).send("Invalid Username or Password");
  }
  bcrypt.compare(data.password, user.password, async (err, response) => {
    if (err) {
      console.log(err);
    }
    // const isPasswordValid = response;
    if (!response) {
      return res.status(401).send("Invalid Username or Password");
    }
    const accessToken = await generateAccessToken({ user: user });
    return res.status(200).json({
      success: true,
      msg: "Login Successfully!",
      user: user,
      accessToken: accessToken,
      tokenType: "Bearer",
    });
  });
};

loginRouter.patch("/modify/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const updatedData = req.body;
    const options = { new: true };
    const result = await UserModel.findOneAndUpdate(
      username,
      updatedData,
      options
    );
    res.send(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

loginRouter.delete("/delete", async (req, res) => {
  try {
    const data = await UserModel.findOneAndDelete({
      username: req.body.username,
    });
    res.send(`document with ${data.username} has been deleted`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const forgetPassword = async (req, res) => {
  const username = req.params.username;
  const OTP = req.body.OTP;
  try {
    // const email = req.body.email;
    const userData = await UserModel.findOne({ username: username });
    console.log(userData);
    if (!userData) {
      res.status(401).json("Invalid Username");
    }
    SendResetPasswordMail(userData.username, userData.email, OTP);
    res.status(200).send({
      success: true,
      msg: "Please check your mail inbox and reset the password.",
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const resetpassword = async (req, res) => {
  const username = req.params.username;
  try {
    const userData = await UserModel.findOne({ username: username });
    if (userData) {
      const password = req.body.password;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])(.{8,20})$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Invalid password format" });
      }
      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
            return;
          }

          const newpassword = hash;
          console.log("Hashed password:", hash);
          try {
            const data = await UserModel.findOneAndUpdate(
              { _id: userData._id },
              { $set: { password: newpassword } },
              { new: true }
            );
            console.log(data);
            return res.status(200).json("Password Updated");
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        });
      });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "This Link has been expired" });
    }
  } catch (error) {
    return res.send(400).send({ success: false, msg: error.message });
  }
};

const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

loginRouter.post("/", login);

loginRouter.post("/forgetpassword/:username", forgetPassword);

loginRouter.patch("/resetpassword/:username", resetpassword);

module.exports = loginRouter;
