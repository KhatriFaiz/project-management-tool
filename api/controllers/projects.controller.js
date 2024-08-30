const Project = require("../models/Project.model");

async function getProjects(req, res) {
  const projects = await Project.find({}).populate("members.member");
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

module.exports.getProjects = getProjects;
module.exports.createProject = createProject;
