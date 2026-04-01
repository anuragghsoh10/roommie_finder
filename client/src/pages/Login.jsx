import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

 const [mobile,setMobile] = useState("");
 const [errorMsg,setErrorMsg] = useState("");
 const navigate = useNavigate();

 const sendOTP = async () => {

  try {
   setErrorMsg("");
   await axios.post(
    ((process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/auth/send-otp"),
    {mobile}
   );

   localStorage.setItem("mobile",mobile);

   navigate("/otp");
  } catch (error) {
   setErrorMsg(error.response?.data?.message || "Failed to send OTP. Please check the number.");
  }
 };

 return(

  <div className="container-fluid vh-100 animate-fade-in">

   <div className="row h-100">

    <div className="col-md-6 d-flex align-items-center justify-content-center bg-transparent d-none d-md-flex">
      <img
       src="/logo.png"
       style={{width:"60%", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))", animation: "slideUp 1s ease-out"}}
       alt="roommates"
      />
    </div>


    <div className="col-md-6 d-flex align-items-center justify-content-center">

     <div className="card glass-panel p-5 animate-slide-up delay-100" style={{width:"400px", maxWidth:"90%"}}>

      <div className="text-center mb-5">
        <h2 className="text-gradient fw-bold mb-2">Roommate Finder</h2>
        <p className="text-secondary">Find your perfect living companion</p>
      </div>

      <div className="mb-4">
        {errorMsg && <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>}
        <label className="form-label text-secondary small text-uppercase fw-bold tracking-wide mb-2">Mobile Number</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white border-secondary" style={{borderColor: "rgba(255,255,255,0.1) !important"}}>
            <i className="bi bi-phone"></i>
          </span>
          <input
           className="form-control border-start-0 ps-0"
           placeholder="Enter mobile number"
           value={mobile}
           onChange={(e)=>setMobile(e.target.value)}
          />
        </div>
      </div>

      <button
       className="btn btn-primary w-100 mt-2 py-3 fw-bold fs-5"
       onClick={sendOTP}
      >
       Get OTP <i className="bi bi-arrow-right ms-2"></i>
      </button>

     </div>

    </div>

   </div>

  </div>

 );

}

export default Login;