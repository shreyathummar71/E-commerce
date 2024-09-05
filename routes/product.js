const express = require("express");

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/product");

const api = express.Router();

api.route("/").get(getAllProducts).post(createProduct);
api.route("/:id").get(getOneProduct).put(updateProduct).delete(deleteProduct);
api.route("/category/:categoryId").get(getProductsByCategory);
module.exports = api;
