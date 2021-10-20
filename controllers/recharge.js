const Recharge = require("../models/recharge");

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

exports.activePack = (req, res) => {
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
