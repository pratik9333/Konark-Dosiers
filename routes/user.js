const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getAllUsers,
  getAllIsp,
  deleteUser,
  setNewPackForUser,
} = require("../controllers/user.js");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isIsp,
} = require("../controllers/auth.js");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, isAdmin, updateUser);
router.get("/users/:userId", isSignedIn, isAuthenticated, isIsp, getAllUsers);
router.get("/isp/:userId", isSignedIn, isAuthenticated, isAdmin, getAllIsp);
router.delete(
  "/user/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteUser
);

//set new pack for user
router.put(
  "/user/newpack/:userId/:packId",
  isSignedIn,
  isAuthenticated,
  setNewPackForUser
);

module.exports = router;
