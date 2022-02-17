const Order = require("../models/order");
const Recharge = require("../models/recharge");
const User = require("../models/user");
const moment = require("moment");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("product", "name price")
    .exec((err, order) => {
      if (err) {
        res.json(400).json({
          error: "No Order Found In DB",
        });
      }

      req.order = order;
      next();
    });
};

exports.createOrder = (req, res, next) => {
  req.body.user = req.profile;
  const order_obj = {
    address: {
      fulladdress: req.body.address.fulladdress,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
      Country: req.body.address.Country,
    },
    amount: req.body.amount,
    product: req.body.product,
    user: req.body.user,
    transaction_id: req.body.paymentId,
    order_id: req.body.orderId,
  };
  const order = new Order(order_obj);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
  });
  next();
};

exports.getAllOrders = (req, res) => {
  Order.find({ user: req.body.userid }).exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "No Orders Found in DB!",
      });
    }

    res.json(order);
  });
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.profile._id });

    if (orders.length > 0) {
      return res.status(200).json({ success: true, orders });
    }

    return res.status(200).json({ success: true, message: "No orders found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (order.status === "Delivered") {
      const user = await User.findById(order.user);

      if (
        user.activePack !== undefined &&
        user.activePack.expiresAt ===
          "Subscription starts after product delivers"
      ) {
        const rechargePack = await Recharge.findById(user.activePack.recharge);
        const val = rechargePack.validityMonth;

        const startDate = new Date(Date.now());
        let endDateMoment = moment(startDate);
        endDateMoment.add(val, "months").format("Do MMMM YYYY");

        user.activePack.expiresAt = endDateMoment.format("Do MMMM YYYY");
        user.newUser = false;
        await user.save();
      }
    }

    return res.status(200).json({ message: "Order updated" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "Server Error" });
  }
};
