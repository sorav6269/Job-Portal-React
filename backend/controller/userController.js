const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer") 
const randomstring = require("randomstring");

class userController {
  static Registeruser = async (req, res) => {
    try {
      const { name, email, password, cpassword, phone, role } = req.body;
      const user = await userModel.findOne({ email: email });
      if (user) {
        res
          .status(401)
          .json({ status: "Faild", message: "email already exists" });
      } else {
        if (name && email && password && cpassword && phone && role) {
          if (password === cpassword) {
            const hashPassword = await bcrypt.hash(password, 10);
            const result = new userModel({
              name: name,
              email: email,
              password: hashPassword,
              phone: phone,
              role: role,
            });
            await result.save();
            // generate token
            const token = jwt.sign(
              { userID: result._id, email: result.email },
              "xerkj567sldfgdrfgd4565"
            );
            res.status(201).cookie("token", token).json({
              status: "success",
              message: "Thank You For Registration",
              token: token,
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "Password and Confirm Password do not match",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "All Field Are Required" });
        }
      }
    } catch (error) {
      //    console.log(error)
      res
        .status(500)
        .json({ status: "failed", message: "Internal server error" });
    }
  };
  static login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      if (email && password && role) {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          const ismatched = await bcrypt.compare(password, user.password);
          if (ismatched) {
            if (user.role == role) {
              // Token Generate
              const token = jwt.sign(
                { ID: user._id },
                "xerkj567sldfgdrfgd4565"
              );
              return res.status(201).cookie("token", token).json({
                status: "success",
                message: "Login Ok Report",
                token: token,
                user,
              });
            } else {
              return res.status(401).json({
                status: "failed",
                message: "User with this role is not found",
              });
            }
          } else {
            return res.status(401).json({
              status: "failed",
              message: "Email and Password are not the same",
            });
          }
        } else {
          return res.status(401).json({
            status: "failed",
            message: "You are not a registered user",
          });
        }
      } else {
        return res.status(401).json({
          status: "failed",
          message: "All fields are required",
        });
      }
    } catch (error) {
      console.error(error);
      // Make sure to send a response if an error occurs
      return res.status(500).json({
        status: "error",
        message: "An internal server error occurred",
      });
    }
  };
  static getuser = async (req, res) => {
    try {
      const { id } = req.userdata;
      const data = await userModel.findById(id);

      if (!data) {
        // Sends a 404 response if the user is not found
        return res
          .status(404)
          .json({ status: "Failed", message: "User not found" });
      }

      // Sends a 200 response with the user data
      return res.status(200).json(data); // Added `return` to ensure no further code runs
    } catch (error) {
      console.error(error); // Added logging for better debugging
      // Sends a 400 response in case of an error
      return res.status(400).json({ status: "Failed", message: error.message }); // Added `return` here as well
    }
  };
  static logout = async (req, res) => {
    try {
      res
        .status(201)
        .cookie("token", "", { httpOnly: true, expaires: new Date(Date.now()) })
        .json({ success: true, message: "Logged Out Successfully." });
    } catch (error) {
      // console.log(error)
      res.status(400).json({ status: "failed", message: error.message });
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.userdata; // Extract the user ID from the request
      const { name, email } = req.body; // Extract name and email from the request body

      // Construct the update data object
      const data = {
        name,
        email,
      };
      // Update the user profile in the database
      const updateUserProfile = await userModel.findByIdAndUpdate(id, data, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
      // console.log(data)
      // Send a success response with the updated profile
      res.status(200).json({
        success: true,
        updateUserProfile,
      });
    } catch (error) {
      // Log the error for debugging
      console.error(error);

      // Send an error response
      res.status(500).json({
        success: false,
        message: "Failed to update profile. Please try again later.",
      });
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id } = req.userdata;
      const { password, newpassword, confirmpassword } = req.body;
      if (password && newpassword && confirmpassword) {
        const user = await userModel.findById(id);
        // console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)
        if (!isMatch) {
          return res.status(401).json({
            status: "failed",
            message: "current password is incorrect",
          });
        } else {
          if (newpassword != confirmpassword) {
            return res.status(401).json({
              status: "failed",
              message: "Password does not match",
            });
          } else {
            const newhashpassword = await bcrypt.hash(newpassword, 10);
            await userModel.findByIdAndUpdate(id, {
              password: newhashpassword,
            });
            return res.status(201).json({
              status: "success",
              message: "Password Update Successfully",
            });
          }
        }
      } else {
        return res.status(401).json({
          status: "failed",
          message: "All field are rquired",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to update password. Please try again.",
      });
    }
  };

  static ForgetPasswordVerify = async (req, res) => {
    try {
      const { email } = req.body;
      const userdata = await userModel.findOne({ email });
      // console.log(userdata)

      if (userdata) {
        const randomString = randomstring.generate();
        await userModel.updateOne({ email }, { $set: { token: randomString } });

        await this.sendEmail(userdata.name, userdata.email, randomString);
        res.status(200).json({
          success: true,
          message: "Please check your email to reset your password.",
        });
      } else {
        // Respond with an error
        res.status(400).json({
          success: false,
          message: "You are not a registered email.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again later.",
      });
    }
  };

  static sendEmail = async (name, email, token) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "soravrathor786@gmail.com",
        pass: "ujxfdqoozbsjmlqr",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:5173/reset_password?token=' +
        token +
        '">Reset</a>Your Password.',
    });
  };

  static reset_password = async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await userModel.findOne({ token: token });
      if (tokenData) {
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, 10);
        const userData = await userModel.findByIdAndUpdate(
          { _id: tokenData._id },
          { $set: { password: hashPassword, token: "" } },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "User Password Has been Updated Successfully",
          data: userData,
        });
      } else {
        res
          .status(400)
          .send({ success: true, message: "This Link Has been Expired" });
      }
    } catch (error) {
      res.status(400).send({ success: true, message: error.message });
    }
  };
};



module.exports = userController;
 