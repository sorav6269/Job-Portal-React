import React, { useState } from "react";
import axios from "axios"; // Ensure Axios is imported
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState(""); // Correct casing for setPassword

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make sure to specify the endpoint correctly
      const { data } = await axios.post("/jobportalApi/reset_password", {
        password,
      });

      // Show success message
      toast.success(data.message || "Password reset successfully!");
      console.log(data.message);

      // Clear input field
      setPassword("");
    } catch (error) {
      // Handle error gracefully
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error resetting password");
      } else {
        toast.error("Something went wrong, please try again later.");
      }
      console.error("Error resetting password:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                <h2 className="text-center">Reset Password?</h2>
                <p>You can reset your password here.</p>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="glyphicon glyphicon-lock text-primary"></i>
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Fixed setPassword function
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-info w-100">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
