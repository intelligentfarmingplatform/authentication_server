const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
  title: String,
  description: String,
  productimg: String,
  price: Number,
  stockQty: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
