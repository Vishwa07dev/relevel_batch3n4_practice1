const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username: {
        type : String,
        trim: true,
        required : true,
        unique : true
    },
    password: {
        type : String,
        trim: true,
        minLength: 10,
        required : true
    },
    email: {
        type : String,
        trim: true,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.applicant,
        enum : [constants.userTypes.applicant, constants.userTypes.hr, constants.userTypes.admin]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatuses.approved,
        enum : [constants.userStatuses.approved, constants.userStatuses.pending, constants.userStatuses.rejected]
    },
    emailVerified : {
        type : Boolean,
        required : true,
        default : false
    },
    jobsApplied : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    activeJobsPosted : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    expiredJobsPosted : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    companyId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "company"
    }
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("user",userSchema);