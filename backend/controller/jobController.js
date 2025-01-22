const jobModel = require("../models/job");
class jobController {
  static getalljobs = async (req, res) => {
    try {
      const jobs = await jobModel.find();
      res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getMyJob = async (req, res) => {
    try {
      const { role, _id, name } = req.UserData; // use req.UserData consistently
      if (role === "job Seeker") {
        return res.status(400).json({
          status: "failed",
          message: "You are not authorized to access this data",
        });
      }

      // Fetch query parameters for sorting
      const sortBy = req.query.sortBy || "createdAt"; // Default sorting by createdAt
      const order = req.query.order === "desc" ? -1 : 1; // Default is ascending order (1), descending (-1)

      // Fetch jobs where the employer's ID matches the user's ID and apply sorting
      const jobs = await jobModel
        .find({ postedBy: _id })
        .sort({ [sortBy]: order });

      if (!jobs.length) {
        return res.status(404).json({
          status: "failed",
          message: "No jobs found for this employer.",
        });
      }

      return res.status(200).json({
        status: "success",
        message: ` Jobs Posted by ${name}`,
        jobs,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };

  static postjob = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "job Seeker") {
        res.status(400).json({
          status: "failed",
          message: "job Seeker not allow to access this resource",
        });
      }

      const {
        title,
        description,
        catagory,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
      } = req.body;
      if (
        !title ||
        !description ||
        !catagory ||
        !country ||
        !city ||
        !location
      ) {
        res.status(400).json({
          status: "failed",
          message: "Please Provide Full Job Details",
        });
      }

      if (salaryFrom && salaryTo && fixedSalary) {
        res.status(400).json({
          status: "failed",
          message: "Cannot Be Enter Fixed And Ranges Salary Together",
        });
      }
      const postedBy = req.userdata._id;
      const jobs = await jobModel.create({
        title,
        description,
        catagory,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
      });
      res
        .status(200)
        .json({ status: "success", message: "job posted successfully", jobs });
    } catch (error) {
      console.log(error);
    }
  };

  static updateJob = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "job Seeker") {
        res.status(400).json({
          status: "failed",
          message: "job Seeker not allow to access this resource",
        });
      }
      const { id } = req.params;
      let jobs = await jobModel.findById(id);
      if (!jobs) {
        res
          .status(400)
          .json({ status: "failed", message: "OOPS! Job Not Found" });
      }
      jobs = await jobModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({ success: true, message: "job Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteJob = async (req, res) => {
    try {
      const { role } = req.userdata;
      if (role === "job Seeker") {
        res.status(400).json({
          status: "failed",
          message: "job Seeker not allow to access this resource",
        });
      }

      const { id } = req.params;
      let jobs = await jobModel.findById(id);
      if (!jobs) {
        res
          .status(400)
          .json({ status: "failed", message: "OOPS! Job Not Found" });
      }

      await jobModel.deleteOne();
      res.status(200).json({ success: true, message: "job Deleted" });
    } catch (error) {
      console.log(error);
    }
  };

  static getSingleJob = async (req, res) => {
    try {
      const { id } = req.params;
      let jobs = await jobModel.findById(id);
      if (!jobs) {
        res
          .status(400)
          .json({ status: "failed", message: "OOPS! Job Not Found" });
      }
      res.status(200).json({ success: true, jobs });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = jobController;
