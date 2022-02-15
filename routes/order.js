var express = require("express");
var router = express.Router();

const {
  getUserById,
  pushOrderInPurchaseList,
  addToActivePack,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock, getProductById } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getUserOrders,
} = require("../controllers/order");

//Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);
router.param("productId", getProductById);

//Actualroutes

// get user orders
router.get("/orders/:userId", isSignedIn, isAuthenticated, getUserOrders);

//create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder,
  addToActivePack
);

//read
router.get(
  "/orders/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
