import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { GET_PUBLIC_DATA } from "../redux/features/publicSlice";
import UserProfile from "../components/VideoExplore";

export default function HomePage() {
  const dispatch = useDispatch();
  const [userExploreData, setUserExploreData] = useState([]);

  useEffect(() => {
    const getUserData = () => {
      return dispatch(GET_PUBLIC_DATA())
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

  return (
    <Layout>
      <div className="w-full">
        {userExploreData.length !== 0 ? (
          <>
            {userExploreData?.map((user, index) => {
              return <UserProfile key={index} user={user} />;
            })}
          </>
        ) : null}
      </div>
    </Layout>
  );
}
