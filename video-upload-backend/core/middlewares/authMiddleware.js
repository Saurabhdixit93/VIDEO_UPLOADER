import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import "dotenv/config";

export const ValidateAuthUser = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    // Handle the case where the Authorization header is missing
    return res.status(403).json({
      error: "Authorization header missing",
      status: false,
      code: 403,
    });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({
      error: "Invalid token format",
      status: false,
      code: 401,
    });
  }

  const authToken = tokenParts[1]; // Extract the token part

  if (!authToken) {
    return res.status(401).json({
      message:
        "Authentication token has been invalidated or expired. Please log in again.",
      status: false,
      code: 401,
    });
  }
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.UserId = decodedToken.id;

    // HERE CHECK THAT USER Account IS VALID
    const isUser = await userModel.findById(decodedToken.id);
    if (!isUser) {
      return res.status(401).json({
        error: "User not found or not active",
        status: false,
        code: 401,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
      status: false,
      code: 401,
    });
  }
};
