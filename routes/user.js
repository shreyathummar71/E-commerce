const express = require("express");

// Import all the controllers
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// Create a new instance of express router
const api = express.Router();

// Define the routes and map them to controller actions
api.route("/").post(createUser).get(getUsers);

api.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Export the router module
module.exports = api;
