import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile(){

 const [form,setForm] = useState({});
 const navigate = useNavigate();

 const handleChange = (e) => {

  setForm({
   ...form,
   [e.target.name]:e.target.value
  });

 };

 const submit = async () => {

  const mobile = localStorage.getItem("mobile");

  const data = {
   ...form,
   mobile
  };

  await axios.post(
   ((process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/user/create-profile"),
   data
  );

  alert("Profile Created Successfully!");
  navigate("/dashboard");

 };

 return(

  <div className="container-fluid min-vh-100 py-5 animate-fade-in" style={{background: "var(--bg-primary)"}}>
   
   <div className="container" style={{maxWidth: "800px"}}>
    
    <button className="btn btn-link text-secondary text-decoration-none mb-4 p-0 fw-bold" onClick={() => navigate("/dashboard")}>
      <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
    </button>

    <div className="card glass-panel p-5 animate-slide-up">
    
     <div className="mb-5 border-bottom border-secondary pb-4" style={{borderColor: "rgba(255,255,255,0.1) !important"}}>
       <h2 className="text-gradient fw-bold mb-2">Build Your Profile</h2>
       <p className="text-secondary mb-0">Tell us about yourself so we can find your best match.</p>
     </div>

     <div className="row g-4">

      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Full Name</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white"><i className="bi bi-person"></i></span>
          <input name="name" className="form-control border-start-0 ps-0" placeholder="e.g. Alex Johnson" onChange={handleChange}/>
        </div>
      </div>
      
      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Age & Gender</label>
        <div className="d-flex gap-2">
          <input name="age" className="form-control" placeholder="Age" onChange={handleChange} style={{flex: "1"}}/>
          <input name="gender" className="form-control" placeholder="Gender" onChange={handleChange} style={{flex: "2"}}/>
        </div>
      </div>
      
      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Occupation</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white"><i className="bi bi-briefcase"></i></span>
          <input name="occupation" className="form-control border-start-0 ps-0" placeholder="Student / Professional" onChange={handleChange}/>
        </div>
      </div>
      
      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Institution / Company</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white"><i className="bi bi-building"></i></span>
          <input name="college_company" className="form-control border-start-0 ps-0" placeholder="Where do you work/study?" onChange={handleChange}/>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Region & Language</label>
        <div className="d-flex gap-2">
          <input name="region" className="form-control" placeholder="Region" onChange={handleChange} style={{flex: "1"}}/>
          <input name="mother_tongue" className="form-control" placeholder="Language" onChange={handleChange} style={{flex: "1"}}/>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Budget (per month)</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white"><i className="bi bi-currency-dollar"></i></span>
          <input name="budget" className="form-control border-start-0 ps-0" placeholder="e.g. $500 - $800" onChange={handleChange}/>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Preferred Location</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white"><i className="bi bi-geo-alt"></i></span>
          <input name="preferred_location" className="form-control border-start-0 ps-0" placeholder="City or Neighborhood" onChange={handleChange}/>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label text-secondary small fw-bold text-uppercase">Stay Duration</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-white"><i className="bi bi-calendar-check"></i></span>
          <input name="stay_duration" className="form-control border-start-0 ps-0" placeholder="e.g. 6 Months, 1 Year" onChange={handleChange}/>
        </div>
      </div>

     </div>

     <div className="mt-5 text-end border-top border-secondary pt-4" style={{borderColor: "rgba(255,255,255,0.1) !important"}}>
      <button
       className="btn btn-primary px-5 py-3 fw-bold rounded-pill"
       onClick={submit}
      >
       Save Profile <i className="bi bi-check2-circle ms-2"></i>
      </button>
     </div>

    </div>

   </div>

  </div>

 );

}

export default CreateProfile;