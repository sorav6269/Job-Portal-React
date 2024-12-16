import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./Resumemodel"; // Ensure this is properly defined

function Myapplication() {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/application/me");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Employer"
            ? "/jobportalApi/employer/GetAll"
            : "/jobportalApi//jobseeker/GetAll";

        const { data } = await axios.get(endpoint, { withCredentials: true });
        // console.log(data.applications)
        setApplications(data.applications || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      }
    };

    fetchApplications();
  }, [isAuthorized, navigateTo, user]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.get(`/jobportalApi/jobSeekerDelete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message || "Application Delete Successfully");
      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user?.role === "job Seeker" ? (
        <div className="container">
          <h1 className="text-3xl">My Applications</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="text-3xl">Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
}

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card ">
    <div className="detail card">
      <p className="text-2xl">
        <span>Name:</span> {element.name}
      </p>
      <p>
        <span>Email:</span> {element.email}
      </p>
      <p>
        <span>Phone:</span> {element.phone}
      </p>
      <p>
        <span>Address:</span> {element.address}
      </p>
      <p>
        <span>Cover Letter:</span> {element.coverLetter}
      </p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="Resume"
        onClick={() => openModal(element.resume.url)}
      />
      
    </div>
    <div >
      <button className="btn btn-danger" onClick={() => deleteApplication(element._id)}>Delete Application</button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p>
        <span>Name:</span> {element.name}
      </p>
      <p>
        <span>Email:</span> {element.email}
      </p>
      <p>
        <span>Phone:</span> {element.phone}
      </p>
      <p>
        <span>Address:</span> {element.address}
      </p>
      <p>
        <span>Cover Letter:</span> {element.coverLetter}
      </p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="Resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);

export default Myapplication;