const Project = require("../models/Project.model");

async function getProjects(req, res) {
  const projects = await Project.find({}).populate("members.member");
  return res.send({ data: projects });
}

module.exports.getProjects = getProjects;
