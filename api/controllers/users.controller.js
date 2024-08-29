const User = require("../models/User.model");
const Project = require("../models/Project.model");

async function getUsers(req, res) {
  const users = await User.find({});
  return res.send({ data: users });
}

async function getUserProjects(req, res) {
  const { userID } = req.params;

  const projects = await Project.find({
    "members.member": userID,
  });

  return res.send({
    success: true,
    data: projects,
  });
}

module.exports.getUsers = getUsers;
module.exports.getUserProjects = getUserProjects;
