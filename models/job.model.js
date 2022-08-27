const mongoose = require('mongoose')
const constants = require('../utils/constants')

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim: true
    },
    description : {
        type : String,
        required : true,
        trim: true
    },
    vacancies : {
        type : Number,
        default : 1,
        minimum : 1
    },
    postedBy : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user",
        required : true
    },
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "company",
        required : true
    },
    applicants: {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "user"
    },
    status : {
        type : String,
        required : true,
        default : constants.jobStatuses.active,
        enum : [constants.jobStatuses.active, constants.jobStatuses.expired]
    },
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("job",jobSchema)