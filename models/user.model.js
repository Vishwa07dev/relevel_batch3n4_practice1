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