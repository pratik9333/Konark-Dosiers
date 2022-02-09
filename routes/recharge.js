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
  setActivePack,
  showActivePack,
  getRechargeById,
  showPacks,
  removePack,
} = require("../controllers/recharge");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("rechargeId", getRechargeById);

// Actual Routes

// Create Pack
router.post(
  "/createpack/:userId",
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
      min: 2,
    }),
  ],
  isSignedIn,
  isAuthenticated,
  isIsp,
  createPack
);

//SetPackToActive
router.post(
  "/setactivepack/:userId/:rechargeId",
  isSignedIn,
  isAuthenticated,
  isIsp,
  setActivePack
);

//showActivePacks
router.get("/showactivepack", showActivePack);

//showAllPacks
router.get("/packs/:userId", isSignedIn, isAuthenticated, isIsp, showPacks);

//removePack
router.delete(
  "/removepack/:userId/:rechargeId",
  isSignedIn,
  isAuthenticated,
  isIsp,
  removePack
);

module.exports = router;
