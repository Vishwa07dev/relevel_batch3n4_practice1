const mongoose=require("mongoose")
const constant=require("../Utils/jobs")

const companyobj=new mongoose.Schema({
    companyId:{
        type:String,
        required:true
    },
    hiringfor:{
        type:String,
        required:true,
        default:constant.jobtype.se1,
        enum:[constant.jobtype.se1,constant.jobtype.se2,constant.jobtype.se3]
    },
    jobdescription:{
        type:String
    }
})
module.exports=mongoose.model("Company",companyobj)