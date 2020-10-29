const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  productimg: String,
  price: Number,
  stockQty: Number,
  filename:String
});

module.exports = mongoose.model("Product", ProductSchema);
