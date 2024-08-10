const mongoose = require("mongoose");
const { User } = require("./models/User.model");
const { Project } = require("./models/Project.model");

async function init() {
  try {
    mongoose.set("bufferCommands", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/project_management");
    await createIssueType();
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

init();

// Register user
async function registerUser() {
  const user = new User({
    name: "Faiz Khatri",
    email: "faizkhatri00@gmail.com",
    username: "faizkhatri",
    password: "12345678",
  });
  const savedUser = await user.save();
  console.log("User created:", savedUser);
}

async function registerProject() {
  const project = new Project({
    title: "Forth project",
    members: [
      {
        member: "66b4bdb2a69d954d465cae61",
        projectManager: true,
      },
    ],
  });
  await project.save();
  console.log("Project created:", project);
}

async function createIssueType() {
  const project = await Project.findById("66b4ce9ea5d68c0b40b03b26");
  project.issueTypes.push({ name: "Story" });
  await project.save();
  console.log("Issue Type created in Project:", project);
}
