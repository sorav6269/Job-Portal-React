import React, { useContext, useState } from 'react'
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
    const [salaryFrom, setsalaryFrom] = useState("")
    const [salaryTo, setsalaryTo] = useState("")
    const [fixedSalary, setfixedSalary] = useState("")
    const [salaryType, setsalaryType] = useState("default")
    const { isAuthorized, user } = useContext(Context)
    
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
        navigateTo("/getalljobs");
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
                     name=""
                     className="form-control"
                     value={catagory}
                     onChange={(e) => setcatagory(e.target.value)}
                   >
                     <option value="">Select Category</option>
                     <option value="Graphics & Design">
                       Graphics & Design
                     </option>
                     <option value="Mobile App Development">
                       Mobile App Development
                     </option>
                     <option value="Frontend Web Development">
                       Frontend Web Development
                     </option>
                     <option value="MERN Stack Development">
                       MERN STACK Development
                     </option>
                     <option value="Account & Finance">
                       Account & Finance
                     </option>
                     <option value="Artificial Intelligence">
                       Artificial Intelligence
                     </option>
                     <option value="Video Animation">Video Animation</option>
                     <option value="MEAN Stack Development">
                       MEAN STACK Development
                     </option>
                     <option value="MEVN Stack Development">
                       MEVN STACK Development
                     </option>
                     <option value="Data Entry Operator">
                       Data Entry Operator
                     </option>
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