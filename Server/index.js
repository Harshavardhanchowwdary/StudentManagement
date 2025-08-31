const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const path = require("path");  // <--- added
const { authRouter } = require('./Routes');

const app = express();
const Port = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors({
    origin: "https://studentmanagementfrontend-gr59.onrender.com",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json()); // important for POST requests

// API Routes (must come BEFORE React catch-all)
app.use('/api/auth', authRouter);

// Serve React Build
app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
        console.log("Server is running on Port", PORT);
    });
  })
  .catch((error) => {
    console.log("Server Error", error);
  });
