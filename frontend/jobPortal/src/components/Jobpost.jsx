import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Jobpost() {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [catagory, setcatagory] = useState("");
    const [country, setcountry] = useState("");
    const [city, setcity] = useState("");
    const [location, setlocation] = useState("");
    const [salaryType, setsalaryType] = useState("default")
    const [fixedSalary, setfixedSalary] = useState("")
    const [salaryTo, setsalaryTo] = useState("")
    const [salaryFrom, setsalaryFrom] = useState("")
  const { isAuthorized, user } = useContext(Context)
const [selectCategory, setselectCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("/jobportalApi/categoryDisplay"); // Change this if you need the full URL
        console.log(res.data)
        setselectCategory(res.data.Category);
        
        // Ensure the response structure matches
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, []);
  
    const handleJobpost = async (e) => {
        e.preventDefault();
        if (salaryType === "Fixed Salary") {
          setsalaryFrom("");
            setsalaryFrom("") 
        } else if (salaryType === "Ranged Salary") {
            setfixedSalary("")
        } else {
            setsalaryFrom("")
            setsalaryTo("")
            setfixedSalary("")
        }
        await axios
          .post(
            "/jobportalApi/postjob",
            fixedSalary.length >= 4
              ? {
                  title,
                  description,
                  catagory,
                  country,
                  city,
                  location,
                  fixedSalary,
                }
              : {
                  title,
                  description,
                  catagory,
                  country,
                  city,
                  location,
                  salaryFrom,
                  salaryTo,
                },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            // Reset Field
            settitle("")
            setdescription("")
            setcatagory("default")
            setcity("")
            setcountry("")
            setlocation("")
            setfixedSalary("")
            setsalaryFrom("")
            setsalaryTo("")
            // navigateTo("/getalljobs");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
    }

  
    const navigateTo = useNavigate()
    if (!isAuthorized || (user && user.role !== "Employer")) {
        navigateTo("/Job/getall");
    }
   return (
     <>
       <div className="container">
         <div className="col-md-8 mx-auto mt-5">
           <div className="card shadow-lg  " style={{ borderRadius: "25px" }}>
             <h2
               className="text-center bg-info pt-3 pb-3"
               style={{ borderEndStartRadius: "25px" }}
             >
               Post New Job
             </h2>
             <div className="card-body mb-5">
               <form action="" onSubmit={handleJobpost}>
                 <div className="mb-3">
                   <label htmlFor="">job Title</label>
                   <input
                     name=""
                     placeholder="Job Title"
                     className="form-control"
                     type="text"
                     value={title}
                     onChange={(e) => settitle(e.target.value)}
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="">Category</label>
                   <select
                     id="category"
                     className="form-select"
                     value={catagory}
                     onChange={(e) => setcatagory(e.target.value)}
                   >
                     <option value="">Select Category</option>
                     {selectCategory.map((item, index) => (
                       <option key={index} value={item.name}>
                         {item.name}
                       </option>
                     ))}
                   </select>
                 </div>
                 <div className="mb-3">
                   <label htmlFor="">Country</label>
                   <input
                     type="text"
                     value={country}
                     onChange={(e) => setcountry(e.target.value)}
                     placeholder="Country"
                     className="form-control"
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="">city</label>
                   <input
                     type="text"
                     value={city}
                     onChange={(e) => setcity(e.target.value)}
                     placeholder="City"
                     className="form-control"
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="">Location</label>
                   <input
                     type="text"
                     value={location}
                     onChange={(e) => setlocation(e.target.value)}
                     placeholder="Location"
                     className="form-control"
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="">Salary</label>
                   <select
                     className="form-control"
                     value={salaryType}
                     onChange={(e) => setsalaryType(e.target.value)}
                   >
                     <option value="default">Select Salary Type</option>
                     <option value="Fixed Salary">Fixed Salary</option>
                     <option value="Ranged Salary">Ranged Salary</option>
                   </select>
                   <div>
                     {salaryType === "default" ? (
                       <p>please provide Salary Type *</p>
                     ) : salaryType === "Fixed Salary" ? (
                       <input
                         type="number"
                         className="form-control"
                         placeholder="Enter Fixed Salary"
                         value={fixedSalary}
                         onChange={(e) => setfixedSalary(e.target.value)}
                       />
                     ) : (
                       <div className="mb-3">
                         <input
                           type="number"
                           placeholder="Salary From"
                           value={salaryFrom}
                           onChange={(e) => setsalaryFrom(e.target.value)}
                         />
                         <br />
                         <input
                           type="number"
                           placeholder="Salary To"
                           value={salaryTo}
                           onChange={(e) => setsalaryTo(e.target.value)}
                         />
                       </div>
                     )}
                   </div>
                 </div>
                 <div className="mb-3">
                   <label htmlFor="">description</label>
                   <textarea
                     className="form-control"
                     value={description}
                     onChange={(e) => setdescription(e.target.value)}
                     placeholder="Job Description"
                   />
                 </div>

                 <center>
                   <button type="submit" className="btn btn-success">
                     Create Job
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

export default Jobpost