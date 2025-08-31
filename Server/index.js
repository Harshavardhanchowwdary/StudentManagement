const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const path = require("path");  
const { authRouter } = require('./Routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRouter);

// Test API
app.get('/', (req, res) => {
    res.status(200).send("API is working");
});

// Serve React build
app.use(express.static(path.join(__dirname, "Client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client/build", "index.html"));
});

// Connect MongoDB and start server
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

