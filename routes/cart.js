const router = require("express").Router();

const { getUserById } = require("../controllers/user");
const {
  addToCart,
  updateCart,
  getUserSpecificCartItems,
  removeCart,
  removeAllUserItem,
} = require("../controllers/cart");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//Params
router.param("userId", getUserById);

//crud operations in cart
router
  .route("/cart/:userId/:id")
  .post(isSignedIn, isAuthenticated, addToCart)
  .put(isSignedIn, isAuthenticated, updateCart)
  .delete(isSignedIn, isAuthenticated, removeCart);

//get cart items
router
  .route("/cart/:userId")
  .get(isSignedIn, isAuthenticated, getUserSpecificCartItems);

//delete all user items
router
  .route("/cart/:userId")
  .delete(isSignedIn, isAuthenticated, removeAllUserItem);

module.exports = router;
