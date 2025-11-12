import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Project title is required",
    },
    description: {
      type: String,
      trim: true,
      required: "Project description is required",
    },
    summary: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      required: "Project role is required",
    },
    outcome: {
      type: String,
      trim: true,
      required: "Outcome is required",
    },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "In Progress",
    },
    technologies: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
