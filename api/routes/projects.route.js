const passport = require("passport");
const { Router } = require("express");
const {
  getProjects,
  createProject,
  createIssueType,
} = require("../controllers/projects.controller");
const { handleUnauthorizedAccess } = require("../middleware/auth.middleware");
const { getProject } = require("../middleware/issues.middleware");
const { createIssue } = require("../controllers/projects.controller");

const router = Router();

router.get("/", getProjects);

router.post(
  "/",
  passport.authenticate("session"),
  handleUnauthorizedAccess,
  createProject
);

router.post(
  "/:projectID/issue-types",
  passport.authenticate("session"),
  handleUnauthorizedAccess,
  getProject,
  createIssueType
);

router.use(
  "/:projectID/issues/:issueType",
  passport.authenticate("session"),
  handleUnauthorizedAccess,
  getProject,
  createIssue
);

module.exports = router;
