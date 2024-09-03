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
/*const student = require("./routes/student");
const teacher = require("./routes/teacher");
const driver = require("./routes/driver");
const managment = require("./routes/managment");
*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to...");
});

app.use("/api/categories", category);
app.use("/api/products", product);
/*
app.use("/api/students", student);
app.use("/api/teachers", teacher);
app.use("/api/drivers", driver);
app.use("/api/managment", managment);
*/
app.listen(port, () =>
  console.log(`Server running on http://localhost${port}`.bgGreen.black)
);
