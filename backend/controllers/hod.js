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
        console.log(req.body.coursecode.coursecode);
        // console.log("sjhfhs")
        if(!req.body.coursecode){
            return res.status(404).send("No course code");
        }

        const students = await Student.find({});

        if(!students){
            return res.status(404).send("No students found");
        }
        // console.log(students);

        const studentsWithFilteredCourses = students.map(student => {
            const filteredCourses = student.courses.filter(course => course.coursecode === req.body.coursecode.coursecode);
            // Return a new object to avoid mutating the original student object
            // console.log(student.courses);
            return { ...student.toObject(), courses: filteredCourses };
        });
        return res.status(200).send(studentsWithFilteredCourses);
    } catch(err){
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

module.exports = {
    getCourses,
    getFDCMDetails
}