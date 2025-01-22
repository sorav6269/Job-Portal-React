import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CategoryInsert() {
  const [name, setname] = useState("");
  const [icon, setIcon] = useState("");
  const [vacancy,setvacancy] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/jobportalApi/categoryInsert", {
        name,
        icon,
        vacancy,
      });
      setname("");
      setIcon("");
      setvacancy("")
      toast.success(response.data.message || "Category inserted successfully!");
    } catch (error) {
      toast(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="col-md-5 mx-auto p-4">
      <h2 className="my-4 text-center">Category Insert</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Category Name"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Icon"
            className="form-control"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="vacancy"
            className="form-control"
            value={vacancy}
            onChange={(e) => setvacancy(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn  btn-outline-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryInsert;
