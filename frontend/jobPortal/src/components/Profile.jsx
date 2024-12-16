import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";

function Profile() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  // console.log(isAuthorized)

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async ()=> {
      try {
        const response = await axios.get("/jobportalApi/getuser");
        console.log(response.data)
        setUser(response.data);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        console.error("Fetch User Error:", error);
      } 
    };
    fetchUser();
  }, [setUser, setIsAuthorized]);

  return (
    <>
      <form  className="card mx-auto mt-4 shadow-lg" style={{ maxWidth: "30%" }}>
        <div className="card-header bg-success text-center py-5">
          <img
            src="/img/3d.jpg"
            alt="UserAvatar"
            className="rounded-circle border border-white shadow "
            style={{ width: "6rem", height: "6rem" }}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold text-dark" >{user.name }</h5>
          <p className="card-text text-muted">{ user.email}</p>
          <p className="card-text text-success small mt-1" >{ user.role}</p>
        </div>
        <div className="card-footer d-flex justify-content-around bg-light">
          <button
            className="btn btn-success px-4 py-2"
            // onclick="toggleProfileModal()"
          >
            Edit Profile
          </button>
          <button
            className="btn btn-primary px-4 py-2"
            // onclick="togglePasswordModal()"
          >
            Edit Password
          </button>
        </div>
      </form>

      {/* Profile Modal */}
      {/* {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Update Profile</h3>
              <button
                onClick={toggleProfileModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4" onSubmit={handleProfileSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleProfileModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={updatingProfile}
                  >
                    {updatingProfile ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}

      {/* Password Modal */}
      {/* {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Update Password</h3>
              <button
                onClick={togglePasswordModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={togglePasswordModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={updatingPassword}
                  >
                    {updatingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Profile;
