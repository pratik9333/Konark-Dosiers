const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
  try {
    const userCart = await Cart.find({ user: req.profile._id });
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (userCart.length !== 0) {
      for (let item of userCart[0].products) {
        if (item.product._id.toString() === req.params.id) {
          return res.status(400).json({ error: "Product is already in cart" });
        }
      }
      userCart[0].products.push({
        product: req.params.id,
        price: product.price,
      });
      userCart[0].total += product.price;
      await userCart[0].save();
    } else {
      const products = [
        {
          product: req.params.id,
          price: product.price,
        },
      ];

      await Cart.create({
        products,
        total: product.price,
        user: req.profile._id,
      });
    }
    return res.status(200).json({ success: "Added to cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};

exports.updateCart = async (req, res) => {
  const { incr, decr } = req.body;

  if (incr == null && decr == null) {
    return res
      .status(400)
      .json({ error: "Please send details to update cart" });
  }

  try {
    const userCart = await Cart.find({ user: req.profile._id });

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    let findItem = userCart[0].products.findIndex(
      (item) => item.product._id.toString() === req.params.id
    );

    if (findItem <= -1) {
      return res.status(400).json({ error: "Product was not found in cart" });
    }

    if (incr) {
      userCart[0].products[findItem].quantity += 1;
      userCart[0].products[findItem].price =
        product.price * userCart[0].products[findItem].quantity;
      userCart[0].total += product.price;
    }
    if (decr) {
      if (userCart[0].products[findItem].quantity > 1) {
        userCart[0].products[findItem].quantity -= 1;
        userCart[0].products[findItem].price =
          product.price * userCart[0].products[findItem].quantity;
        userCart[0].total -= product.price;
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Quantity cannot be decreased" });
      }
    }
    await userCart[0].save();

    return res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};

exports.getUserSpecificCartItems = async (req, res) => {
  try {
    const userCart = await Cart.find({ user: req.profile._id });
    if (userCart.length !== 0) {
      return res.status(200).json({ userCart });
    } else {
      return res.status(200).json({ message: "Cart is empty" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const userCart = await Cart.find({ user: req.profile._id });

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    let findItem = userCart[0].products.findIndex(
      (item) => item.product._id.toString() === req.params.id
    );

    if (findItem <= -1) {
      return res.status(400).json({ error: "Product was not found in cart" });
    }

    if (userCart[0].products.length === 1) {
      await userCart[0].remove();
    } else {
      userCart[0].total =
        userCart[0].total -
        product.price * userCart[0].products[findItem].quantity;

      userCart[0].products.splice(findItem, 1);
      await userCart[0].save();
    }

    return res
      .status(200)
      .json({ success: true, message: "Item deleted from cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};

exports.removeAllUserItem = async (req, res) => {
  try {
    await Cart.findById(req.params.id).remove();

    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};