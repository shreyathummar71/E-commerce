const express = require("express");
const {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const api = express.Router();

api.route("/").get(getAllCategories).post(createCategory);
api
  .route("/:id")
  .get(getOneCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = api;
