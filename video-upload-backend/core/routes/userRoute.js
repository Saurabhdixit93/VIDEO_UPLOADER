import { Router } from "express";
import {
  GET_DATA_BY_ID,
  UPDATE_PROFILE_DATA,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_VIDEO,
  USER_CREATE,
  USER_LOGIN,
} from "../controllers/userController.js";
import upload from "../Helpers/multer.js";
import { ValidateAuthUser } from "../middlewares/authMiddleware.js";

const userRoute = Router();

userRoute.post("/create", async (req, res) => USER_CREATE(req, res));
userRoute.post("/login", async (req, res) => USER_LOGIN(req, res));
userRoute.put("/profile-update", async (req, res) =>
  UPDATE_PROFILE_DATA(req, res)
);

userRoute.get("/get-user-data", async (req, res) => GET_DATA_BY_ID(req, res));

userRoute.post(
  "/profile-image",
  ValidateAuthUser,
  upload.single("image"),
  async (req, res) => UPLOAD_PROFILE_IMAGE(req, res)
);

userRoute.post(
  "/upload-video",
  ValidateAuthUser,
  upload.single("video"),
  async (req, res) => UPLOAD_VIDEO(req, res)
);
export default userRoute;
