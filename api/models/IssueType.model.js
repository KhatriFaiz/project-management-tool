const { default: mongoose } = require("mongoose");

const IssueTypeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const IssueType = mongoose.model("IssueType", IssueTypeSchema);

module.exports = IssueType;
