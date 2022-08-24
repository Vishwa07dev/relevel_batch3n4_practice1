const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({

    company : {
        type: String,
        required : true  

    },
    userId : {
        type : String,
        required : true
    },
    tittle: {
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
module.exports = mongoose.model("company", userSchema);