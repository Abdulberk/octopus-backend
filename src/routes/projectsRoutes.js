const router = require('express').Router();
const verifyToken = require("../utils/verifyToken");
const getProjects = require("../controllers/projectController");

router.get('/get-projects', verifyToken, getProjects);

module.exports = router;