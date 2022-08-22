const mongoose = require('mongoose');
const {userTypes} = require("../utils/constants.js")


const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId : {
    type : String,
    required : true,
    unique : true
    },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type : String,
    required : true,
    lowercase : true,
    minLength : 10,
    unique : true
  },
  password: {
    type: String,
    required: true
  },
  userType : {
    type : String,
    required : true,
    default : userTypes.USER,
    enum : [userTypes.ADMIN, userTypes.COMPANY, userTypes.HR, userTypes.job, userTypes.USER]
    },
  createdAt: {
    type : Date,
    immutable :true,
    default : () =>{
        return Date.now()
    }
  }
});

module.exports = mongoose.model('User', UserSchema);