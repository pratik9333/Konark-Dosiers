const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const rechargeSchema = new mongoose.Schema(
  {
    packname: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    validity: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    packprice: {
      type: Number,
      trim: true,
      maxlength: 32,
      required: true,
    },
    option: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    isp: {
      type: ObjectId,
      ref: "Isp",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
