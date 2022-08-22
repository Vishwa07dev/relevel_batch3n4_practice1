const mongoose = require('mongoose');
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : 10,
        lowercase : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now()
        }
    },
    updatedAtdAt : {
        type : Date,
        default : () => {
            return Date.now()
        }
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.student,
        enum : [constants.userType.student, constants.userType.admin, constants.userType.hr]
    },
    jobsApplied : {
        type : [mongoose.SchemaType.ObjectId],
        ref : 'Job'
    }
})

module.exports = mongoose.model("User", userSchema);