var express = require("express");
var router = express.Router();

const { getUserById, addToActivePack } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock, getProductById } = require("../controllers/product");
const { removeAllUserItem } = require("../controllers/cart");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getUserOrders,
  downloadInvoice,
  viewInvoice,
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
  updateStock,
  createOrder,
  addToActivePack,
  removeAllUserItem
);

//read
router.get(
  "/orders/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//view order invoice
router.get("/order/view/:id", viewInvoice);

//download order invoice
router.get("/order/download/:id", downloadInvoice);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
