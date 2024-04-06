const Student = require("../models/student")

const getStudentDetails = async (req, res, next) => {
    try {
        if(!req.body.bitsID){
            return res.status(400).send("Course Code is missing!");
        }

        const student = await Student.findOne({"bitsID": req.body.bitsID});
        if(!student){
            return res.status(404).send("No such student exists");
        }

        return res.status(200).send(student);

    } catch (err){
        console.error('Error processing request', err);
        res.status(500).send(err);
    }
}

module.exports = {
    getStudentDetails
}