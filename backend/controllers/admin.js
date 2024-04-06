const Faculty = require("../models/faculty")
const Student = require("../models/student")

const getAllFaculty = async(req, res, next) => {
    try {
        const faculty = await Faculty.find({});
        if(!faculty){
            console.log("find() error");
            return res.status(400).send("No faculties found!");
        }
        console.log(faculty)
        return res.status(200).send(faculty);
    } catch (error){
        console.log(error)
        return res.status(500).send(error);
    }
}

const addFaculty = async (req, res, next) => {
    try {
        const { name, email, courses } = req.body;

  // Validate input
        if (!name || !email || !courses || courses.length === 0) {
            return res.status(400).send('Missing required fields');
        }

        const newFaculty = new Faculty({
            name,
            email,
            courses
        });

        await newFaculty.save();
        res.status(201).send(newFaculty);
    } catch (error){
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports = {
    getAllFaculty,
    addFaculty
}
