const hodController = require("../controllers/hod");
 
let router = require("express").Router();

router.post("/getCourses", hodController.getCourses);
router.post("/getFDCMDetails", hodController.getFDCMDetails);

module.exports = router;