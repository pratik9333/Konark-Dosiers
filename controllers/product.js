const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("rechargePlans")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const { rechargeId } = req.body;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //destructure the fields
    const { name, description, price, stock } = fields;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({
        error: "please include all fields",
      });
    }

    let product = new Product(fields);

    //handle files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    if (rechargeId) {
      product.rechargePlans.push(rechargeId);
    }

    // Save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving DTH BOX in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//MiddleWare
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.ContentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// delete controller

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete product!",
      });
    }
    res.json({
      message: "Deletion was success",
      deletedProduct,
    });
  });
};

// update controller
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //Updation Code
    let product = req.product;
    product = _.extend(product, fields);

    //handle files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product in DB failed",
        });
      }
      res.json(product);
    });
  });
};

//Product Listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.limit : "_id";

  Product.find()
    .select("-photo")
    .populate("rechargePlans")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No Products found!",
        });
      }
      res.json(products);
    });
};

exports.updateStock = async (req, res, next) => {
  const products = req.body.product;
  try {
    if (req.profile.activePack.recharge && req.body.recharge) {
      return res
        .status(400)
        .json({ error: "User has already purchased new connection" });
    }
    for (let product of products) {
      await Product.findByIdAndUpdate(product.product, {
        $inc: { stock: -1, sold: +1 },
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};
