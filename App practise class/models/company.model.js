const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    jobsPosted : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "Job"
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
})

module.exports = mongoose.model("Company", companySchema);