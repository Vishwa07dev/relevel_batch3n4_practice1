const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        trim: true,
        required : true
    },
    address : {
        type : String,
        trim: true
    },
    details : {
        type : String,
        trim: true
    },
    activeJobsPosted: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "job",
    },
    expiredJobsPosted: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "job",
    },
    hr : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "user"
    },
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("company",companySchema);