import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Jobview = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState()
  const { isAuthorized } = useContext(Context);
  //  const { id } = useParams();

  const navigateTo = useNavigate();

  const getalljob = async () => {
    try {
      const { data } = await axios.get("/jobportalApi/getalljobs");
      // console.log(data);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getalljob();
  }, []);

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this job?")) {
    return; // Exit if user cancels
  }
  try {
    await axios.get(`/jobportalApi/deleteJob/${id}`);
    // Update job list after successful deletion
    setJobs(jobs.filter((Job) => job._id !== id));
  } catch (err) {
    console.error("Error deleting job:", err);
    setError("Failed to delete the job.");
  }
  };
  
  if (!isAuthorized) {
    navigateTo("/job/me");
  }
  // console.log(jobs);
  return (
    <>
      {/* <!-- Jobs Start --> */}
      <div className="container">
        <div className="tab-className wow fadeInUp" data-wow-delay="0.3s">
          <div className="tab-content mt-5">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-3">
                {" "}
                {/* Bootstrap row with spacing */}
                {jobs.jobs &&
                  jobs.jobs.map((element) => (
                    <div className="col-md-4 col-sm-6 col-lg-3">
                      {" "}
                      {/* Adjust column sizes for responsiveness */}
                      <div className="card h-100">
                        {" "}
                        {/* Bootstrap card */}
                        <div className="card-body">
                          {/* Job Title */}
                          <h5 className="card-title text-truncate">
                            {element.title}
                          </h5>

                          {/* Job Location */}
                          <p className="card-text text-truncate">
                            <i className="fa fa-map-marker-alt text-primary me-2"></i>
                            {element.country}
                          </p>

                          {/* Job Type */}
                          <p className="card-text text-truncate">
                            <i className="far fa-clock text-primary me-2"></i>
                            Full Time
                          </p>

                          {/* Job Category */}
                          <p className="card-text text-truncate">
                            <i className="far fa-clock text-primary me-2"></i>
                            {element.catagory}
                          </p>

                          {/* Salary */}
                          <p className="card-text text-truncate">
                            <i className="far fa-money-bill-alt text-primary me-2"></i>
                            {element.fixedSalary ? (
                              <span>{element.fixedSalary}</span>
                            ) : (
                              <span>
                                {element.salaryFrom}-{element.salaryTo}
                              </span>
                            )}
                          </p>
                          <p className="card-text text-truncate">
                            {/* Deadline */}
                            <small className="text-muted">
                              <i className="far fa-calendar-alt text-primary me-2"></i>
                              Date Line: {element.jobPostOn}
                            </small>
                          </p>
                          <button
                            className="btn btn-danger text-white bg-red-500 hover:bg-red-700 py-1 px-3  rounded"
                            onClick={() => handleDelete(element._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button className="btn text-white bg-red-500 hover:bg-red-700 py-1 px-3 mx-5  rounded ">
                            {" "}
                            <Link
                              to={`/Jobupdate/${element._id}`}
                              className="btn btn-primary"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Jobs End --> */}
    </>
  );
};

export default Jobview;
