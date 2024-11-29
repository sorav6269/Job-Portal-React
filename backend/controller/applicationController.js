const jobModel = require("../models/job");
const { application } = require("express");
const applicationModel = require("../models/application");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

class applicationController {
  static postApplication = async (req, res) => {
    try {
      const { role } = req.userdata;

      if (role === "Employer") {
        return res.status(400).json({
          status: "failed",
          message: "Employer not allowed to access this resource",
        });
      }

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          status: "failed",
          message: "Resume file is required.",
        });
      }

      const { resume } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(resume.mimetype)) {
        return res.status(400).json({
          status: "failed",
          message:
            "Invalid file type. Please upload a png, jpeg, or webp file.",
        });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error("Failed to upload to Cloudinary");
      }

      const { name, email, coverLetter, phone, address, Id } = req.body;
      const applicantID = {
        user: req.userdata._id,
        role: "JobSeeker",
      };


      if (!Id) {
        return res.status(400).json({
          status: "failed",
          message: "job Not found.",
        });
      }

      

      const jobDetails = await jobModel.findById(Id);
      if (!jobDetails) {
        return res.status(404).json({
          status: "failed",
          message: "Job not found.",
        });
      }

      if (!name || !email || !coverLetter || !phone || !address) {
        return res.status(400).json({
          status: "failed",
          message: "Please fill all fields.",
        });
      }

      const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
      };

      if (!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return res.status(400).json({
          status: "failed",
          message: "Please fill all fields.",
        });
      }

      
      const application = await applicationModel.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID: { user: req.userdata._id, role: "JobSeeker" },
        employerID: { user: jobDetails.postedBy, role: "Employer" },
        Id,
        resume: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });

      res.status(200).json({
        success: true,
        message: "Application submitted!",
        application,
      });
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({
        status: "failed",
        message: "An error occurred while processing the application.",
        error: error.message,
      });
    }
  };

  static employerGetAllApplications = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "job Seeker") {
        res.status(400).json({
          status: "failed",
          message: "Job Seeker not alowed to access this resource..",
        });
      }
      const { _id } = req.userdata;
      const applications = await applicationMdel.find({
        "employerID.user": _id,
      });
      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static jobseekerGetAllApplications = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "Employer") {
        res.status(200).json({
          success: "failed",
          message: "Employer not alowed to access this resource..",
        });
      }
      const { _id } = req.userdata;
      const applications = await applicationMdel.find({
        "application.user": _id,
      });
      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static jobseekerDeleteApplication = async (req, rea) => {
    try {
      const { role } = req.userdata;
      if (role === "Employer") {
        res.status(400).json({
          status: "failed",
          message: "Employer not alowed to access this resource..",
        });
      }
      const { id } = req.params;
      const application = await applicationMdel.findById(id);
      if (!application) {
        res.status(400).json({
          status: false,
          message: "Application not found!",
        });
      }
      await applicationMdel.deleteOne();
      res.status(200).json({
        success: true,
        message: "Application Deleted",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = applicationController;
