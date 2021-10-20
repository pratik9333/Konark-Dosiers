var express = require("express");
var router = express.Router();

const {
  getUserById,
  pushOrderInPurchaseList,
  setActivePack,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  //   getAllOrders,
  //   updateStatus,
  //   getOrderStatus,
} = require("../controllers/order");

//Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actualroutes

//create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  setActivePack
);
