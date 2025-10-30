import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Qualification title is required",
    },
    firstname: {
      type: String,
      trim: true,
      required: "First name is required",
    },
    lastname: {
      type: String,
      trim: true,
      required: "Last name is required",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email is required",
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

export default mongoose.model("Qualification", QualificationSchema);
