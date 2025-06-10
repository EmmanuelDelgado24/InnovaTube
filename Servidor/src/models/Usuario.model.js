import mongoose, { Schema, model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nameCompleto: {
      type: String,
      required: true,
      trim: true,
    },
    nameUser: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    //recaptchaToken: {
    //  type: String,
    //  required: true, // El token de ReCaptcha se validará del lado del backend
    //},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
