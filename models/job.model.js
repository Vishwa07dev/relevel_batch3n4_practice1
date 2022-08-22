const mongoose = require('mongoose');
const {userTypes} = require("../utils/constants.js")


const JobSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  companyNmae: {
    type: String,
    required: true
  },
  userId : {
    type : String,
    required : true,
    unique : true
  },
  description: {
    type: String,
    required: true
  },
  userType : {
    type : String,
    required : true,
    default : userTypes.JOb,
    enum : [userTypes.ADMIN, userTypes.COMPANY, userTypes.HR, userTypes.job, userTypes.USER]
    },
  createdAt: {
    type : Date,
    immutable :true,
    default : () =>{
        return Date.now()
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now()
        }
    },
    reporter: {
        type: String,
        required: true
    }
  }
});

module.exports = mongoose.model('Job',JobSchema);