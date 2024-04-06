const apiController = require("../controllers/api")

let router = require("express").Router();

router.post("/getUser", apiController.getUser);

module.exports = router