import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [Profileupdate, setProfileupdate] = useState({
    name: "",
    email: "",
  });

  // Handle profile update form submission
  const handlepasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password || !newpassword || !confirmpassword) {
      toast.error("All fields are required.");
      return;
    }
    if (newpassword !== confirmpassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    try {
      const response = await axios.post("/jobportalApi/changePassword", {
        password,
        newpassword,
        confirmpassword,
      });
      toast.success(response.data.message || "Password updated successfully!");
      setNewPassword("");
      setPassword("");
      setConfirmPassword("");
      navigate("/profile/me");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update password. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Handle input change for profile update form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileupdate((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/jobportalApi/updatep`, Profileupdate);
      toast.success(response.data.message || "Profile updated successfully!");
      navigate("/profile/me");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/jobportalApi/getuser`);
        const userData = response.data;
        if (userData) {
          setUser(userData);
          setIsAuthorized(true);
          setProfileupdate({
            name: userData.name || "",
            email: userData.email || "",
          });
        }
      } catch (error) {
        setIsAuthorized(false);
        console.error("Fetch User Error:", error);
      }
    };
    fetchUser();
  }, [id, setUser, setIsAuthorized]);

  return (
    <>
      <form className="card mx-auto mt-4 shadow-lg" style={{ maxWidth: "30%" }}>
        <div className="card-header bg-success text-center py-5">
          <img
            src="/img/3d.jpg"
            alt="UserAvatar"
            className="rounded-circle border border-white shadow"
            style={{ width: "6rem", height: "6rem" }}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold text-dark">{user?.name}</h5>
          <p className="card-text text-muted">{user?.email}</p>
          <p className="card-text text-success small mt-1">{user?.role}</p>
        </div>
        <div className="card-footer d-flex justify-content-around bg-light">
          <button
            className="btn btn-primary px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#a"
          >
            <Link
              onChange={`/profile/me/${Profileupdate._id}`}
              className="btn btn-primary"
            >
              Edit Profile
            </Link>
            
          </button>
          <button
            className="btn btn-primary px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#password"
          >
            <Link
              onChange={`/profile/me`}
              className="btn btn-primary"
            >
              Edit Password
            </Link>
          </button>
        </div>
      </form>

      {/* Modal for profile update */}
      <div className="modal" id="a">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Profile Update</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={Profileupdate.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={Profileupdate.email}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for password update */}
      <div className="modal" id="password">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Password Update</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlepasswordSubmit}>
                <div className="mb-3">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    className="form-control"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className="form-control"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

