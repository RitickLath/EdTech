const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
    expires: 5 * 60,
  },
  otp: {
    type: Number,
    required: true,
  },
});

// we have to send mail to user before saving the otp in db
// As there might be a chance that the otp can't be send
// due to some technical glitch

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, title, otp);
    console.log("Email sent successfully : " + mailResponse);
  } catch (e) {
    console.log("Error Occured on sending email");
    throw error;
  }
}

otpSchema.pre("save", async (next) => {
  await sendVerificationEmail(this.mail, this.otp);
  next();
});

module.exports = mongoose.Schema("Otp", otpSchema);
