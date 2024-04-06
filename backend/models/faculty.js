const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    }
})

const FacultySchema = new mongoose.Schema({
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
    courses: {
        type: [CourseSchema]
    }
});

module.exports = mongoose.model("Faculty", FacultySchema);