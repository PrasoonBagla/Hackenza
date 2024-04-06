const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        message: "'Course' is required"
    },
    coursecode:{
        type: String,
        required: true,
        message: "'coursecode' is required"
    },
    facultyAssisted: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    instructorIncharge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    component:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    recommendation: {
        type:String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
})

const StudentSchema = new mongoose.Schema({
    bitsID: {
        type: String,
        required: true,
        message: "'ID' is required"
    },
    name: {
        type: String,
        required: true, 
        message: "'Name' is required"
    },
    email: {
        type: String,
        required: true, 
        message: "'email' is required"
    },
    courses :{
        type: [CourseSchema],
    },
    usertype: {
        type: String,
        default: "Student",
        immutable: true
    }    
});

module.exports = mongoose.model("Student", StudentSchema);