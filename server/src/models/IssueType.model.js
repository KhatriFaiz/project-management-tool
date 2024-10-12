import { Schema } from "mongoose";

const IssueTypeSchema = new Schema({
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

export default IssueType;
