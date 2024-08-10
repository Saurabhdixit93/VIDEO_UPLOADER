import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "./videoCard";

const UserProfile = ({ user }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  const handlePlay = (index) => {
    if (activeVideoIndex !== null && activeVideoIndex !== index) {
      document.getElementById(`video-${activeVideoIndex}`).pause();
    }
    setActiveVideoIndex(index);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 border border-gray-300 p-4 rounded-lg shadow-md">
        <img
          src={user?.profileImage}
          alt={user?.fullName}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold capitalize">{user.fullName}</h2>
        </div>
      </div>

      <div className="flex w-full justify-end mt-2">
        <Link
          className="text-blue-500 hover:text-blue-700 hover:underline"
          to={`/view-user-videos/${user?._id}`}
        >
          View All Videos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {user?.userVideos?.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            index={index}
            handlePlay={handlePlay}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
