const Mongoose = require('mongoose'); 

const Students = Mongoose.Schema({
    name:{required:true,lenght:50,type:String},
    email:{required:true,lenght:50,type:String},
    password:{required:true,lenght:50,type:String},
    phone:{required:true,lenght:50,type:Number},
}) 


module.exports = Mongoose.model('Students',Students);