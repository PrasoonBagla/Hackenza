const Course = require("../models/courses");
const Student = require("../models/student");

const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({});
        if(!courses){
            return res.status(404).send("No courses found");
        }

        return res.status(200).send(courses);
    } catch (err){
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

const getFDCMDetails = async (req, res, next) => {
    try {
        if(!req.body.coursecode){
            return res.status(404).send("No course code");
        }

        const students = await Student.find({
            'courses.coursecode': req.body.coursecode
        });

        if(!students){
            return res.status(404).send("No students found");
        }

        return res.status(200).send(students);
    } catch(err){
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

module.exports = {
    getCourses,
    getFDCMDetails
}