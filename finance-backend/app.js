const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Finance Backend Running 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/records", recordRoutes);
app.use("/api/summary", summaryRoutes);
app.use(errorHandler);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});