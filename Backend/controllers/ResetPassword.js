const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// resetPassword Token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email form request body
    const { email } = req.body;

    // check user for this eamil, email validation
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "not registered email" });
    }
    // generate token
    const token = crypto.randomUUID();
    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    // create url
    const url = `http://localhost:3000/update-password/${token}`;
    // send mail containing url
    await mailSender(
      email,
      "Password reset link",
      `password reset link: ${url}`
    );
    // return response
    return res
      .status(201)
      .json({ success: true, message: "Email sent successfully check mail" });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong while reset password",
    });
  }
};

// reset Password

exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { password, confirmPassword, token } = req.body;
    // validation
    if (password !== confirmPassword) {
      return res.json({ success: false, message: "password not matching" });
    }
    // get userdetails from db using token
    const userDetails = await user.findOne({ token });
    // if no entry - invalid token
    if (userDetails) {
      return res.json({ success: false, message: "Token invalid" });
    }
    // token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({ success: false, message: "Token expired" });
    }
    // has password once changed before updating in db
    const hashedPassword = await bcrypt.hash(password, 10);

    // password update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );
    // return response

    return res.json({ success: true, message: "password reset successful" });
  } catch (e) {
    return res.json({ success: false, message: "try again resetting" });
  }
};
