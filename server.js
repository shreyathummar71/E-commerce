require("dotenv").config();
const port = process.env.PORT || 8080;
const express = require("express");
const cors = require("cors");
const app = express();

require("colors");
const connectDB = require("./dbinit");
connectDB();
const category = require("./routes/category");
const product = require("./routes/product");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to...");
});

app.use("/api/categories", category);
app.use("/api/products", product);

app.listen(port, () =>
  console.log(`Server running on http://localhost${port}`.bgGreen.black)
);
