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
  req.body.order.user = req.profile;
  console.warn(req.body.order);
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
  });
  next();
};
