const { Issue } = require("../models/Issue.model");
const IssueType = require("../models/IssueType.model");
const Project = require("../models/Project.model");

async function getProjects(req, res) {
  const projects = await Project.find({})
    .populate("members.member")
    .populate("issueTypes");
  return res.send({ data: projects });
}

async function createProject(req, res) {
  try {
    const project = new Project({
      title: req.body.title,
      members: [{ member: req.user._id, projectManager: true }],
    });

    const savedProject = await project.save();

    return res.send({ success: true, data: savedProject });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

async function createIssueType(req, res) {
  try {
    const newIssueType = new IssueType({
      type: req.body.type,
    });
    if (req.body.title) newIssueType.title = req.body.title;
    const issueType = await newIssueType.save();

    req.project.issueTypes.push(newIssueType.id);
    await req.project.save();

    return res.send({
      success: true,
      data: issueType,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

async function createIssue(req, res) {
  const { issueType } = req.params;

  try {
    let issueTypeID;
    const project = await req.project.populate("issueTypes");

    const issueTypeExists = project.issueTypes.some((type) => {
      if (type.type === issueType) {
        issueTypeID = type.id;
        return true;
      }
    });

    if (!issueTypeExists) {
      return res.status(404).send({
        success: false,
        message: "Couldn't find issueType",
      });
    }

    const issue = new Issue({
      title: req.body.title,
      project: req.project.id,
      type: issueTypeID,
    });
    const savedIssue = await issue.save();
    return res.send({
      success: true,
      data: savedIssue,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

async function getProjectIssues(req, res) {
  try {
    const issues = await Issue.find({ project: req.project.id })
      .populate("project", "title")
      .populate("type", "type title");

    return res.send({
      success: true,
      data: issues,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

module.exports.getProjects = getProjects;
module.exports.createProject = createProject;
module.exports.createIssueType = createIssueType;
module.exports.createIssue = createIssue;
module.exports.getProjectIssues = getProjectIssues;
