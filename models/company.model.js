const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyname : {
        type : String,
        required : true
    },
    jobsAvailabe : {
        type : [mongoose.SchemaTypes.objectId],
        ref : "job"
    }
})

module.exports = mongoose.model("company",companySchema);