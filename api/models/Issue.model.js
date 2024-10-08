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
    assignee: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    project: {
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
      ref: "IssueType",
      required: true,
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", IssueSchema);

module.exports.Issue = Issue;
