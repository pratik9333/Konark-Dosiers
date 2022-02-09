const mongoose = require("mongoose");
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
    validityMonth: {
      type: Number,
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
      required: true,
      enum: ["sd", "hd"],
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
