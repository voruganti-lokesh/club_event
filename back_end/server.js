require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");


const app = express();

app.use(express.json());

// Connect MongoDB
connectDB();

// Staff routes
const staffRoutes = require("./routes/staffRoutes");

app.use("/api/staff", staffRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});