var express = require("express");
const { check } = require("express-validator");
var router = express.Router();
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/auth.js");

router.post(
  "/signup",
  [
    check("firstname", "FirstName should be atleast 3 char!").isLength({
      min: 3,
    }),
    check("lastname", "LastName should be atleast 3 char!").isLength({
      min: 3,
    }),
    check("email", "Email is invalid!").isEmail(),
    check("password", "password should be atleast 3 char!").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is invalid!").isEmail(),
    check("password", "password field is required!").isLength({ min: 3 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
