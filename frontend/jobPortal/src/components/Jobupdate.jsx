import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Jobupdate() {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    catagory: "",
    country: "",
    city: "",
    location: "",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
    salaryType: "default", // Add default value for salaryType
    jobType: "", // Add jobType to formData
    keySkill: "", // Added missing keySkill field
  });

  
  useEffect(() => {
    // Fetch job details by ID
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/jobportalApi/Jobdetails/${id}`); // Replace with your API endpoint
        setFormData(response.data.jobs); // Updated field to match singular job
      } catch (error) {
        console.error("Error fetching job details", error);
        toast.error("Failed to fetch job details.");
      }
    };
    fetchJobDetails();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/jobportalApi/updateJob/${id}`,
        formData
      ); // Replace with your API endpoint
      toast.success(response.data.message || "Job updated successfully!");
      navigate("/job/me"); // Redirect to the jobs list or another page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update job. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-md-8 mx-auto mt-5">
          <div className="card shadow-lg  " style={{ borderRadius: "25px" }}>
            <h2
              className="text-center bg-info pt-3 pb-3"
              style={{ borderEndStartRadius: "25px" }}
            >
              Update Jobs
            </h2>
            <div className="card-body mb-5">
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="">job Title</label>
                  <input
                    name="title"
                    placeholder="Job Title"
                    className="form-control"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Category</label>
                  <input
                    name="catagory"
                    type="text"
                    id="category"
                    className="form-select"
                    value={formData.catagory}
                    onChange={handleChange}
                  ></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">city</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="form-control"
                  />
                </div>

                {/* {salary} */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary
                  </label>
                  <select
                    name="salaryType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.salaryType}
                    onChange={handleChange}
                  >
                    <option value="default">Select salary type</option>
                    <option value="Fixed Salary">Fixed Salary</option>
                    <option value="Ranged Salary">Ranged Salary</option>
                  </select>

                  {formData.salaryType === "Fixed Salary" && (
                    <div className="mt-2">
                      <input
                        type="number"
                        name="fixedSalary"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter fixed salary"
                        value={formData.fixedSalary}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {formData.salaryType === "Ranged Salary" && (
                    <div className="mt-2 flex space-x-4">
                      <input
                        type="number"
                        name="salaryFrom"
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Salary From"
                        value={formData.salaryFrom}
                        onChange={handleChange}
                      />
                      <input
                        type="number"
                        name="salaryTo"
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Salary To"
                        value={formData.salaryTo}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="">description</label>
                  <textarea
                    className="form-control"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Job Description"
                  />
                </div>

                <center>
                  <button type="submit" className="btn btn-success">
                    Update Job
                  </button>
                </center>
              </form>
            </div>
            {/* <!--card-body--> */}
          </div>
          {/* <!--card end--> */}
        </div>
      </div>
    </>
  );
}

export default Jobupdate;
