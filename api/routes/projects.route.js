const { Router } = require("express");
const { getProjects } = require("../controllers/projects.controller");

const router = Router();

router.get("/", getProjects);

module.exports = router;
