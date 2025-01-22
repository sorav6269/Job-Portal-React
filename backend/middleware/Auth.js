const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const checkAuth = async (req, res, next) => {
  // Check if the token exists in cookies
  const { token } = req.cookies;

  if (!token) {
    // Return to stop further execution if token is not found
    return res
      .status(401)
      .json({ status: "failed", message: "Unauthorized Login" });
  }

  try {
    // Verify the token and extract user data
    const verifyToken = jwt.verify(token, "xerkj567sldfgdrfgd4565");
    const data = await userModel.findOne({ _id: verifyToken.ID });

    if (!data) {
      // Return if user is not found in the database
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Attach the user data to the request object for later use
    req.userdata = data;
  } catch (error) {
    console.error(error);
    // Return if token verification fails or other errors occur
    return res
       .status(401)
      .json({ status: "failed", message: "Invalid or expired token" });
  }

  // Move to the next middleware if everything is okay
  next();
};

module.exports = checkAuth;
