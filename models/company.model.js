const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
    },
    jobsAvailabe : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    jobSeekers : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "user"
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

module.exports = mongoose.model("company",companySchema);