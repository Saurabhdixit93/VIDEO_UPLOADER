import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Profile from "../components/Profile";
import { useDispatch } from "react-redux";
import { GET_DATA_BY_USER } from "../redux/features/userSlice";
import VideoCard from "../components/videoCard";

export default function ProfilePage() {
  const userData = localStorage.getItem("userData");
  const parsedData = JSON.parse(userData);

  const dispatch = useDispatch();
  const [userExploreData, setUserExploreData] = useState([]);

  useEffect(() => {
    const getUserData = () => {
      return dispatch(GET_DATA_BY_USER({ userId: parsedData._id }))
        .unwrap()
        .then((res) => {
          setUserExploreData(res);
          return;
        })
        .catch((_) => {
          return;
        });
    };
    getUserData();
  }, [dispatch]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  const handlePlay = (index) => {
    if (activeVideoIndex !== null && activeVideoIndex !== index) {
      document.getElementById(`video-${activeVideoIndex}`).pause();
    }
    setActiveVideoIndex(index);
  };
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Profile user={parsedData} />

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
    </Layout>
  );
}
