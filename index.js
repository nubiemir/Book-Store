require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
//Routes
const homeRoute = require("./src/routes/home");
const addProductRoute = require("./src/routes/addProductRoute");
const loggerRoute = require("./src/routes/loggerRoute");
const cartRoute = require("./src/routes/cartRoutes");
const orderRoute = require("./src/routes/orderRoutes");
const whishListRoute = require("./src/routes/wishListRoutes");
const User = require("./src/model/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/src/public")));

const port = process.env.PORT || 3000;

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("63149bb99f665c755ba93eb1");
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
  }
});

app.use("/fab", homeRoute);
app.use("/fab", loggerRoute);
app.use("/fab", whishListRoute);
app.use("/fab", orderRoute);
app.use("/cart", cartRoute);
app.use("/admin", addProductRoute);

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  res.status(500);
  res.render("500");
});

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nubi:${process.env.MONGODB_PASSWORD}@cluster0.2dzp1.mongodb.net/?retryWrites=true&w=majority`
    );

    app.listen(port, () => console.log("link => http:localhost:3000/fab"));
  } catch (err) {
    console.log(err.message);
  }
};
connect();
