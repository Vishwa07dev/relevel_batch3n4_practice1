const mongoose=require("mongoose");

const CompanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Jobs:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
  
})


module.exports=mongoose.model("company",CompanySchema)