const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  fullName: String,
  streetAddress: String,
  district:String,
  province:String,
  zipCode:String,
  phoneNumber:String,
  note:String,
});

module.exports = mongoose.model("Address", AddressSchema);
