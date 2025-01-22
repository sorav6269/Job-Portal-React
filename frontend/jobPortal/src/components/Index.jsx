import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Index= ()=> {

  const { isAuthorized } = useContext(Context);
  const [Category, setCategory] = useState([]);
  const[jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("/jobportalApi/categoryDisplay"); // Change this if you need the full URL
        setCategory(res.data.Category); // Ensure the response structure matches
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, []);

  
  const [selectCategory, setselectCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("/jobportalApi/categoryDisplay"); // Change this if you need the full URL
        // console.log(res.data);
        setselectCategory(res.data.Category);

        // Ensure the response structure matches
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, []);
  useEffect(() => {
    const fetchjobs = async () => {
      try {
        const {data} = await axios.get("/jobportalApi/getalljobs"); // Change this if you need the full URL
        // console.log(data);
        setJobs(data);

        // Ensure the response structure matches
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    };

    fetchjobs();
  }, []);
  // console.log(isAuthorized);
  if (!isAuthorized) {
    return <Navigate to={"/Login"} />;
  }
  return (
    <>
      {/* Page header and content */}
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            WELCOME TO JOBS PORTAL
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
                Category
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Carousel Start -->   */}
      <div className="container-fluid p-0">
        <div className="owl-carousel header-carousel position-relative">
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="img/carousel-1.jpg" alt="" />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(43, 57, 64, .5)" }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-3 text-white animated slideInDown mb-4">
                      Find The Perfect Job That You Deserved
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                      Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                      diam no. Kasd rebum ipsum et diam justo clita et kasd
                      rebum sea elitr.
                    </p>
                    <a
                      href=""
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Search A Job
                    </a>
                    <a
                      href=""
                      className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                    >
                      Find A Talent
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="img/carousel-2.jpg" alt="" />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(43, 57, 64, .5)" }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-3 text-white animated slideInDown mb-4">
                      Find The Best Startup Job That Fit You
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                      Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                      diam no. Kasd rebum ipsum et diam justo clita et kasd
                      rebum sea elitr.
                    </p>
                    <a
                      href=""
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Search A Job
                    </a>
                    <a
                      href=""
                      className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                    >
                      Find A Talent
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Carousel End --> */}

      {/* <!-- Search Start --> */}
      <div
        className="container-fluid bg-primary mb-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ padding: "35px" }}
      >
        <div className="container">
          <div className="row g-2">
            <div className="col-md-10">
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Keyword"
                  />
                </div>
                <div className="col-md-4">
                  <select
                    id="category"
                    className="form-select"
                    value={selectCategory}
                    onChange={(e) => setselectCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {selectCategory.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select className="form-select border-0">
                    <option selected>Location</option>
                    <option defaultValue="1">Location 1</option>
                    <option defaultValue="2">Location 2</option>
                    <option defaultValue="3">Location 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button className="btn btn-dark border-0 w-100">Search</button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Search End --> */}

      {/* <!-- Category Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Explore By Category
          </h1>
          <div className="row g-4">
            {Category.map((item, index) => (
              <div
                key={index}
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <Link to={`/CategoridyList/${item.name}`}>
                  <a className="cat-item rounded p-4" href="#">
                    <i className={`${item.icon} text-primary mb-4`}></i>
                    <h6 className="mb-3">{item.name}</h6>
                    <span>
                      <p>Vacancy</p>
                      <p className="mb-0">{item.vacancy}</p>
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>

          <center>
            <Link className="btn btn-primary mt-3 " to="/Catagery">
              More Category
            </Link>
          </center>
        </div>
      </div>
      {/* <!-- Category End --> */}

      {/* <!-- About Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="row g-0 about-bg rounded overflow-hidden">
                <div className="col-6 text-start">
                  <img className="img-fluid w-100" src="img/about-1.jpg" />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid"
                    src="img/about-2.jpg"
                    style={{ width: " 85%", marginTop: "15%" }}
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid"
                    src="img/about-3.jpg"
                    style={{ width: "85%" }}
                  />
                </div>
                <div className="col-6 text-end">
                  <img className="img-fluid w-100" src="img/about-4.jpg" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="mb-4">
                We Help To Get The Best Job And Find A Talent
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Tempor erat
                elitr rebum at clita
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Aliqu diam amet
                diam et eos
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Clita duo justo
                magna dolore erat amet
              </p>
              <a className="btn btn-primary py-3 px-5 mt-3" href="/About">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}

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
                  jobs.jobs.slice(0, 3).map((element) => {
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

            <a className="btn btn-primary py-3 px-5" href="/Job/getall">
              Browse More Jobs
            </a>
          </div>
        </div>
      </div>

      {/* <!-- Jobs End --> */}
    </>
  );
}

export default Index;
