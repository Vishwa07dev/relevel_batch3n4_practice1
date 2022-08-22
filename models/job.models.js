const mongoose=require("mongoose");

const JobSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    catageory:{
        type:String,
        required:true,
       enum:[] 
    },
    description:{
        type:String,
        required:true,
    },
    vacancies:{
        type:Number,
        required:true,
        default:0
    },
    datePublished:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    }
})


module.exports=mongoose.model("Job",JobSchema)