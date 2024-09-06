const Order = require("../schemas/Order");
const User = require("../schemas/User");
const Product = require("../schemas/Product");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    console.log("Fetched User:", user); // Log the user
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // Check if all products exist
    let total = 0;
    for (const item of products) {
      console.log("Processing Item:", item); // Log the item
      const product = await Product.findById(item.productId);
      if (!product)
        return res.status(400).json({
          message: `Product with ID ${item.productId} does not exist`,
        });
      console.log("Product Price:", product.productPrice); // Log the price of the product
      total += product.productPrice * item.quantity;
    }

    // Round the total to two decimal places
    total = parseFloat(total.toFixed(2));
    console.log("Calculated total:", total);

    // Create the order
    const order = new Order({ userId, products, total });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("products");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("products");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
