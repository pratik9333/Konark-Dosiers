const Recharge = require("../models/recharge");
const { validationResult } = require("express-validator");
let moment = require("moment");

exports.getRechargeById = (req, res, next, id) => {
  Recharge.findById(id).exec((err, recharge) => {
    if (err || !recharge) {
      return res.status(400).json({
        error: "No Recharge Pack was found in DB",
      });
    }
    req.recharge = recharge;
    next();
  });
};

exports.createPack = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const recharge = new Recharge(req.body);

  recharge.save((err, rechargeinfo) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "NOT able to save Recharge Pack in DB",
      });
    } else {
      res.json(rechargeinfo);
    }
  });
};

exports.setActivePack = (req, res) => {
  Recharge.findByIdAndUpdate(
    { _id: req.recharge._id },
    { $set: { activated: true } },
    { new: true },
    (err, recharge) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this information",
        });
      }
      res.json(recharge);
    }
  );
};

exports.showActivePack = (req, res) => {
  Recharge.find(
    {
      activated: true,
    },
    (err, recharges) => {
      res.json(recharges);
    }
  );
};

exports.showPacks = (req, res) => {
  Recharge.find({}, (err, recharges) => {
    res.json(recharges);
  });
};

exports.removePack = (req, res) => {
  let recharge = req.recharge;
  recharge.remove((err, deletedRecharge) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete product!",
      });
    }
    res.json({
      message: "Deletion was success",
      deletedRecharge,
    });
  });
};

exports.checkPackExpiry = async (req, res) => {
  try {
    const user = req.profile;

    if (user.activePack.recharge) {
      const startDate = new Date(Date.now());
      let currentDate = moment(startDate);

      if (currentDate.format("Do MMMM YYYY") > user.activePack.expiresAt) {
        user.activePack = undefined;
      }
      await user.save();
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server has occured has problem, please try again" });
  }
};
