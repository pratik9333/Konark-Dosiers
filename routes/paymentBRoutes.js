var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { razorpay, successrazorpay } = require("../controllers/paymentb");

router.param("userId", getUserById);

router.post("/payment/:userId", isSignedIn, isAuthenticated, razorpay);
router.post("/payment/success/:userId", successrazorpay);

module.exports = router;
