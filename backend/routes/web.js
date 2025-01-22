const express = require("express");
const userController = require("../controller/userController");
const checkAuth = require("../middleware/Auth");
const jobController = require("../controller/jobController");
const applicationController = require("../controller/applicationController");
const categorycontroller = require("../controller/categoryController");
const route = express.Router();

// user
route.get("/getuser",checkAuth,userController.getuser);
route.post("/Registeruser",userController.Registeruser); 
route.post("/login",userController.login);
route.get("/logout", userController.logout);
route.post("/updatep", checkAuth, userController.updateProfile);
route.post("/changePassword", checkAuth, userController.changePassword);
route.post("/ForgetPasswordVerify",userController.ForgetPasswordVerify);
route.post("/reset_password", userController.reset_password);



// job
route.get("/getalljobs",checkAuth, jobController.getalljobs);
route.post("/postjob", checkAuth, jobController.postjob);
route.get("/getMyJob", checkAuth, jobController.getMyJob);
route.post("/updateJob/:id", checkAuth, jobController.updateJob);
route.get("/deleteJob/:id", checkAuth, jobController.deleteJob);
route.get("/Jobdetails/:id", checkAuth, jobController.getSingleJob);


// Application
route.post("/postApplication",checkAuth,applicationController.postApplication);
route.get("/employer/GetAll",checkAuth,applicationController.employerGetAllApplications);
route.get("/jobseeker/GetAll",checkAuth,applicationController.jobseekerGetAllApplications);
route.get("/jobSeekerDelete/:id",checkAuth,applicationController.jobseekerDeleteApplication);

// Category
route.post('/categoryinsert', categorycontroller.categoryInsert)
route.get("/categoryDisplay", categorycontroller.categoryDisplay);
route.get("/categoryDelete/:id", categorycontroller.categoryDelete);
route.get("/CategoryList/:name", categorycontroller.CategoryList);
module.exports = route;
