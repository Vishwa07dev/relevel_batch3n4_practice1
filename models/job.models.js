const mongoose=require("mongoose");

const JobSchema=new mongoose.Schema({
    jobname:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    vacancies:{
        type:Number,
        required:true,
        default:1
    },
    company:{
        type:mongoose.SchemaType.ObjectId,
        ref:"company"
    },
    datePublished:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    dateUpdated:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
},{versionKey:false})


module.exports=mongoose.model("Job",JobSchema)