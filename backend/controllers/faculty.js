const Student = require("../models/student")
const Faculty = require("../models/faculty")

const addFDCM = async (req, res, next) => {
    try {
        const { bitsID, name, email, course } = req.body;

        if(!bitsID || !name || !email || !course) {
            return res.status(400).send('Missing required fields');
        }

        const faculty = await Faculty.findOne({ email: course.facultyAssisted });
        const instructor = await Faculty.findOne({ email: course.instructorIncharge });

        if (!faculty || !instructor) {
            return res.status(404).send('Faculty or Instructor not found');
        }

        course.facultyAssisted = faculty._id;
        course.instructorIncharge = instructor._id;

        let student = await Student.findOne({ bitsID: bitsID });
        
        if (student) {
            student.courses.push(course);
        } else {
            student = new Student({
                bitsID,
                name,
                email,
                courses: [course], 
            });
        }

        await student.save();

        return res.status(201).send(student);

    } catch (err){
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

const getFDCMsForCourse = async (req, res, next) => {
    try {
        if(!req.body.coursecode){
            return res.status(400).send("Course Code is missing!");
        }

        const students = await Student.find({
            'courses.coursecode': req.body.coursecode
          });
      
          if (students.length > 0) {
            res.status(200).send(students);
          } else {
            res.status(404).send('No students found for the specified course');
          }
    } catch (err) {
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

module.exports = {
    addFDCM,
    getFDCMsForCourse
}