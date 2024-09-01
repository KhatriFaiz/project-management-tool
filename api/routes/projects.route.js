const passport = require("passport");
const { Router } = require("express");
const {
  getProjects,
  createProject,
  createIssueType,
  getProjectIssues,
  updateIssue,
} = require("../controllers/projects.controller");
const { handleUnauthorizedAccess } = require("../middleware/auth.middleware");
const { getProject } = require("../middleware/issues.middleware");
const { createIssue } = require("../controllers/projects.controller");

const router = Router();

router.get("/", getProjects);

// Add authentication
router.use(passport.authenticate("session"), handleUnauthorizedAccess);

router.post("/", createProject);
router.patch("/:projectID/issues/:issueID", updateIssue);

router.post("/:projectID/issue-types", getProject, createIssueType);
router.get("/:projectID/issues", getProject, getProjectIssues);
router.post("/:projectID/issues/:issueType", getProject, createIssue);

module.exports = router;
