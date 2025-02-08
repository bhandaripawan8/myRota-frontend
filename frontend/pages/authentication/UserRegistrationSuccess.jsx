import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.css";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from location.state (for the response message and company data)
  const { message, data } = location.state || {};
  const { company_id } = data || {};

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const { name,  company_unique_code, EmployerName } = user || {};

  return (
    <div className="success-page">
      <div className="success-page-container">
        <h1>Registration Successful!</h1>
        {message && (
          <>
            <p>{message}</p>
            <p>Your employer name: <strong>{EmployerName}</strong></p>
            <p>Your company ID: <strong>{company_id}</strong></p>
          </>
        )}
        {user && (
          <>
            <p>Welcome, <strong>{name}</strong>!</p>
            <p>Your company code: <strong>{company_unique_code}</strong></p>
            <p>Your employer name: <strong>{EmployerName}</strong></p>
          </>
        )}
        <p>Please click the button below to log in.</p>
        <button onClick={() => navigate("/login")} className="auth-link">
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
