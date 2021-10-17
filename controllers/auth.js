const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
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
        error: "USER email does not exist!",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });

    //SEND RESPONSE TO FRONTEND
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "User signout successfully!",
  });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile);
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === "admin") {
    return res.status(403).json({
      error: "You are not admin!",
    });
  }
  next();
};
exports.isIsp = (req, res, next) => {
  if (req.profile.role === "isp") {
    return res.status(403).json({
      error: "You are not admin!",
    });
  }
  next();
};
