const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        message: "'Email' is required"
    },
    usertype: {
        type: String,
        default: "Admin",
        immutable: true
    }
});

module.exports = mongoose.model("Admin", AdminSchema);