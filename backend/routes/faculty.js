const facultyController = require("../controllers/faculty");
 
// middleware
// const {apiPermissionToUser} = require("../utils/middleware");
 
let router = require("express").Router();

router.post("/createOrUpdateFDCM", facultyController.addFDCM);
router.post("/getFDCM", facultyController.getFDCMsForCourse);
router.post("/getCourses",facultyController.getCourseForFaculty);
module.exports = router;
