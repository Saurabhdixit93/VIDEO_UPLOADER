import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UPLOAD_PROFILE_IMAGE, USER_BIO } from "../redux/features/userSlice";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio);
  const [profileImage, setProfileImage] = useState(user.profileImage);

  const handleBioChange = (e) => {
    if (e.target.value.split(" ").length <= 600) {
      setBio(e.target.value);
    }
  };

  const openBioEditor = () => setIsEditingBio(true);
  const closeBioEditor = () => setIsEditingBio(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(UPLOAD_PROFILE_IMAGE(formData))
        .unwrap()
        .then((res) => {
          const userData = JSON.parse(localStorage.getItem("userData"));
          userData.profileImage = res;
          localStorage.setItem("userData", JSON.stringify(userData));
        })
        .catch(() => {});
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateBio = () => {
    return dispatch(USER_BIO({ bio }))
      .unwrap()
      .then((res) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.bio = res;
        localStorage.setItem("userData", JSON.stringify(userData));
        return closeBioEditor();
      })
      .catch((_) => {});
  };
  return (
    <div className="max-w-3xl mx-auto p-4 flex w-full items-center justify-between">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <input
          type="file"
          id="upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="upload" className="cursor-pointer">
          <img
            src={profileImage}
            alt={user.fullName}
            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
          />
        </label>

        <div className="text-center">
          <h2 className="text-2xl font-semibold capitalize">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phoneNumber}</p>
        </div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <h3 className="text-lg font-medium">Bio</h3>
          <button
            onClick={openBioEditor}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        <p className="mt-2">{bio}</p>
      </div>

      {isEditingBio && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Bio</h2>
            <textarea
              value={bio}
              onChange={handleBioChange}
              className="w-full h-40 p-2 border rounded"
              maxLength={600}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeBioEditor}
                className="px-4 py-2 bg-gray-200 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={updateBio}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
