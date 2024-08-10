import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GET_DATA_BY_USER } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import VideoCard from "../components/videoCard";
import toast from "react-hot-toast";

export default function Userall() {
  const params = useParams();
  const userId = params.id;

  const dispatch = useDispatch();
  const [userExploreData, setUserExploreData] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  useEffect(() => {
    const getUserData = () => {
      return dispatch(GET_DATA_BY_USER({ userId: userId }))
        .unwrap()
        .then((res) => {
          setUserExploreData(res);
          return;
        })
        .catch((_) => {
          toast.error("Something went wrong");
          return <Navigate to="/" replace />;
        });
    };
    getUserData();
  }, [dispatch, userId]);

  const handlePlay = (index) => {
    if (activeVideoIndex !== null && activeVideoIndex !== index) {
      document.getElementById(`video-${activeVideoIndex}`).pause();
    }
    setActiveVideoIndex(index);
  };
  return (
    <div className="w-full p-4">
      {userExploreData.length !== 0 ? (
        <div className="flex flex-wrap w-full gap-4">
          {userExploreData?.map((user, index) => {
            return (
              <VideoCard video={user} handlePlay={handlePlay} index={index} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
