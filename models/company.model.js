const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyname : {
        type : String,
        required : true
    },
    // jobsAvailable : {
    //     type : [mongoose.SchemaTypes.objectId],
    //     ref : "Ticket"
    // }
})

module.exports = mongoose.model("company",companySchema);