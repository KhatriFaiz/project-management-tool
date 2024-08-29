const { Router } = require("express");
const {
  getUsers,
  getUserProjects,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);
router.get("/:userID/projects", getUserProjects);

module.exports = router;
