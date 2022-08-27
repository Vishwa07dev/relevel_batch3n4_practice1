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
    jobsPosted: {
        type: [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref: "job",
    },
    hr : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "user"
    },
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("company",companySchema);