const mongoose = require('mongoose');

const compneySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("compney",compneySchema);