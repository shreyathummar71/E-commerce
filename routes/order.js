const express = require("express");

// Import all the controllers
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

// Create a new instance of express router
const api = express.Router();

// Define the routes and map them to controller actions
api.route("/").post(createOrder).get(getOrders);

api.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);

// Export the router module
module.exports = api;
