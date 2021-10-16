const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      maxlength: 32,
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    rechargePlans: [
      {
        type: ObjectId,
        ref: "Recharge",
      },
    ],
    isp: {
      type: ObjectId,
      ref: "Isp",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
