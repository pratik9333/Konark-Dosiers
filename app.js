require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const rechargeRoutes = require("./routes/recharge.js");
const orderRoutes = require("./routes/order.js");
const productRoutes = require("./routes/product.js");
const paymentBRoutes = require("./routes/paymentBRoutes.js");
const path = require("path");
const Cart = require("./routes/cart.js");
const { scheduleAgainDueToServerDown } = require("./utils/scheduler.js");
const myhbs = require("./utils/handlebars");

// Middle Wares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.engine("handlebars", myhbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("views/images"));
app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", rechargeRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentBRoutes);
app.use("/api", Cart);

app.get("/", (req, res) => {
  res.json({ message: "Hello from our api" });
});

scheduleAgainDueToServerDown();

module.exports = app;
