const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorisation").replace("Bearer ");

    // if token missing return response
    if (!token) {
      return res.status(401).json({ success: false, message: "token missing" });
    }
    // verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (e) {
      console.error(e);
      return res.status(401).json({ success: false, message: "token invalid" });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while validating",
    });
  }
};
// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for student only",
      });
    }
    next();
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "User role cannot be verified" });
  }
};
// isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for instructor only",
      });
    }
    next();
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "User role cannot be verified" });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin only",
      });
    }
    next();
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "User role cannot be verified" });
  }
};
