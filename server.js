const app = require("./app");

const mongoose = require("mongoose");

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
