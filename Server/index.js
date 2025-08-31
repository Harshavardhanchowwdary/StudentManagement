const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const Mongoose = require('mongoose');
const {authRouter} = require('./Routes');
const app = express();
const Port = 5000;
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 

dotenv.config();


Mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    // DB connected
    console.log("MongoDb Connected Successfully");

    // Backend Server
    app.get('/',(req,res)=>{
        res.status(200).send("Api is Working");
    })
    app.use('/api/auth',authRouter);
    // Server Starting
    app.listen(Port,()=>{
        console.log("Server is Running on Port",Port)
    })
}).catch((error)=>{
    console.log("Server Error",error)
}) 
