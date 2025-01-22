import{ useContext, useState } from 'react'
import { Context } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


const Register =() => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")
  const [cpassword, setconfirmpassword] = useState("");
  
  const [role, setrole] = useState("")

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context)
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/jobportalApi/Registeruser", {
        name,
        phone,
        email,
        role,
        password,
        cpassword,
      });
      toast.success(data.message);
      setname("");
      setemail("");
      setpassword("");
      setconfirmpassword("");
      setphone("");
      setrole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
   return (
     <>
          <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url(./img/login.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >

       <div className="col-md-4 mx-auto mt-2">
         <div className="card shadow-lg  " style={{ borderRadius: "25px" }}>
           <h2
             className="text-center bg-info pt-2 pb-2 "
             style={{ borderRadius: "23px"}}
           >
             Register
           </h2>
           <div className="card-body mb-5">
             <form action="">
               <div className="mb-2">
                 <label htmlFor="">Name</label>
                 <input
                   type="name"
                   name="name"
                   placeholder="Enter Your Name"
                   className="form-control"
                   value={name}
                   onChange={(e) => setname(e.target.value)}
                 />
               </div>
               <div className="mb-2">
                 <label htmlFor="">Email</label>
                 <input
                   type="email"
                   name="email"
                   placeholder="Enter Your Email"
                   className="form-control"
                   value={email}
                   onChange={(e) => setemail(e.target.value)}
                 />
               </div>
               <div className="mb-2">
                 <label htmlFor="">Password</label>
                 <input
                   type="password"
                   name="password"
                   placeholder="Enter Password"
                   className="form-control"
                   value={password}
                   onChange={(e) => setpassword(e.target.value)}
                 />

                 <div className="mb-2 mt-2">
                   <label htmlFor="">Confirm Password</label>
                   <input
                     type="password"
                     name="cpassword"
                     placeholder="Enter Confirm Password"
                     className="form-control"
                     value={cpassword}
                     onChange={(e) => setconfirmpassword(e.target.value)}
                   />
                 </div>
               </div>
               <div className="mb-2">
                 <label htmlFor="">Phone</label>
                 <input
                   type="number"
                   name="phone"
                   placeholder="Enter Your Phone No."
                   className="form-control"
                   value={phone}
                   onChange={(e) => setphone(e.target.value)}
                 />
               </div>
               <div className="mb-2">
                 <label htmlFor="">Register As</label>
                 <select
                   name="role"
                   className="form-control"
                   value={role}
                   onChange={(e) => setrole(e.target.value)}
                 >
                   <option >Select User</option>
                   <option value="job Seeker">job Seeker</option>
                   <option value="Employer">Employer</option>
                 </select>
               </div>

               <button className="btn btn-danger mb-2" onClick={handleRegister}>
                 Register
               </button>
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

export default Register