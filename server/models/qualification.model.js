import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      trim: true,
      required: "Institution is required",
    },
    program: {
      type: String,
      trim: true,
      required: "Program or degree is required",
    },
    status: {
      type: String,
      trim: true,
      required: "Status is required",
    },
    period: {
      type: String,
      trim: true,
      required: "Program period is required",
    },
    location: {
      type: String,
      trim: true,
      required: "Location is required",
    },
    type: {
      type: String,
      enum: ["college", "university", "certificate", "course", "bootcamp"],
      default: "college",
    },
    description: {
      type: String,
      trim: true,
      required: "Description is required",
    },
    highlights: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Qualification", QualificationSchema);
