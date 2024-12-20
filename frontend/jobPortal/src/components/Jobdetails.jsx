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
                {jobs.fixedSalary ? (
                  <tr>
                    <td>Fixed Salary:</td>
                    <td>{jobs.fixedSalary}</td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td>Salary From:</td>
                      <td>{jobs.salaryFrom}</td>
                    </tr>
                    <tr>
                      <td>Salary To:</td>
                      <td>{jobs.salaryTo}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>Description:</td>
                  <td>{jobs.description}</td>
                </tr>
                <tr>
                  <td>Job Posted On:</td>
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
