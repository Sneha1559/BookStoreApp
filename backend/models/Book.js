const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  image: String,
  rating: Number,
});

module.exports = mongoose.model("Book", bookSchema);