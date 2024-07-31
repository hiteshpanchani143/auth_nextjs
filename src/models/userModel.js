import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide an username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "Please provide an email"],
  },
  password: {
    type: String,
    require: [true, "Please provide an password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
});

const User =mongoose.models.users || mongoose.model("users", userSchema);

export default User;
