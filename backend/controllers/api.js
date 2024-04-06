const Faculty = require("../models/faculty");
const Student = require("../models/student");
const Admin = require("../models/admin");
const Hod = require("../models/hod");

const getUser = async (req, res, next) => {
    try {
        if(!req.body.email){
            return res.status(400).send("No email sent!")
        }

        const faculty = await Faculty.findOne({email: req.body.email});
        const student = await Student.findOne({email: req.body.email});
        const admin = await Admin.findOne({email: req.body.email});
        const hod = await Hod.findOne({email: req.body.email});

        if(faculty){
            req.user = faculty.email
            return res.status(200).send(faculty)
        } else if(student){
            req.user = student.email
            return res.status(200).send(student)
        } else if(admin){
            req.user = admin.email
            return res.status(200).send(admin)
        } else if(hod){
            req.user = hod.email
            return res.status(200).send(hod)
        }

        // if(!faculty)/
        // console.log(req.user)
    } catch (err){
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

module.exports = {
    getUser
}