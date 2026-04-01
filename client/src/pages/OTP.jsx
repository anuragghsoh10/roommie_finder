import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTP(){

 const [otp,setOtp] = useState("");
 const navigate = useNavigate();
 const mobile = localStorage.getItem("mobile");

 const [errorMsg, setErrorMsg] = useState("");

 const verify = async () => {

  try {
   setErrorMsg("");
   const res = await axios.post(
    ((process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/auth/verify-otp"),
    {mobile,otp}
   );

   localStorage.setItem("token",res.data.token);

   navigate("/dashboard");
  } catch (error) {
   setErrorMsg(error.response?.data?.message || "Invalid OTP or Verification Failed.");
  }
 };

 return(

  <div className="container-fluid vh-100 animate-fade-in d-flex justify-content-center align-items-center" style={{background: "radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)"}}>

   <div className="card glass-panel p-5 animate-slide-up delay-100" style={{width:"400px", maxWidth:"90%"}}>

    <div className="text-center mb-5">
      <div className="bg-primary rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{width: "60px", height: "60px", background: "var(--brand-gradient)"}}>
        <i className="bi bi-shield-lock-fill fs-2 text-white"></i>
      </div>
      <h3 className="text-gradient fw-bold mb-2">Verification</h3>
      <p className="text-secondary small">Enter the OTP sent to your mobile</p>
    </div>

    <div className="mb-4 text-center">
      {errorMsg && <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>}
      <input
       className="form-control text-center fs-3 letter-spacing-lg mb-3"
       placeholder="• • • • • •"
       value={otp}
       onChange={(e)=>setOtp(e.target.value)}
       maxLength={6}
       style={{letterSpacing: "10px"}}
      />
    </div>

    <button
     className="btn btn-primary w-100 py-3 fw-bold fs-5"
     onClick={verify}
    >
     Verify OTP <i className="bi bi-check2-circle ms-2"></i>
    </button>
    
    <div className="text-center mt-4">
      <button className="btn btn-link text-secondary text-decoration-none small p-0" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left me-1"></i> Back to login
      </button>
    </div>

   </div>

  </div>

 );

}

export default OTP;