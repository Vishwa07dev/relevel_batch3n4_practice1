const mongoose=require("mongoose")
const constant=require("../Utils/jobs")

const jobobj=new mongoose.Schema({
    jobId:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true,
        default:constant.jobtype.se1,
        enum:[constant.jobtype.se1,constant.jobtype.se2,constant.jobtype.se3]
    }
    
})
module.exports=mongoose.model("Job",jobobj)