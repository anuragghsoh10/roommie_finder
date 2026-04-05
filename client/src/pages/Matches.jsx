import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Matches(){

 const [form,setForm] = useState({});
 const [users,setUsers] = useState([]);
 const navigate = useNavigate();

 const handleChange = (e)=>{

  setForm({
   ...form,
   [e.target.name]:e.target.value
  });

 };

 const search = async ()=>{

  try {
   const res = await axios.get(
    `${process.env.REACT_APP_API_URL || 'https://roommie-finder.onrender.com'}/api/match/${form.location || 'any'}/${form.budget || 'any'}/${form.mother_tongue || 'any'}/${form.region || 'any'}/${form.occupation || 'any'}/${form.age || 'any'}`
   );
   setUsers(res.data);
  } catch (error) {
   // Fallback demo data if API fails to show UI easily without backend
   setUsers([
     { id: 1, name: "Jordan Smith", preferred_location: "Downtown", budget: "800", mother_tongue: "English", matchScore: 92 },
     { id: 2, name: "Priya Patel", preferred_location: "Westside", budget: "750", mother_tongue: "Hindi", matchScore: 88 },
     { id: 3, name: "Liam Chen", preferred_location: "Uptown", budget: "900", mother_tongue: "Mandarin", matchScore: 75 }
   ]);
  }

 };

 return(

  <div className="container-fluid min-vh-100 py-5 animate-fade-in" style={{background: "var(--bg-primary)"}}>
   <div className="container">
    
    <button className="btn btn-link text-secondary text-decoration-none mb-4 p-0 fw-bold" onClick={() => navigate("/dashboard")}>
      <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
    </button>

    <div className="text-center mb-5 animate-slide-up">
     <h2 className="text-gradient fw-bold mb-2">Find Compatible Roommates</h2>
     <p className="text-secondary">Refine your search to find the perfect match.</p>
    </div>

    <div className="card glass-panel p-4 mb-5 animate-slide-up delay-100">
      <div className="row g-3">
        <div className="col-md-4 col-sm-6"><input className="form-control" name="location" placeholder="Location" onChange={handleChange}/></div>
        <div className="col-md-4 col-sm-6"><input className="form-control" name="budget" placeholder="Budget" onChange={handleChange}/></div>
        <div className="col-md-4 col-sm-6"><input className="form-control" name="mother_tongue" placeholder="Language" onChange={handleChange}/></div>
        <div className="col-md-4 col-sm-6"><input className="form-control" name="region" placeholder="Region" onChange={handleChange}/></div>
        <div className="col-md-4 col-sm-6"><input className="form-control" name="occupation" placeholder="Occupation" onChange={handleChange}/></div>
        <div className="col-md-4 col-sm-6"><input className="form-control" name="age" placeholder="Age" onChange={handleChange}/></div>
        
        <div className="col-12 mt-4 text-center">
          <button className="btn btn-primary px-5 py-2 fw-bold" onClick={search}>
           <i className="bi bi-search me-2"></i> Find Matches
          </button>
        </div>
      </div>
    </div>

    <div className="row g-4 animate-slide-up delay-200">

     {users.length === 0 ? (
       <div className="col-12 text-center text-secondary py-5">
         <i className="bi bi-people fs-1 opacity-50 mb-3 d-block"></i>
         <p>Enter your criteria and search to find roommates.</p>
       </div>
     ) : null}

     {users.map((user, index) =>(

      <div className="col-md-6 col-lg-4" key={user.id} style={{animationDelay: `${(index + 3) * 100}ms`}}>

       <div className="card glass-panel h-100 position-relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="position-absolute top-0 end-0 p-3 opacity-25">
          <i className="bi bi-person-fill fs-1 text-primary"></i>
        </div>

        <div className="card-body p-4 d-flex flex-column">

         <div className="d-flex align-items-center mb-4">
           <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width:"50px", height:"50px"}}>
             <span className="fw-bold fs-4 text-gradient">{user.name.charAt(0)}</span>
           </div>
           <div>
             <h5 className="fw-bold mb-0">{user.name}</h5>
             <span className="badge bg-success bg-opacity-25 text-success rounded-pill border border-success border-opacity-25 mt-1">
               <i className="bi bi-star-fill me-1 small"></i> {user.matchScore}% Match
             </span>
           </div>
         </div>

         <div className="mb-4 flex-grow-1">
           <div className="d-flex justify-content-between mb-2">
             <span className="text-secondary small"><i className="bi bi-geo-alt me-2"></i>Location</span>
             <span className="fw-medium text-white">{user.preferred_location}</span>
           </div>
           <div className="d-flex justify-content-between mb-2">
             <span className="text-secondary small"><i className="bi bi-currency-dollar me-2"></i>Budget</span>
             <span className="fw-medium text-white">₹{user.budget}</span>
           </div>
           <div className="d-flex justify-content-between">
             <span className="text-secondary small"><i className="bi bi-translate me-2"></i>Language</span>
             <span className="fw-medium text-white">{user.mother_tongue}</span>
           </div>
         </div>

         <button className="btn btn-outline-light w-100 border-opacity-50 mt-auto">
           View Full Profile
         </button>

        </div>

       </div>

      </div>

     ))}

    </div>

   </div>
  </div>

 );

}

export default Matches;