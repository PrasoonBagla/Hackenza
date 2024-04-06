const mongoose = require('mongoose');

const HODSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        message: "'Name' is required"
    },
    email: {
        type: String,
        required: true, 
        message: "'Email' is required"
    },
    usertype: {
        type: String,
        default: "Hod",
        immutable: true
    }
});

module.exports = mongoose.model("Hod", HODSchema);