const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isIsp,
} = require("../controllers/auth");
const {
  createPack,
  activePack,
  getRechargeById,
} = require("../controllers/recharge");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("rechargeId", getRechargeById);

// Actual Routes

// Create Pack
router.post(
  "/createPack/:userId",
  [
    check("packname", "packname should be atleast 5 char!").isLength({
      min: 5,
    }),
    check("description", "Description should be atleast 7 char!").isLength({
      min: 7,
    }),
    check("validity", "Validity should be atleast 3 char!").isLength({
      min: 3,
    }),
    check("packprice", "packprice should be Number!").isNumeric(),
    check("option", "Option should be atleast 3 char!").isLength({
      min: 3,
    }),
  ],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createPack
);

//SetPackToActive
router.post(
  "/setActivePack/:userId/:rechargeId",
  isSignedIn,
  isAuthenticated,
  isIsp,
  activePack
);
