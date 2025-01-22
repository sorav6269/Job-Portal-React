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

  return (
    <>
      {/* Job Detail Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <h1 className="text-center mb-5">Job Details</h1>
          <div className="row gy-5 gx-4">
            {/* left Side Image */}
            <div className="col-lg-4 d-flex align-items-center">
              <img
                src="/img/3d.jpg"
                alt="Job Details"
                className="img-fluid rounded shadow-lg"
                style={{
                Height: "500px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>

            {/* Right Side Content */}
            <div className="col-lg-8">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Title:</strong>
                    </td>
                    <td>{jobs.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Country:</strong>
                    </td>
                    <td>{jobs.country}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>City:</strong>
                    </td>
                    <td>{jobs.city}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Location:</strong>
                    </td>
                    <td>{jobs.location}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Category:</strong>
                    </td>
                    <td>{jobs.catagory}</td>
                  </tr>
                  {jobs.fixedSalary ? (
                    <tr>
                      <td>
                        <strong>Fixed Salary:</strong>
                      </td>
                      <td>{jobs.fixedSalary}</td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td>
                          <strong>Salary From:</strong>
                        </td>
                        <td>{jobs.salaryFrom}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Salary To:</strong>
                        </td>
                        <td>{jobs.salaryTo}</td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td>
                      <strong>Description:</strong>
                    </td>
                    <td>{jobs.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Job Posted On:</strong>
                    </td>
                    <td>{jobs.jobPostOn}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-center">
                      {user && user.role === "Employer" ? (
                        <></>
                      ) : (
                        <Link
                          className="btn btn-info mt-2"
                          to={`/application/${jobs._id}`}
                        >
                          Apply Now
                        </Link>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Job Detail End */}
    </>
  );
};

export default Jobdetails;
