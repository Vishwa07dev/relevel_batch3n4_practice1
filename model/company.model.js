const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true
    },
    website:{
        name:String,
    },
    employeeSize:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updateAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },

})

module.exports =  mongoose.model("Company",companySchema);