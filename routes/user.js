const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getAllUsers,
  getAllIsp,
  deleteUser,
} = require("../controllers/user");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isIsp,
} = require("../controllers/auth");

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

module.exports = router;
