require("dotenv").config();
const mongoose = require("mongoose");
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
const exphb = require("express-handlebars");
const { scheduleAgainDueToServerDown } = require("./utils/scheduler.js");

// Middle Wares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const myhbs = exphb.create({
  helpers: {
    notequal: function (a, b, options) {
      return a != b ? options.fn(this) : options.inverse(this);
    },
    round: function (number) {
      return Math.round(number) / 100;
    },
    date: function (dateString) {
      const date = new Date(dateString);

      return `${date.getMonth() + 1}/${
        date.getDate() + 1
      }/${date.getFullYear()}`;
    },
  },
});

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

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = process.env.PORT || 4000; // PORT

app.listen(port, () => {
  console.log(`app is runnning at ${port}`);
});

scheduleAgainDueToServerDown();
