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
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
