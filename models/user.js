const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    activePack: {
      recharge: {
        type: ObjectId,
        ref: "recharge",
      },
      expiresAt: {
        type: String,
      },
    },
    newUser: {
      type: Boolean,
      default: true,
    },
    orders: {
      type: Array,
      default: [],
    },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "isp", "admin"],
      required: true,
    },
    encryPassword: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryPassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encryPassword;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);
