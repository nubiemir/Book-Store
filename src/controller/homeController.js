const mongoose = require("mongoose");
const Products = require("../model/products");
const Categories = require("../model/categories");
const Authors = require("../model/authors");

const Order = require("../model/order");
require("../model/authors");
require("../model/bookFormat");
require("../model/categories");

exports.getHome = async (req, res) => {
  try {
    const category = req.query.category;
    const author = req.query.author;
    let products;
    if (category) {
      products = await Products.find({
        "productDetails.Categories": { $in: category },
      }).populate([
        "productDetails.BookAuthor",
        "productDetails.bookFormat",
        "productDetails.Categories",
      ]);
    } else if (author) {
      products = await Products.find({
        "productDetails.BookAuthor": { $in: author },
      }).populate([
        "productDetails.BookAuthor",
        "productDetails.bookFormat",
        "productDetails.Categories",
      ]);
    } else {
      products = await Products.find().populate([
        "productDetails.BookAuthor",
        "productDetails.bookFormat",
        "productDetails.Categories",
      ]);
    }
    const categories = (await Categories.find()).map((category) => {
      return { category: category.cat, id: category._id };
    });
    const authors = (await Authors.find()).map((author) => {
      return { name: author.name, id: author._id };
    });
    const books = products.map((product) => {
      return {
        _id: product._id,
        title: product.title,
        price: product.price,
        format: product.productDetails.bookFormat.map((form) => {
          return [form.format];
        }),
        author: product.productDetails.BookAuthor.name,
      };
    });
    res.render("homePage", {
      books,
      categories,
      authors,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartFetch = await req.user.populate([
      "cart.products.product",
      "cart.products.format",
      "cart.products.bookAuthor",
    ]);
    const totalItems = cartFetch.cart.products.reduce((total, item) => {
      return item.qty + total;
    }, 0);
    const totalWithOutVAT = cartFetch.cart.products.reduce((total, item) => {
      return item.subtotal + total;
    }, 0);
    const totalWithVAT = totalWithOutVAT * 0.05 + totalWithOutVAT;
    const shippingRate = 10;
    const checkOutPrice = {
      totalWithOutVAT,
      totalWithVATShipping: totalWithVAT + shippingRate,
      VAT: (totalWithOutVAT * 0.05).toFixed(2),
      shippingRate,
    };
    console.log(cartFetch.cart.products);
    res.render("cart", {
      cartItems: cartFetch.cart.products,
      totalItems,
      checkOutPrice,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const status = req.query.status || "all";
    let orders;
    if (status === "all") {
      orders = await Order.find({ user: req.user._id }).populate("user");
    } else {
      orders = await Order.find({
        user: req.user._id,
        orderStatus: status,
      }).populate("user");
    }
    const order = orders.map((order) => {
      return {
        orderList: order.orderList,
        uname: order.user.uname,
        uid: order.user._id,
        date: new Date(order.createdAt),
        totalCost: order.total,
      };
    });
    res.render("orders", {
      order,
      status,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getAddProducts = (req, res) => {
  res.render("addProduct");
};

exports.getProduct = async (req, res) => {
  try {
    const productId = mongoose.Types.ObjectId(req.params.p_id);
    const product = await Products.findById(productId)
      .populate([
        "productDetails.BookAuthor",
        "productDetails.bookFormat",
        "productDetails.Categories",
      ])
      .exec();
    const { title, price, description, productDetails, _id } = product;
    const categories = productDetails.Categories.map((cat) => cat.cat);
    const format = productDetails.bookFormat.map((form) => form.format);
    res.render("productView", {
      title,
      price,
      description,
      Categories: categories.join(", "),
      _id,
      productDetails,
      format: format.join(", "),
    });
  } catch (err) {
    console.log(err.message);
  }
};
