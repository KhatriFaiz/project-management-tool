const Project = require("../models/Project.model");

async function getProject(req, res, next) {
  const { projectID } = req.params;
  try {
    const project = await Project.findById(projectID);
    if (!project) {
      return res
        .status(404)
        .send({ success: false, message: "Couldn't find project." });
    }
    req.project = project;
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

module.exports.getProject = getProject;
