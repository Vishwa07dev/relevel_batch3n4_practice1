const mongoose = require('mongoose');
const constants = require('../utils/constants')

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    lastDateOfApply : {
        type : String,
        required : true
    },
    appliedCandidates : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "User"
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
    }
})

module.exports = mongoose.model("Job", jobSchema);