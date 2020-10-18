const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  type: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
