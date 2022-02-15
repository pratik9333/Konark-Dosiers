require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const rechargeRoutes = require("./routes/recharge");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const paymentBRoutes = require("./routes/paymentBRoutes");
const Cart = require("./routes/cart");

// Middle Wares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", rechargeRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentBRoutes);
app.use("/api", Cart);

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
