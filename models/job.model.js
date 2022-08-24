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
    jobdescription: {
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

    }

});
module.exports = mongoose.model("jobs", userSchema);
=======
//Job->title,description,companybelongTo,[applicantsAppliedTojob],jobStatus,postedByHR(hrUserId)

const mongoose = require("mongoose");

const { jobStatuses } = require("../utils/constants");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: jobStatuses.active,
      enum: [jobStatuses.active, jobStatuses.expired],
    },
    applicants: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
    company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Company",
    },
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Job", jobSchema);
>>>>>>> 025ca315d4530f5c7d428b5afe9f357246ca161e
