const Student = require("../models/student")

const getStudentDetails = async (req, res, next) => {
    try {
        console.log(req.body)
        if(!req.body.email){
            return res.status(400).send("email is missing!");
        }

        const student = await Student.findOne({"email": req.body.email});
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