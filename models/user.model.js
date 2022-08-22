const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () => {return Date.now()}
    },
    updatedAt : {
        type : Date,
        default : () => {return Date.now()}
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.student,
        enum : [constants.userType.student, constants.userType.hr, constants.userType.admin]
    },
    userCompney : {
        type : String
    }
});

module.exports = mongoose.model("user",userSchema);