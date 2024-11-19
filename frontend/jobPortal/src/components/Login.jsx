import { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/jobportalApi/login", {
        email,
        password,
        role,
      });
      //console.log(data);
      toast.success(data.message);
      // console.log(data)
      setemail("");
      setpassword("");
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
      <div className="container-fluid ">
        <div className="col-md-4 mx-auto mt-5">
          <div
            className="card shadow-lg  cardhover "
            style={{ borderRadius: "25px" }}
          >
            <h2
              className="text-center bg-info pt-3 pb-3"
              style={{ borderEndStartRadius: "25px" }}
            >
              Login Form
            </h2>
            <div className="card-body mb-5">
              <form action="">
                <div className="mb-3">
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
                <div className="mb-3">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Login As</label>
                  <select
                    name="role"
                    className="form-control"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  >
                    <option>Select User</option>
                    <option value="job Seeker">jobSeeker</option>
                    <option value="Employer">Employer</option>
                  </select>
                </div>

                <button
                  className="btn btn-danger mt-1 "  
                  style={{ marginLeft: "100px", backgroundColor: "brown" }}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <a
                  href="/Register"
                  style={{
                    color: "blue",
                    marginLeft: "20px",
                    fontSize: "20px",
                  }}
                >
                  Register Here{""}
                </a>
              </form>
            </div>
            {/* <!--card-body--> */}
          </div>
          {/* <!--card end--> */}
        </div>
      </div>
    </>
  );
};

export default Login;
