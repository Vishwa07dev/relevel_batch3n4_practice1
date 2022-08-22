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
    job : {
        type : String,
        required : true
    },
    company : {
        type : String ,
        required : true
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
module.exports = mongoose.model("user", userSchema);