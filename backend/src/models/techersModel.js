const mongoose = require("mongoose");
const { type } = require("node:os");

const TecherSchema = new mongoose.Schema({

    techer_name: {
        type: String,
        required: true,
    },
    techer_ID: {
        type: String,
        required: true,
    },
    course_name: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Techer  = mongoose.model("Techer ", TecherSchema);
module.exports = Techer ;
