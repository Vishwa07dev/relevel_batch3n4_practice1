const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    minQualification:{
        type:String,
        required:true,
        unique:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    salary:{
        type:Number,
        required:true,

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

module.exports =  mongoose.model("Job",jobSchema);