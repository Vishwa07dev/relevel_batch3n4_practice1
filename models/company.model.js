const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyname : {
        type : String,
        required : true,
    },
    jobsAvailabe : {
        type : [mongoose.SchemaTypes.String],
        ref : "job"
    },
    jobSeekers : {
        type : [mongoose.SchemaTypes.String],
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