const Order = require("../models/order.js");
const Recharge = require("../models/recharge.js");
const User = require("../models/user.js");
const path = require("path");
const puppeteer = require("puppeteer");
const moment = require("moment");
const { packRemainder } = require("../utils/scheduler.js");
const chromium = require("chrome-aws-lambda");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("product", "name price")
    .exec((err, order) => {
      if (err) {
        res.status(400).json({
          error: "No Order Found In DB",
        });
      }

      req.order = order;
      next();
    });
};

exports.cancelOrder = async (req) => {
  try {
    await Order.findByIdAndDelete(req.body.orderid);
    if (req.body.recharge) {
      const user = await User.findById(req.profile._id);
      user.activePack = undefined;
      await user.save();
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.createOrder = async (req, res, next) => {
  req.body.user = req.profile;
  const order_obj = {
    address: {
      fulladdress: req.body.address.fulladdress,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
      Country: req.body.address.Country,
    },
    amount: req.body.amount,
    products: req.body.product,
    user: req.body.user,
    transaction_id: req.body.paymentId,
    order_id: req.body.orderId,
  };

  const order = new Order(order_obj);
  req.body.orderid = order._id;
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
  });
  next();
};

exports.getAllOrders = (req, res) => {
  Order.find({ user: req.body.userid }).exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "No Orders Found in DB!",
      });
    }

    res.json(order);
  });
};

exports.viewInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user products.product"
    );

    if (order.products[0].product.rechargePlans.length > 0) {
      let rechargePlans = await Recharge.findById(
        order.products[0].product.rechargePlans[0]
      );

      //using order object to store pack information,
      //as these properties it will not be used in page rendering
      order.status = rechargePlans.packname;
      order.user.phone = rechargePlans.packprice;
    }

    res.render("invoice", { order: order?.toJSON() });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
exports.downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const url = `${baseUrl}/api/order/view/${req.params.id}`;

    const filePath = path.resolve(
      __dirname,
      `../public/Invoices/ORDER-${order._id}.pdf`
    );

    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: ["domcontentloaded", "networkidle0"] });
    await page.pdf({ path: filePath, format: "a4", printBackground: true });
    await browser.close();

    res.download(filePath);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.profile._id });

    if (orders.length > 0) {
      return res.status(200).json({ success: true, orders });
    }

    return res.status(403).json({ success: false, message: "No orders found" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: req.body.status,
      },
      { new: true }
    ).populate("products.product");

    if (order.status === "Delivered") {
      const user = await User.findById(order.user);

      if (
        user.activePack !== null &&
        order.products[0].product.rechargePlans.length > 0
      ) {
        const rechargePack = await Recharge.findById(user.activePack.recharge);
        const val = rechargePack.validityMonth;

        const startDate = new Date(Date.now());
        let endDateMoment = moment(startDate);
        endDateMoment.add(val, "days");

        user.activePack.expiresAt = endDateMoment.format("YYYY-MM-DD");
        user.newUser = false;

        await user.save();

        await packRemainder(user);
      }
    }

    return res.status(200).json({ message: "Order updated" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "Server Error" });
  }
};
