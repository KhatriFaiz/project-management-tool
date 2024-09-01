const passport = require("passport");
const { Router } = require("express");
const {
  getProjects,
  createProject,
  createIssueType,
  getProjectIssues,
} = require("../controllers/projects.controller");
const { handleUnauthorizedAccess } = require("../middleware/auth.middleware");
const { getProject } = require("../middleware/issues.middleware");
const { createIssue } = require("../controllers/projects.controller");

const router = Router();

router.get("/", getProjects);

router.use(passport.authenticate("session"), handleUnauthorizedAccess);
router.post("/", createProject);

router.use(getProject);
router.post("/:projectID/issue-types", createIssueType);
router.get("/:projectID/issues", getProjectIssues);
router.post("/:projectID/issues/:issueType", createIssue);

module.exports = router;
