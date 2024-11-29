import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Catagery = () => {
  const [Category, setCategory] = useState([]);

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

  return (
    <>
      {/* Page header and content */}
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Category
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
      {/* Category content */}
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
                    <p className="mb-0">{item.vacancy}</p>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catagery;
