const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle : {
        type : String,
        required : true
    },
    jobSeekers : {
        type : [mongoose.SchemaTypes.objectId],
        ref : "user"
    }
})

module.exports = mongoose.model("job",jobSchema);