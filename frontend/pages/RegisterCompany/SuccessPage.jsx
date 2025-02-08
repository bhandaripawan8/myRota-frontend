import React from "react";
import { useLocation } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  const { unique_code } = location.state || {};

  return (
    <div className="success-page-container">
      <h1>Company Registered Successfully</h1>
      {unique_code && (
        <>
          <p>
            Your unique company code is: <strong>{unique_code}</strong>
          </p>
          <p>
            Please keep this code safe. You will need to use it when registering{" "}
            <strong>either as an employee or as an employer</strong>.
          </p>
        </>
      )}
      <a href="/register" className="auth-link">
        Go to Register
      </a>
    </div>
  );
};

export default SuccessPage;
