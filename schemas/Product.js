const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 characters"],
    maxLength: [100, "max length is 100 charectors"],
  },
  productDescription: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 characters"],
    maxLength: [500, "max length is 100 charectors"],
  },
  productPrice: {
    type: Number,
    required: true,
    min: [0.0, "Price cannot be lower than 0.0"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId, // Corrected type to ObjectId
    ref: "Category", // Referencing the Category model
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
