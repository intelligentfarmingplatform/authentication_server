const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products:[
      {
          productID:{ type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: Number,
          price: Number,
      }
    ],
    estimatedDelivery: String,
});

module.exports = mongoose.model("Order", OrderSchema);
