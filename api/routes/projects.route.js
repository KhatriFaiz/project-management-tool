const passport = require("passport");
const { Router } = require("express");
const {
  getProjects,
  createProject,
} = require("../controllers/projects.controller");
const { handleUnauthorizedAccess } = require("../middleware/auth.middleware");

const router = Router();

router.get("/", getProjects);
router.post(
  "/",
  passport.authenticate("session"),
  handleUnauthorizedAccess,
  createProject
);

module.exports = router;
