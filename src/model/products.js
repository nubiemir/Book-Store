const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: Schema.Types.String, required: true },
    price: Number,
    description: Schema.Types.String,
    productDetails: {
      ISPN: Schema.Types.String,
      Categories: [
        {
          type: Schema.Types.ObjectId,
          ref: "categories",
        },
      ],
      BookAuthor: { type: Schema.Types.ObjectId, ref: "Author" },
      bookFormat: [{ type: Schema.Types.ObjectId, ref: "BookFormat" }],
      bookIntro: Schema.Types.String,
      pages: Schema.Types.String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
