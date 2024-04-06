const adminController = require("../controllers/admin");
 
// middleware
// const {apiPermissionToUser} = require("../utils/middleware");
 
let router = require("express").Router();

router.post("/getFaculty", adminController.getAllFaculty);
router.post("/addFaculty", adminController.addFaculty);


module.exports = router;
