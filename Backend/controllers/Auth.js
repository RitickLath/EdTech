const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

require("dotenv").config();
// Send OTP for sign-up
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    // If user already exists, send a 401 response
    if (userExists) {
      return res
        .status(401)
        .json({ success: false, message: "User already registered" });
    }

    // Generate a 6-digit OTP without alphabets or special characters
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP Generated:", otp);

    // Create an OTP payload to save in the database
    const otpPayload = { email, otp };

    // Save the OTP entry in the database
    // A pre-save hook will handle sending the OTP via email
    await OTP.create(otpPayload);

    // Respond with a success message
    return res.status(200).json({ success: true, message: "OTP Sent" });
  } catch (error) {
    console.error(error);
    // If an error occurs, send a 500 response with the error message
    return res.status(500).json({ success: false, message: error.message });
  }
};

// sign-up

exports.signup = async (req, res) => {
  try {
    // Extract data from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber ||
      !otp
    ) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Find the most recent OTP stored for the user
    const recentOtpRecord = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // Validate OTP
    if (recentOtpRecord.length === 0) {
      return res.status(400).json({ success: false, message: "OTP not found" });
    }
    const recentOtp = recentOtpRecord[0].otp;
    if (otp !== recentOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create profile details entry in the database
    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      phoneNumber: null,
    });

    // Create user entry in the database
    const user = await User.create({
      firstName,
      lastName,
      contactNumber,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // Respond with success message and user details
    return res
      .status(200)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    // If an error occurs, send a 500 response with an error message
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

// sign-in

exports.login = async (req, res) => {
  try {
    // get data from req body
    const { email, password } = req.body;
    // validtae data
    if (!email || !password) {
      res
        .status(403)
        .json({ success: false, message: "Please fill all details" });
    }
    // find user exists
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res
        .status()
        .json({ success: false, message: "Email not registered" });
    }
    // match password
    if (await bcrypt.compare(password, user.password)) {
      // generate JWT token
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      // create cookie and send request
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
        httpOnly: true,
      };
      return res
        .cookie("token", token, options)
        .status(200)
        .json({ success: true, user, token, message: "Logged In" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: "Login failed please try again" });
  }
};

// change password
exports.changePassword = async (req, res) => {
  // get data from req. body
  // get old password, newPasswword, confirmPassword
  // validation
  // update passowrd in database
  // send mail password updated
  // return response
};
