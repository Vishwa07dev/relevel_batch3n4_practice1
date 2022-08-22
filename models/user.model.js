const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    jobsApplied : {
        type : [mongoose.SchemaTypes.String],
        ref : "job"
    },
    companiesAppliedFor : {
        type : [mongoose.SchemaTypes.String],
        ref : "company",
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
})

module.exports = mongoose.model("user",userSchema);