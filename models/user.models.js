const mongoose=require("mongoose");
const util=require("../utils/constant.utils")
const UserSchema=new mongoose.Schema({
    name:{
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
    userType:{
        type:String,
        required:true,
        enum:[util.userType.student,util.userType.company,util.userType.admin]
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
})


module.exports=mongoose.model("user",UserSchema)