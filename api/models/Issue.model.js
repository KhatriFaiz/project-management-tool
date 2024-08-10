const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    type: {
      type: mongoose.Types.ObjectId,
      ref: "Project.issueTypes",
      required: true,
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", IssueSchema);

module.exports.Issue = Issue;
