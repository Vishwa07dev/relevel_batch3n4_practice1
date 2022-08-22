const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model("job",jobSchema);