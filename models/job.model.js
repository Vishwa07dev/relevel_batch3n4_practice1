const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle : {
        type : String,
        required : true
    },
    jobBelongsTo : { // company name to which this job belongs to.
        type : String,
        require : true,
    },
    jobDescription : {
        type : String,
    },
    jobSeekers : {
        type : [mongoose.SchemaTypes.String],
        ref : "user"
    }
})

module.exports = mongoose.model("job",jobSchema);