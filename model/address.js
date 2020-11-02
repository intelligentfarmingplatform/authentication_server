const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = new mongoose.Schema({
  users: { type: Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  streetAddress: String,
  district: String,
  province: String,
  zipCode: String,
  phoneNumber: String,
  note: String,
});

module.exports = mongoose.model("Address", AddressSchema);
