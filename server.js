const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const cors = require("cors");
const connectDB = require("./dbinit");
connectDB();

const user = require("./routes/user");
const order = require("./routes/order");
const port = process.env.PORT || 8081;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to our eCommerce API !");
});

//here middlewares like app.use("/api/products", product )
app.use("/api/user", user);
app.use("/api/order", order);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
