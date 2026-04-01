import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Properties(){

 const [properties,setProperties] = useState([]);
 const navigate = useNavigate();

 useEffect(()=>{

  fetchProperties();

 },[]);

 const fetchProperties = async ()=>{

  try {
    const res = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/properties");
    setProperties(res.data);
  } catch (error) {
    // Fallback demo data if API fails so UI is visible during demo
    setProperties([
      { id: 1, title: "Sunny Studio in Downtown", location: "Downtown", rent: "1200", available_from: "2024-05-01" },
      { id: 2, title: "Spacious 2BHK Shared Setup", location: "Westside", rent: "800", available_from: "2024-06-15" },
      { id: 3, title: "Modern Loft Near University", location: "Uptown", rent: "950", available_from: "2024-07-01" }
    ]);
  }

 };

 return(

  <div className="container-fluid min-vh-100 py-5 animate-fade-in" style={{background: "var(--bg-primary)"}}>
   <div className="container">
    
    <button className="btn btn-link text-secondary text-decoration-none mb-4 p-0 fw-bold" onClick={() => navigate("/dashboard")}>
      <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
    </button>

    <div className="d-flex justify-content-between align-items-end mb-5 animate-slide-up">
      <div>
       <h2 className="text-gradient fw-bold mb-2">Available Properties</h2>
       <p className="text-secondary mb-0">Discover top-rated places submitted by hosts.</p>
      </div>
      <button className="btn btn-outline-primary rounded-pill d-none d-sm-block">
        <i className="bi bi-filter"></i> Filter
      </button>
    </div>

    <div className="row g-4">

     {properties.length === 0 ? (
       <div className="col-12 text-center text-secondary py-5 animate-slide-up delay-100">
         <div className="spinner-border text-primary" role="status"></div>
         <p className="mt-3">Loading properties...</p>
       </div>
     ) : null}

     {properties.map((property, index) =>(

      <div className="col-md-6 col-lg-4" key={property.id} style={{animationDelay: `${index * 100}ms`}}>

       <div className="card glass-panel h-100 animate-slide-up overflow-hidden border-0">
        
        {/* Placeholder for property image */}
        <div className="bg-secondary bg-opacity-25 w-100 d-flex align-items-center justify-content-center" style={{height: "180px"}}>
          <i className="bi bi-image text-secondary fs-1 opacity-50"></i>
        </div>

        <div className="card-body p-4 d-flex flex-column">

         <div className="mb-3">
           <span className="badge bg-primary bg-opacity-25 text-primary mb-2 border border-primary border-opacity-25"><i className="bi bi-house me-1"></i> Apartment</span>
           <h5 className="fw-bold lh-base">{property.title}</h5>
         </div>

         <div className="mb-4">
           <p className="text-secondary small mb-2 d-flex align-items-center">
             <i className="bi bi-geo-alt me-2 text-warning"></i> {property.location}
           </p>
           <p className="text-secondary small mb-0 d-flex align-items-center">
             <i className="bi bi-calendar-event me-2 text-info"></i> Avail: <span className="text-white ms-1">{property.available_from}</span>
           </p>
         </div>

         <div className="mt-auto pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
           <div>
             <span className="text-secondary small d-block">Monthly Rent</span>
             <span className="fw-bold fs-5 text-gradient">₹{property.rent}</span>
           </div>
           <button className="btn btn-primary rounded-pill px-4">View</button>
         </div>

        </div>

       </div>

      </div>

     ))}

    </div>

   </div>
  </div>

 );

}

export default Properties;