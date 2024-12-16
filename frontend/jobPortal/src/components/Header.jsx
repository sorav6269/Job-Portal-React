import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
function Header() {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  // console.log(isAuthorized)
  const navigateTO = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/jobportalApi/logout");
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTO("/Login");
      // console.log(response)
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 ${
          isAuthorized ? "navbarShow" : "navbarHide"
        }`}
      >
        <a
          href="index.html"
          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">PNJOB</h2>
        </a>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div
            className={`navbar-nav ms-auto p-4 p-lg-0 ${
              show ? "show-menu menu" : "menu"
            }`}
          >
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={"/"}
                onClick={() => setShow(false)}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={"/Job/getall"}
                onClick={() => setShow(false)}
              >
                ALL JOBS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={"/application/me"}
                onClick={() => setShow(false)}
              >
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to={"/Jobpost"}
                    onClick={() => setShow(false)}
                  >
                    POST NEW JOB
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to={"/job/me"}
                    onClick={() => setShow(false)}
                  >
                    VIEW YOUR JOBS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to={"/Catageryinsert"}
                    onClick={() => setShow(false)}
                  >
                    Category
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            <li className="nav-item">
              <Link
                className="nav-link active"
                to={"/Contact"}
                onClick={() => setShow(false)}
              >
                CONTACTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/profile/me"}>
                <img
                  src="/img/3d.jpg"
                  alt="UserAvatar"
                  className="rounded-circle border border-white shadow "
                  style={{ width: "3rem", height: "3rem", marginTop:"-20%" }}
                />
              </Link>
            </li>

            <button className="btn btn-danger" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );
}

export default Header;
