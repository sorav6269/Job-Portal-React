import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";

const Jobdetails = () => {
  const [jobs, setJobs] = useState([]);
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);
  const viewjobs = async () => {
    try {
      const { data } = await axios.get(`/jobportalApi/Jobdetails/${id}`);
      // console.log(data.jobs)
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewjobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }
  // console.log(jobs)
  return (
    <>
      {/* <!-- Header End --> */}
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Job Details
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Job Details
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Job Detail Start --> */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row gy-5 gx-4">
            <table>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>{jobs.title}</td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>{jobs.country}</td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>{jobs.city}</td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>{jobs.location}</td>
                </tr>
                <tr>
                  <td>Category:</td>
                  <td>{jobs.catagory}</td>
                </tr>
                <tr>
                  <td>FixedSalary:</td>
                  <td>{jobs.fixedSalary}</td>
                </tr>
                <tr>
                  <td>SalaryFrom:</td>
                  <td>{jobs.salaryFrom}</td>
                </tr>
                <tr>
                  <td>SalaryTo:</td>
                  <td>{jobs.salaryTo}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{jobs.description}</td>
                </tr>
                <tr>
                  <td>JobPostedOn:</td>
                  <td>{jobs.jobPostOn}</td>
                </tr>
                <tr>
                  <td>
                    {user && user.role === "Employer" ? (
                      <></>
                    ) : (
                      <center>
                        <Link
                          className="btn btn-info mt-2"
                          to={`/application/${jobs._id}`}
                        >
                          Apply Now
                        </Link>
                      </center>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <!-- Job Detail End --> */}
    </>
  );
};

export default Jobdetails;
