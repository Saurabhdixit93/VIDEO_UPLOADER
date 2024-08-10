import userModel from "../models/userModel.js";

export const LISTING_USER_DATA_WITH_VIDEO = async (req, res) => {
  try {
    const users = await userModel.aggregate([
      {
        $project: {
          _id: 1,
          fullName: {
            $concat: [
              { $ifNull: ["$profileData.firstName", ""] },
              " ",
              { $ifNull: ["$profileData.lastName", ""] },
            ],
          },
          bio: "$profileData.bio",
          profileImage: "$profileData.profileImage.profileUrl",
          userVideos: {
            $map: {
              input: "$userVideos",
              as: "video",
              in: {
                title: "$$video.title",
                videoUrl: "$$video.videoUrl",
                thumbnailPath: "$$video.thumbnailPath",
                duration: "$$video.duration",
              },
            },
          },
          videoCount: { $size: "$userVideos" },
        },
      },
    ]);

    if (users.length === 0)
      return res
        .status(404)
        .json({ message: "No user found", status: false, code: 404 });

    return res.status(200).json({
      data: users,
      status: true,
      code: 200,
      message: "User data retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, status: false, code: 500 });
  }
};
