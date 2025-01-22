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
            : "/jobportalApi/jobseeker/GetAll";

        const { data } = await axios.get(endpoint, { withCredentials: true });
        setApplications(data.applications || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch applications"
        );
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
    <section className="my_applications page py-5">
      <div className="container">
        <h1 className="text-3xl mb-4 text-center">
          {user?.role === "job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        {applications.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <h4>No Applications Found</h4>
          </div>
        ) : (
          <div className="row justify-content-center">
            {applications.map((element) => (
              <div
                className="col-lg-6 col-md-12 mb-4 d-flex justify-content-center"
                key={element._id}
              >
                {user?.role === "job Seeker" ? (
                  <JobSeekerCard
                    element={element}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                ) : (
                  <EmployerCard element={element} openModal={openModal} />
                )}
              </div>
            ))}
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </div>
    </section>
  );
}

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="card shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center">
    <div className="mb-3 w-100">
      <p className="mb-2">
        <strong>Name:</strong> {element.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {element.email}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {element.phone}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {element.address}
      </p>
      <p>
        <strong>Cover Letter:</strong> {element.coverLetter}
      </p>
    </div>
    <div className="text-center mb-3">
      <img
        src={element.resume.url}
        alt="Resume"
        className="img-fluid rounded shadow"
        style={{ maxHeight: "200px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => openModal(element.resume.url)}
      />
    </div>
    <button
      className="btn btn-danger w-100"
      onClick={() => deleteApplication(element._id)}
    >
      Delete Application
    </button>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="card shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center">
    <div className="mb-3 w-100">
      <p className="mb-2">
        <strong>Name:</strong> {element.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {element.email}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {element.phone}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {element.address}
      </p>
      <p>
        <strong>Cover Letter:</strong> {element.coverLetter}
      </p>
    </div>
    <div className="text-center">
      <img
        src={element.resume.url}
        alt="Resume"
        className="img-fluid rounded shadow"
        style={{ maxHeight: "200px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);

export default Myapplication;
 