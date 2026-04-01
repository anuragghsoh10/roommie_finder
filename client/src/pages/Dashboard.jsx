import { Link } from "react-router-dom";

function Dashboard(){

 return(

  <div className="container-fluid min-vh-100 py-5 animate-fade-in" style={{background: "var(--bg-primary)"}}>
   <div className="container">

    <div className="text-center mb-5 animate-slide-up">
     <h1 className="text-gradient fw-bold mb-3 d-inline-block">
      Dashboard
     </h1>
     <p className="text-secondary fs-5">Welcome back to your roommate finder portal.</p>
    </div>

    <div className="row text-center g-4 mt-2">

     <div className="col-md-4 animate-slide-up delay-100">

      <div className="card h-100 p-5 d-flex flex-column align-items-center justify-content-center">

       <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-4" style={{width: "80px", height: "80px", background: "var(--brand-gradient)", boxShadow: "0 10px 20px rgba(99,102,241,0.3)"}}>
         <i className="bi bi-person-circle fs-1 text-white"></i>
       </div>

       <h4 className="fw-bold mb-3">Your Profile</h4>
       <p className="text-secondary small mb-4">Complete your details to find the perfect roommate match.</p>

       <Link to="/create-profile" className="btn btn-primary w-100 mt-auto rounded-pill fw-bold">
         Manage Profile
       </Link>

      </div>

     </div>

     <div className="col-md-4 animate-slide-up delay-200">

      <div className="card h-100 p-5 d-flex flex-column align-items-center justify-content-center">

       <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-4" style={{width: "80px", height: "80px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", boxShadow: "0 10px 20px rgba(16,185,129,0.3)"}}>
         <i className="bi bi-people fs-1 text-white"></i>
       </div>

       <h4 className="fw-bold mb-3">Find Roommates</h4>
       <p className="text-secondary small mb-4">Discover people with similar preferences and budget.</p>

       <Link to="/matches" className="btn btn-primary w-100 mt-auto rounded-pill fw-bold" style={{background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", boxShadow: "0 4px 14px 0 rgba(16,185,129,0.39)"}}>
         Search Matches
       </Link>

      </div>

     </div>

     <div className="col-md-4 animate-slide-up delay-300">

      <div className="card h-100 p-5 d-flex flex-column align-items-center justify-content-center">

       <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mb-4" style={{width: "80px", height: "80px", background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", boxShadow: "0 10px 20px rgba(245,158,11,0.3)"}}>
         <i className="bi bi-house-door-fill fs-1 text-white"></i>
       </div>

       <h4 className="fw-bold mb-3">Properties</h4>
       <p className="text-secondary small mb-4">Browse available rooms and apartments in your chosen area.</p>

       <Link to="/properties" className="btn btn-primary w-100 mt-auto rounded-pill fw-bold" style={{background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", boxShadow: "0 4px 14px 0 rgba(245,158,11,0.39)"}}>
         View Properties
       </Link>

      </div>

     </div>

    </div>

   </div>
  </div>

 );

}

export default Dashboard;