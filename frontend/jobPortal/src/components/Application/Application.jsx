import { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // Make sure to import axios if not already

const Application = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [coverLetter, setcoverletter] = useState("");
  const [phone, setphone] = useState("");
  const [resume, setresume] = useState("");
  const [address, setaddress] = useState("");
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams()

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setresume(resume);
  };
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id); // Replace 'id_value' with actual job ID

    try {
      const { data } = await axios.post(
        `/jobportalApi/postApplication`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setname("");
      setemail("");
      setcoverletter("");
      setphone("");
      setaddress("");
      setresume("");
      toast.success(data.message);
      // navigateTo("/Job/getall");
      // console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div
        className="card p-4 shadow h-60 w-50 mt-5"
        style={{
          backgroundColor: "rgb(34 31 32 / 18%)",
          borderRadius: "10px",
       
        }}
      >
        <div className="text-center mb-3">
          <h2>Application Form</h2>
        </div>
        <form onSubmit={handleApplication}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
   
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
     
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={coverLetter}
              onChange={(e) => setcoverletter(e.target.value)}
              placeholder="Cover Letter"
              rows="4"
          
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              placeholder="Phone Number"
           
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Address"
              rows="3"
             
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              accept=".pdf, .png, .jpg, .jpeg"
              className="form-control"
              onChange={handleFileChange}
              required  
            />
            {resume && (
              <div className="mt-2 text-muted">
                <strong>File Selected</strong> {resume.name}
              </div>
)}

          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
              style={{ borderRadius: "5px" }}
            >
              Send Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
