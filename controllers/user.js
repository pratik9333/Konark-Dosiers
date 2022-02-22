const User = require("../models/user");
const Order = require("../models/order");
const Recharge = require("../models/recharge");
const moment = require("moment");

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

exports.getUser = async (req, res) => {
  const user = await User.findById(req.profile._id);

  user.encryPassword = undefined;
  user.salt = undefined;
  user.__v = undefined;
  user.createdAt = undefined;
  //eq.profile.orders = req.profile.orders.length;
  return res.json(user);
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

exports.setNewPackForUser = async (req, res) => {
  try {
    let startDate;
    let currentDate;
    startDate = new Date(Date.now());
    currentDate = moment(startDate);
    const user = req.profile;

    const rechargePack = await Recharge.findById(req.params.packId);

    const val = rechargePack.validityMonth;

    if (user.newUser) {
      return res
        .status(401)
        .json({ error: "You do not have any new connection" });
    }
    if (user.activePack.expiresAt !== null) {
      return res
        .status(401)
        .json({ error: "Your current pack is still active" });
    }

    let endDateMoment = moment(startDate);

    endDateMoment.add(val, "months");

    await User.findByIdAndUpdate(req.profile._id, {
      "activePack.recharge": req.params.packId,
      "activePack.expiresAt": endDateMoment.format("Do MMMM YYYY"),
    });

    return res.status(200).json({
      success: true,
      message:
        "Selected Pack has been added to user's account, your pack will be active in few minutes",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server has occured some problem, please try again" });
  }
};

exports.pushOrderInPurchaseList = async (req, res, next) => {
  // Store this in DB

  const currentUser = await User.findById(req.profile._id);

  if (req.body.recharge) {
    if (currentUser.newUser === false) {
      return res.status(401).json({
        error:
          "User has already old connection, please contact your isp for more details",
      });
    }
  }

  const order_obj = {
    address: {
      fulladdress: req.body.address.fulladdress,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
      Country: req.body.address.Country,
    },
    amount: req.body.amount,
    product: req.body.product,
    transaction_id: req.body.paymentId,
    order_id: req.body.orderId,
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

exports.addToActivePack = async (req, res, next) => {
  // Store this in DB

  try {
    if (req.body.recharge) {
      await User.findByIdAndUpdate(req.profile._id, {
        "activePack.recharge": req.body.recharge,
        "activePack.expiresAt": "Subscription starts after product delivers",
      });
    }

    next();
  } catch (error) {
    await Order.find({ user: req.profile._id }).remove();
    return res
      .status(200)
      .json({ success: false, message: "Order failed to create" });
  }
};
