const mongoose=require("mongoose");
const {USER}=require("../Utils/roles");
const UserSchema=new mongoose.Schema({
	fname:{
		type:String,
		required:true},
	lname:{
		type:String,
		required:true},
	email:{
		type:String,
		required:true,
		unique:true},
	phone:{type:String,default:''},
	password:{type:String,
		required:true,
		unique:true},
	role: {
        type: String,
        default: User
    },
    createdAt: {
        type: Date,
        default: Date
    }

});
module.exports = mongoose.model('User', UserSchema);
