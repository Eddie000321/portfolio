import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: "First name is required",
    },
    lastName: {
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
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
      required: "Subject is required",
    },
    message: {
      type: String,
      trim: true,
      required: "Message is required",
      minlength: [10, "Message should be at least 10 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", ContactSchema);
