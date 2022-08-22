const mongoose=require("mongoose");

const CompanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Jobs:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"Job"
    },
    address:{
        type:String,
        reuired:true,
        minLength:50
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
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
  
})


module.exports=mongoose.model("company",CompanySchema)