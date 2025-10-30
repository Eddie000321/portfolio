import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Project title is required",
    },
    firstname: {
      type: String,
      trim: true,
      required: "Owner first name is required",
    },
    lastname: {
      type: String,
      trim: true,
      required: "Owner last name is required",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Owner email is required",
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    completion: {
      type: Date,
      required: "Completion date is required",
    },
    description: {
      type: String,
      trim: true,
      required: "Description is required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
