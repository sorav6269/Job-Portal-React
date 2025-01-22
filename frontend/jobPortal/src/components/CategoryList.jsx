import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';

function CategoryList() {
  const { name } = useParams();
  const [categoryData, setcategoryData] = useState([]);

  const { isAuthorized, user } = useContext(Context);

  const CategoryList = async () => {
    // setIsAuthorized(true);
    try {
      const { data } = await axios.get(`/jobportalApi/CategoryList/${name}`);
      // console.log(data.CategoryList);

      setcategoryData(data.CategoryList);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CategoryList();
  }, []);
  const navigateTo = useNavigate();
  if (!isAuthorized) {
    navigateTo("/");
  }
  // console.log(categoryData)
  return (
    <>
     <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Job Listing
          </h1>
          <div
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="tab-content">
              <div className="tab-pane fade show p-0 active">
                {categoryData.map((element) => {
                  const postedDate = new Date(
                    element.jobPostedOn
                  ).toLocaleDateString();

                  return (
                    <div className="job-item p-4 mb-4" key={element.name}>
                      <div className="row g-4">
                        <div className="col-sm-12 col-md-8 d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid border rounded"
                            src={element.img || "img/com-logo-1.jpg"}
                            alt={element.title}
                            style={{ width: 80, height: 80 }}
                          />
                          <div className="text-start ps-4">
                            <h5 className="mb-3">{element.title}</h5>
                            <span className="text-truncate me-3">
                              <i className="fa fa-map-marker-alt text-primary me-2" />
                              {element.location}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-clock text-primary me-2" />
                              {element.category}
                            </span>
                            <span className="text-truncate me-0">
                              <i className="far fa-money-bill-alt text-primary me-2" />
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                          <div className="d-flex mb-3">
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
     </div>
    </>
  )
}

export default CategoryList