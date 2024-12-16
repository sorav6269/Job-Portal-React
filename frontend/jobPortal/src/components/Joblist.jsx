import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const  Joblist= () => {
 const [jobs, setJobs] = useState([]);
  const { isAuthorized} = useContext(Context);
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
    navigateTo("/");
  }
  // console.log(jobs);

  return (
      <>
      {/* <!-- Header End --> */}
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Job List
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
                Job List
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Jobs Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Job Listing
          </h1>
          <div
            className="tab-className text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <h6 className="mt-n1 mb-0">Featured</h6>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                {jobs.jobs &&
                  jobs.jobs.map((element) => {
                    return (
                      <>
                        <div className="job-item p-4 mb-4">
                          <div className="row g-4">
                            <div className="col-sm-12 col-md-8 d-flex align-items-center">
                              <img
                                className="flex-shrink-0 img-fluid border rounded"
                                src="img/com-logo-1.jpg"
                                alt=""
                                style={{ width: "80px", height: "80px" }}
                              />
                              <div className="text-start ps-4">
                                <h5 className="mb-3">{element.title}</h5>
                                <span className="text-truncate me-3">
                                  <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                  {element.country}
                                </span>
                                <span className="text-truncate me-3">
                                  <i className="far fa-clock text-primary me-2"></i>
                                  Full Time
                                </span>
                                <span className="text-truncate me-3">
                                  <i className="far fa-clock text-primary me-2"></i>
                                  {element.category}
                                </span>
                                <span className="text-truncate me-0">
                                  <i className="far fa-money-bill-alt text-primary me-2"></i>{" "}
                                  {element.fixedSalary ? (
                                    <span>{element.fixedSalary}</span>
                                  ) : (
                                    <span>
                                      {element.salaryFrom}-{element.salaryTo}
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                              <div className="d-flex mb-3">
                                <a
                                  className="btn btn-light btn-square me-3"
                                  href=""
                                >
                                  <i className="far fa-heart text-primary"></i>
                                </a>
                                {/* <a className="btn btn-primary" href="">
                                Apply Now
                              </a> */}
                                <Link
                                  to={`/Jobdetails/${element._id}`}
                                  className="btn btn-primary"
                                >
                                  Job Details
                                </Link>
                              </div>
                              <small className="text-truncate">
                                <i className="far fa-calendar-alt text-primary me-2"></i>
                                Date Line: {element.jobPostOn}
                              </small>
                            </div>
                          </div>
                        </div>
                      </>
                      //console.log(element)
                    );
                  })}
              </div>
           
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Jobs End --> */}
    </>
  );
};


export default Joblist