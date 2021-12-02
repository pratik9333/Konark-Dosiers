const Order = require("../models/order");

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
  console.log(12);
  Order.find()
    .populate("user", "_id firstname ")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Orders Found in DB!",
        });
      }

      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot Update Status",
        });
      }
      res.json(order);
    }
  );
};
