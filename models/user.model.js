<<<<<<< HEAD
const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({

    name : {
        type: String,
        required : true  

    },
    userId : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now()
        }
        
    },
    updatedAt : {
        type : Date,
        immutable : true,
        default :() =>{
          return Date.now()
        }
    },
    uertype : {
        type : String,
        required : true,
        default : constants.userTypes.student
        
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved

    },
    jobsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "jobs"
    },
    companyCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "company"
    },

});
module.exports = mongoose.model("user", userSchema);
=======
//User schema-> User{name,userId,email,password,userType,userStatus,}

const mongoose = require("mongoose");
const { userTypes, userStatuses } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minLength: 5,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    userType: {
      type: String,
      default: userTypes.applicant,
      enum: [userTypes.admin, userTypes.applicant, userTypes.hr],
    },
    userStatus: {
      type: String,
      default: userStatuses.approved,
      enum: [
        userStatuses.approved,
        userStatuses.rejected,
        userStatuses.pending,
      ],
    },
    jobsApplied: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Job",
    },
    companyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
>>>>>>> 025ca315d4530f5c7d428b5afe9f357246ca161e
