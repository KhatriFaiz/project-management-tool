import { Schema, Types, model } from "mongoose";

const MemberSchema = new Schema({
  member: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectManager: {
    type: Boolean,
    default: false,
  },
});

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    members: [MemberSchema],
    issueTypes: [{ type: Schema.Types.ObjectId, ref: "IssueType" }],
  },
  { timestamps: true }
);

const Project = model("Project", ProjectSchema);

export default Project;
