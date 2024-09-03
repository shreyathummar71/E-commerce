const Product = require("../schemas/Product");
const mongoose = require("mongoose");
const Category = require("../schemas/Category");
// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length) {
      res.status(200).json({ products });
    } else {
      res.status(200).json({ message: "No products in the DB" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get one product
const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Cannot find this product in the DB" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all products in the same category
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    /*if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
*/
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ categoryId }).populate("categoryId");

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// create a product
const createProduct = async (req, res) => {
  try {
    console.log(Product);
    const { productName, productDescription, productPrice, categoryId } =
      req.body;
    const product = await Product.create({
      productName,
      productDescription,
      productPrice,
      categoryId,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Error creating product:", error);
    //res.status(500).json(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productDescription, productPrice, categoryId } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { productName, productDescription, productPrice, categoryId },
      { new: true }
    );
    if (product) {
      res.status(200).json({ message: "Product updated" });
    } else {
      res.status(404).json({ message: "No such product in DB" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "No such product in the DB" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
