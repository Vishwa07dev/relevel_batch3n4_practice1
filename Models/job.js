const mongoose=require("mongoose")
const constant=require("../Utils/jobs")

const jobobj=new mongoose.Schema({
    title:{
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
    companyPosted:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"Company"
    },
    appliedUserId:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"User"
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    }

})
module.exports=mongoose.model("Job",jobobj)