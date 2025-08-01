import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String, required: true
  },
  createdAt: {type: Date, expires: '5m', default: Date.now}
});

const otp = mongoose.model("otp", otpSchema);

export default otp;
