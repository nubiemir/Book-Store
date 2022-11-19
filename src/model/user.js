const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  uname: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
  },
  address: {
    type: Schema.Types.String,
    default: "Abu Dhabi",
  },
  cart: {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        format: { type: Schema.Types.ObjectId, ref: "BookFormat" },
        bookAuthor: { type: Schema.Types.ObjectId, ref: "Author" },
        qty: { type: Schema.Types.Number, default: 1 },
        subtotal: { type: Schema.Types.Number },
      },
    ],
  },
  wishList: {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
});

userSchema.methods.addToCart = async function (p, quantity, format, author) {
  try {
    const productIndex = this.cart.products.findIndex((product) =>
      product.product.equals(p._id)
    );
    const wishListFiltered = this.wishList.products.filter(
      (prod) => prod._id.toString() !== p._id.toString()
    );
    this.wishList.products = wishListFiltered;
    let qty = +quantity;
    if (productIndex >= 0) {
      this.cart.products[productIndex].qty =
        this.cart.products[productIndex].qty + qty;
      this.cart.products[productIndex].subtotal =
        this.cart.products[productIndex].qty * p.price;
    } else {
      this.cart.products = [
        ...this.cart.products,
        {
          product: p._id,
          format,
          bookAuthor: author,
          qty,
          subtotal: qty * p.price,
        },
      ];
    }
    await this.save();
  } catch (err) {
    console.log(err.message);
  }
};

userSchema.methods.deleteItem = async function (pid) {
  try {
    const newProductsList = this.cart.products.filter(
      (p) => p.product.toString() !== pid
    );
    this.cart.products = newProductsList;
    await this.save();
  } catch (err) {
    console.log(err.message);
  }
};

userSchema.methods.addMore = async function (product) {
  try {
    const pid = product._id;
    const addedProduct = this.cart.products.map((p) => {
      if (p.product.toString() === pid.toString()) {
        p.qty++;
        p.subtotal = product.price * p.qty;
      }
      return p;
    });
    this.cart.products = addedProduct;
    await this.save();
  } catch (err) {
    console.log(err.message);
  }
};
userSchema.methods.subLower = async function (product) {
  try {
    const pid = product._id;
    const subProduct = this.cart.products.map((p) => {
      if (p.product.toString() === pid.toString()) {
        p.qty--;
        p.subtotal = product.price * p.qty;
      }

      return p;
    });
    this.cart.products = subProduct;
    await this.save();
  } catch (err) {
    console.log(err.message);
  }
};

userSchema.methods.addToWishList = async function (pid) {
  try {
    const wishListIndex = this.wishList.products.findIndex(
      (p) => p._id.toString() === pid.toString()
    );
    if (wishListIndex < 0) {
      this.wishList.products = [...this.wishList.products, pid];
      await this.save();
    }
  } catch (err) {
    console.log(err.message);
  }
};
userSchema.methods.removeItem = async function (pid) {
  try {
    const wishListFiltered = this.wishList.products.filter(
      (p) => p._id.toString() !== pid.toString()
    );
    this.wishList.products = wishListFiltered;
    await this.save();
  } catch (err) {
    console.log(err.message);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
