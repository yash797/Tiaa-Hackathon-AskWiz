require("dotenv").config();
const User = require("../models/User.js");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {
  // console.log("Body:",req.body)
  const errors = validationResult(req);
  // user.description = req.body.description;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  } 

  const user = new User(req.body);
  // req.file will come from frontend
  // user.picturePath = req.file.picturePath; // add this line to store the file path in the user object

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        // 400 Status Code as Bad Request
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      Name: user.Name,
      email: user.email,
      id: user._id
    });
  });
};


exports.signin = (req, res) => {
  console.log("Body:",req.body)

  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 999 });

    // send response to frontend
    const { _id, Name, email } = user;
    return res.json({ token, user: { _id, Name, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "User Signout Successfully",
  });
};


// protected routes
// exports.isSignedIn = expressJwt({
//   secret: process.env.SECRET,
//   userProperty: "auth",
// });
