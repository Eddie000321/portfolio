import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
    },
    hashed_password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    if (!password) {
      this.invalidate("password", "Password is required");
    } else if (password.length < 6) {
      this.invalidate("password", "Password must be at least 6 characters.");
    } else {
      this.hashed_password = bcrypt.hashSync(password, 10);
    }
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods.authenticate = function (password) {
  return bcrypt.compare(password, this.hashed_password);
};

export default mongoose.model("User", UserSchema);
