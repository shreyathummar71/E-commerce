const Category = require("../schemas/Category");

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length) {
      res.status(200).json({ categories });
    } else {
      res.status(200).json({ message: "No categories in DB" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get one category

const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (category) {
      return res.status(200).json({ category }); // return can be removed and else can stay, return can stay and else can be removed
    } else {
      res.status(404).json({ message: "Cannot find this category in the DB" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// create category
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await Category.create({
      categoryName,
    });
    res.status(201).json({ message: "Category create", category });
  } catch (error) {
    res.status(500).json(error);
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );
    if (category) {
      res.status(200).json({ message: "Category updates" });
    } else {
      res.status(404).json({ message: "No such category" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (category) {
      res.status(200).json({ message: "Category deleted" });
    } else {
      res.status(404).json({ message: "No such category" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
