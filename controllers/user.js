const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encryPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find({ role: "user" })
    .select("firstname lastname email phone activePack")
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "No Users Found",
        });
      }
      res.json(users);
    });
};

exports.getAllIsp = (req, res) => {
  User.find({ role: "isp" })
    .select("firstname lastname email phone role")
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "No Users Found",
        });
      }
      res.json(users);
    });
};

exports.updateUser = (req, res) => {
  const filter = { email: req.body.email };
  const update = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    phone: req.body.phone,
  };
  User.findOneAndUpdate(filter, update, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to update this information",
      });
    }
    user.salt = undefined;
    user.encryPassword = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    res.json(user);
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.body._id).exec((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: "Not Deleted",
      });
    }
    res.json(deletedUser);
  });
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id firstname lastname")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  // Store this in DB
  console.log(req.body);
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
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { orders: order_obj } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};

exports.addToActivePack = (req, res, next) => {
  // Store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { recharge: req.body.recharge } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save Recharge Pack list",
        });
      }
      res.json(purchases);
    }
  );
};
