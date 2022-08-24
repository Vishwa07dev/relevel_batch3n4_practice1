const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
    userName : {
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
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        enum : [constants.userType.admin, constants.userType.hr, constants.userType.student]
    },
    jobsApplied : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    jobsPosted : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    }
})

module.exports = mongoose.model("user",userSchema);