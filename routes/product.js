const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/product.js");
const { getUserById } = require("../controllers/user.js");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/auth.js");

// all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

// all of actual routes
// create route
router.post(
  "/product/create/:packid/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// read route
router.get("/product/:productId", getProduct);

// MiddleWare
router.get("/product/photo/:productId", photo);

// delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// listing routes
router.get("/products", getAllProducts);

module.exports = router;
