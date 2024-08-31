const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  member: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectManager: {
    type: Boolean,
    default: false,
  },
});

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    members: [MemberSchema],
    issueTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "IssueType" }],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
