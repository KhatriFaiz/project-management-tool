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
  })
    .populate("members.member", "name username email")
    .populate("issueTypes");

  return res.send({
    success: true,
    data: projects,
  });
}

async function registerUser(req, res) {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    const savedUser = await user.save();

    req.login(savedUser, function (err) {
      if (err) {
        return res.send({
          success: false,
          error: err,
        });
      }
      return res.send({
        success: true,
        data: {
          id: savedUser.id,
          name: savedUser.name,
          username: savedUser.username,
          email: savedUser.email,
        },
      });
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

module.exports.getUsers = getUsers;
module.exports.getUserProjects = getUserProjects;
module.exports.registerUser = registerUser;
