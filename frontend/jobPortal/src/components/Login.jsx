import { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/jobportalApi/login", {
        email,
        password,
        role,
      });
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  // Handle Forgot Password Submission
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/jobportalApi/ForgetPasswordVerify", {
        email: forgetEmail,
      });
      toast.success(data.message);
      setForgetEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Redirect if the user is authorized
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url(./img/login.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="col-11 col-md-6 col-lg-4 mx-auto pt-5">
          <div className="card shadow-lg" style={{ borderRadius: "25px" }}>
            <h2
              className="text-center bg-info text-white pt-3 pb-3"
              style={{ borderRadius: "25px" }}
            >
              Login Form
            </h2>
            <div className="card-body mb-5">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role">Login As</label>
                  <select
                    name="role"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select User</option>
                    <option value="job Seeker">Job Seeker</option>
                    <option value="Employer">Employer</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger mt-1 w-100"
                  style={{ backgroundColor: "brown" }}
                >
                  Login
                </button>
              </form>
              <br />
              <center>
                <p className="mt-3">
                  Don't have an account?
                  <a
                    href="/Register"
                    style={{
                      color: "blue",
                      marginLeft: "10px",
                      fontSize: "16px",
                      textDecoration: "underline",
                    }}
                  >
                    Register Here
                  </a>
                </p>
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#Forget"
                  style={{
                    color: "blue",
                    fontSize: "16px",
                    textDecoration: "underline",
                  }}
                >
                  Forget Password
                </Link>
              </center>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div
        className="modal fade"
        id="Forget"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Forget Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleForgetPassword}>
                <div className="mb-3">
                  <label htmlFor="forgetEmail">Email</label>
                  <input
                    type="email"
                    name="forgetEmail"
                    className="form-control"
                    id="forgetEmail"
                    value={forgetEmail}
                    onChange={(e) => setForgetEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
