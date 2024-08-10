import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    authData: {
      email: { type: String, required: true, lowercase: true },
      password: { type: String, required: true },
      userName: { type: String, required: true },
    },
    profileData: {
      firstName: { type: String, required: true, lowercase: true },
      lastName: { type: String, required: true, lowercase: true },
      phoneNum: { type: String, required: true },
      bio: { type: String, trim: true },
      profileImage: {
        profileKey: { type: String },
        profileUrl: { type: String },
      },
    },

    userVideos: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        duration: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default model("User", userModel);
