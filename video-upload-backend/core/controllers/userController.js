import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { accountCreatedTemplate } from "../Helpers/emailTemplates.js";
import { sendEmail } from "../Helpers/mailer.js";
import {
  generateRandomPassword,
  generateRandomUsername,
} from "../Helpers/password.js";
import cloudinary from "../Helpers/ImageUpload.js";
import fs from "fs/promises";
import mongoose from "mongoose";

export const USER_CREATE = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber) {
    return res
      .status(400)
      .json({ error: "All fields are required", status: false, code: 400 });
  }

  try {
    const isUserExist = await userModel.findOne({
      $or: [
        { "authData.email": email },
        { "profileData.phoneNum": phoneNumber },
      ],
    });

    if (isUserExist) {
      return res
        .status(409)
        .json({ error: "User already exists", status: false, code: 409 });
    }

    const randomPassword = generateRandomPassword(
      firstName,
      lastName,
      email,
      phoneNumber
    );

    const hashedUserPass = await bcrypt.hash(randomPassword, 10);

    const userName = generateRandomUsername(
      firstName,
      lastName,
      email,
      phoneNumber
    );
    const user = new userModel({
      authData: {
        email: email,
        password: hashedUserPass,
        userName: userName,
      },
      profileData: {
        firstName: firstName,
        lastName: lastName,
        phoneNum: phoneNumber,
      },
    });
    await user.save();
    const emailHtml = accountCreatedTemplate(user, randomPassword);
    await sendEmail(email, "Account Created successfully", emailHtml);
    return res.status(201).json({
      message: "User created successfully",
      status: true,
      code: 201,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};

export const USER_LOGIN = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "All fields are required", status: false, code: 400 });
  }
  try {
    const isUserExist = await userModel.findOne({ "authData.email": email });
    if (!isUserExist) {
      return res
        .status(404)
        .json({ error: "User not found", status: false, code: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.authData.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Incorrect password or email",
        status: false,
        code: 401,
      });
    }

    const tokenPayload = {
      id: isUserExist._id,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const data = {
      token,
      firstName: isUserExist.profileData.firstName,
      lastName: isUserExist.profileData.lastName,
      email: isUserExist.authData.email,
      phoneNumber: isUserExist.profileData.phoneNum,
      profileImage: isUserExist.profileData.profileImage.profileUrl,
      _id: isUserExist._id,
      bio: isUserExist.profileData.bio,
    };
    return res.status(200).json({
      message: "User logged in successfully",
      status: true,
      code: 200,
      data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};

export const UPLOAD_PROFILE_IMAGE = async (req, res) => {
  const file = req.file;
  const filePath = req.file.path;

  if (!file) {
    return res
      .status(400)
      .json({ error: "Profile image is required", status: false, code: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "addictive-media/profile-images",
    });

    await userModel.findOneAndUpdate(
      { _id: req.UserId },
      {
        $set: {
          "profileData.profileImage.profileUrl": result.secure_url,
          "profileData.profileImage.profileKey": result.public_id,
        },
      },
      { new: true }
    );
    await fs.unlink(filePath);
    return res.status(200).json({
      message: "Profile image uploaded successfully",
      status: true,
      code: 200,
      data: result.secure_url,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};

export const UPDATE_PROFILE_DATA = async (req, res) => {
  const userId = req.UserId;
  const { bio } = req.body;

  if (!bio) {
    return res
      .status(400)
      .json({ error: "All fields are required", status: false, code: 400 });
  }

  try {
    await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "profileData.bio": bio,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Profile data updated successfully",
      status: true,
      code: 200,
      data: bio,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};

export const UPLOAD_VIDEO = async (req, res) => {
  const file = req.file;
  const filePath = req.file.path;

  if (!file) {
    return res
      .status(400)
      .json({ error: "Video is required", status: false, code: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "addictive-media/videos",
    });

    // Extract video metadata
    const videoUrl = result.secure_url;
    const duration = result?.duration;
    const title = req.file.originalname;

    const user = await userModel.findOneAndUpdate(
      { _id: req.UserId },
      {
        $push: {
          userVideos: {
            title: title,
            videoUrl: videoUrl,
            duration: duration,
          },
        },
      },
      { new: true }
    );
    await fs.unlink(filePath);

    return res.status(200).json({
      message: "Video uploaded successfully",
      status: true,
      code: 200,
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};

export const GET_DATA_BY_ID = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User ID is required", status: false, code: 400 });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid User ID format", status: false, code: 400 });
    }

    const userVideos = await userModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $project: {
          _id: 0,
          userVideos: 1,
        },
      },
    ]);

    if (userVideos.length === 0) {
      return res.status(404).json({
        message: "User data not found",
        status: false,
        code: 404,
      });
    }
    return res.status(200).json({
      message: "User data fetched successfully",
      status: true,
      code: 200,
      data: userVideos[0].userVideos,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};
