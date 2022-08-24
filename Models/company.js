const mongoose=require("mongoose")
const constant=require("../Utils/jobs")

const companyobj=new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    jobPosted:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"Job"
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updateAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        unique:true,
        lowerCase:true
    }
})
module.exports=mongoose.model("Company",companyobj)