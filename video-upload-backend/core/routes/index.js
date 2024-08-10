import { Router } from "express";
import userRoute from "./userRoute.js";
import { LISTING_USER_DATA_WITH_VIDEO } from "../controllers/publicApiController.js";

const router = Router();

router.get("/status", (req, res) => {
  return res
    .status(200)
    .json({ message: " Server is up and running ", status: true });
});

// user route

router.use("/user", userRoute);
router.get("/listing-page", async (req, res) =>
  LISTING_USER_DATA_WITH_VIDEO(req, res)
);

export default router;
