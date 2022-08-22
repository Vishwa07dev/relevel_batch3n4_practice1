const mongoose=require("mongoose")
const constant=require("../Utils/user")
const userobj=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        minLength:10
    },
    userid:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true,
        default:constant.usertype.student,
        enum:[constant.usertype.student,constant.usertype.hr,constant.usertype.admin]
    },
    userstatus:{
        type:String,
        required:true,
        default:constant.userstatus.approved,
        enum:[constant.userstatus.approved,constant.userstatus.pending,constant.userstatus.rejeceted]
    }
})

module.exports=mongoose.model("User",userobj)