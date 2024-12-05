import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Jobview = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
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
                                {element.fixedSalary}-{element.salaryTo}
                              </span>
                            )}
                          </p>

                          {/* Deadline */}
                          <small className="text-muted">
                            <i className="far fa-calendar-alt text-primary me-2"></i>
                            Date Line: {element.jobPostOn}
                          </small>

                          <i class="fa-regular fa-trash-can"></i>

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
