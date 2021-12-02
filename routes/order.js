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
  getOrderStatus,
} = require("../controllers/order");

//Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);
router.param("productId", getProductById);

//Actualroutes

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
router.get("/orders/all/:userId", isSignedIn, isAuthenticated, getAllOrders);

//Status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
