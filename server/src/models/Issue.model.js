import { Schema, Types, model } from "mongoose";

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignee: {
      type: Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Types.ObjectId,
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
      type: Types.ObjectId,
      ref: "IssueType",
      required: true,
    },
  },
  { timestamps: true }
);

const Issue = model("Issue", IssueSchema);

const _Issue = Issue;
export { _Issue as Issue };
