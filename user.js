const mongoose=require("mongoose");
const {STUDENT}=require("../Utils/roles");
const StudentSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        default:''

    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:Student
    },
    createdAt: {
        type: Date,
        default: Date
      }

});
module.exports=mongoose.model('Student',StudentSchema);
