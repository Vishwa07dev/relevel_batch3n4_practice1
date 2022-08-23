const mongoose = require("mongoose");
const constants = require("../utils/constants");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    country: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobs: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    }
});
module.exports = mongoose.model("Comapany", companySchema);