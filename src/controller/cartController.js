const Products = require("../model/products");
exports.postCart = async (req, res) => {
  try {
    const product = await Products.findById(req.body.productId);
    const format = product.productDetails.bookFormat;
    const author = product.productDetails.BookAuthor;
    const qty = req.body.qty || 1;
    req.user.addToCart(product, qty, format, author);
    res.redirect(303, "/fab");
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    req.user.deleteItem(productId);
    res.redirect(303, "/fab/cart");
  } catch (e) {
    console.log(e.message);
  }
};

exports.addItemCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Products.findById(productId);
    await req.user.addMore(product);
    res.redirect(303, "/fab/cart");
  } catch (err) {
    console.log(err.message);
  }
};
exports.removeItemCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Products.findById(productId);
    await req.user.subLower(product);
    res.redirect(303, "/fab/cart");
  } catch (err) {
    console.log(err.message);
  }
};
