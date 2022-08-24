const mongoose = require('mongoose')
const constants = require('../utils/constants')

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    poster : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user",
        required : true,
    },
    applicants: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "user"
    },
    status : {
        type : String,
        required : true,
        default : constants.jobStatus.open,
        enum : [constants.jobStatus.open, constants.jobStatus.closed]
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () => {return Date.now()}
    },
    updatedAt : {
        type : Date,
        default : () => {return Date.now()}
    }
})

module.exports = mongoose.model("job",jobSchema)