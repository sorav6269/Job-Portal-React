const mongoose = require('mongoose')
const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your detail"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please enter Cover letter"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    address: {
      type: String,
      required: [true, "Please enter your Address"],
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    applicantID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["job Seeker"],
        required: true,
      },
    },
    employerID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Employer"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

const applicationModel = mongoose.model('application',ApplicationSchema)
module.exports = applicationModel
