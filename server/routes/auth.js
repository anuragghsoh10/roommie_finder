const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(
 process.env.TWILIO_ACCOUNT_SID,
 process.env.TWILIO_AUTH_TOKEN
);

const otpCooldown = new Map();

router.post("/send-otp", async (req,res)=>{

 const {mobile} = req.body;

 if (!mobile || !/^\d{10}$/.test(mobile)) {
  return res.status(400).json({message: "Enter a valid 10-digit mobile number."});
 }

 const now = Date.now();
 const lastRequested = otpCooldown.get(mobile) || 0;
 if (now - lastRequested < 60_000) {
  return res.status(429).json({message: "Please wait at least 60 seconds before requesting another OTP."});
 }

 try{

  await client.verify.v2
   .services(process.env.TWILIO_VERIFY_SERVICE_SID)
   .verifications.create({
    to: `+91${mobile}`,
    channel: "sms"
   });

  otpCooldown.set(mobile, now);
  res.json({message:"OTP sent to phone"});

 }

 catch(error){

  console.error("send-otp error:", error);
  let message = error.message || "Failed to send OTP.";
  let status = error.status || 500;

  if (error.code === 21608) {
   message = "Twilio trial accounts can only send SMS to verified phone numbers. Verify this number in your Twilio console or upgrade your account.";
   status = 403;
  } else if (error.code === 20429) {
   message = "Too many OTP requests. Please wait a minute and try again.";
   status = 429;
  }

  res.status(status).json({message});

 }

});

router.post("/verify-otp", async (req,res)=>{

 const {mobile,otp} = req.body;

 if (!mobile || !/^\d{10}$/.test(mobile) || !/^[0-9]{4,8}$/.test(otp)) {
  return res.status(400).json({message: "Mobile number and valid OTP are required."});
 }

 try{

  const verification = await client.verify.v2
   .services(process.env.TWILIO_VERIFY_SERVICE_SID)
   .verificationChecks.create({
    to: `+91${mobile}`,
    code: otp
   });

  if(verification.status === "approved"){

   const token = jwt.sign({mobile}, process.env.JWT_SECRET || "secret123", {expiresIn:"1d"});

   res.json({token});

  }
  else{

   res.status(400).json({message:"Invalid OTP"});

  }

 }

 catch(error){

  console.error("verify-otp error:", error);
  res.status(500).json({message: error.message || "Failed to verify OTP."});

 }

});

module.exports=router;
