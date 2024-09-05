const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 characters"],
    maxLength: [100, "max length is 100 characters"],
  },
});

module.exports = mongoose.model("Category", CategorySchema);
