const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () => {return Date.now()}
    },
    updatedAt : {
        type : Date,
        default : () => {return Date.now()}
    },
    hr : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "user"
    },
    jobs : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
});

module.exports = mongoose.model("company",companySchema);