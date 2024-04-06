const studentController = require("../controllers/student")

let router = require("express").Router();

router.post("/getDetails", studentController.getStudentDetails);

module.exports = router;
