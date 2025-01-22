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
        res.status(400).json({
          status: "failed",
          message: "Employer not allowed to access this resource",
        });
      }
      if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
          status: "failed",
          message: "Resume file Required.",
        });
      }
      const { resume } = req.files;
      const allowedFormats = [
        "image/png",
        "application/pdf",
        "image/jpeg",
        "image/webp",
      ];
      if (!allowedFormats.includes(resume.mimetype)) {
        res.status(400).json({
          status: "failed",
          message: "Invalid file type.Please upload a png file.",
        });
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
      );
      //       console.log(cloudinaryResponse)

      if (!cloudinaryResponse || cloudinaryResponse.err) {
        console.err(
          "cloudinary Error:",
          cloudinaryResponse.err || "unknown cloudinary err"
        );

        res.status(400).json({
          status: "failed",
          message: "failed to upload Resume to Cloudinary",
        });
      }
      const { name, email, coverLetter, phone, address, jobId } = req.body;
      const applicantID = {
        user: req.userdata._id,
        role: "job Seeker",
      };
      if (!jobId) {
        res.status(400).json({
          status: "failed",
          message: "Job not found",
        });
      }
      const jobDetails = await jobModel.findById(jobId);
      if (!jobDetails) {
        res.status(400).json({
          status: "failed",
          message: "Job not found",
        });
      }
      const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
      };
      if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
      ) {
        res.status(400).json({
          status: "failed",
          message: "please fill all fields",
        });
      }
      const application = await applicationModel.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
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
    } catch (err) {
      console.log(err);
    }
  };

  static employerGetAllApplications = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "job Seeker ") {
        res.status(400).json({
          status: "failed",
          message: "Job Seeker not alowed to access this resource..",
        });
      }
      const { _id } = req.userdata;
      const applications = await applicationModel.find({
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
      const applications = await applicationModel.find({
        "applicantID.user": _id,
      });
      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static jobseekerDeleteApplication = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "Employer") {
        res.status(400).json({
          status: "failed",
          message: "Employer not alowed to access this resource..",
        });
      }
      const { id } = req.params;
      const applications = await applicationModel.findById(id);
      if (!applications) {
        res.status(400).json({
          status: false,
          message: "Application not found!",
        });
      }
      await applicationModel.deleteOne();
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
