const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  catagory: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  fixedSalary: {
    type: Number,
    require: true,
  },
  salaryFrom: {
    type: Number,
    require: true,
  },
  salaryTo: {
    type: Number,
    require: true,
  },
  expaired: {
    type: Boolean,
    require: false,
  },
  jobPostOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: String,
    require: true
  },
});

const jobModel = mongoose.model('job',jobSchema)
module.exports = jobModel