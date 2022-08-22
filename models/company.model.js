const mongoose  = require('mongoose');

const companySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    companyId : {
        type : String,
        required : true,
        unique : true
    },
    
    details : {
        type : String,
        minLength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () =>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now()
        }
    },
    ompanyJObIDs:{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    }
    
});

module.exports = mongoose.model("company", companySchema);