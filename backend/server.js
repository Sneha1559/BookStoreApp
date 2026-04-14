const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes import
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ Routes use
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});