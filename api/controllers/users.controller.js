const User = require("../models/User.model");

async function getUsers(req, res) {
  const users = await User.find({});
  return res.send({ data: users });
}

module.exports.getUsers = getUsers;
