const { Router } = require("express");
const {
  getUsers,
  getUserProjects,
  registerUser,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.get("/:userID/projects", getUserProjects);

module.exports = router;
