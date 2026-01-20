const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const donationRoutes = require("./routes/donation");
const adminRoutes = require("./routes/admin");
const app = express();
app.use(express.json());       
app.use("/api/auth", authRoutes);  
app.use("/api/donation", donationRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("NGO Backend Running");
});
connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
