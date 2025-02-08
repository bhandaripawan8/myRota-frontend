import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';

const HomePage = () => {
  return (
    <div className="home-page">
    <Banner/>
      {/* Information Cards */}
      <section className="info-cards">
        <div className="card">
          <h3>Flexible Licensing</h3>
          <p>Choose from monthly or annual plans tailored to your needs.</p>
        </div>
        <div className="card">
          <h3>Data Security</h3>
          <p>Your company and employee data is encrypted and secure.</p>
        </div>
        <div className="card">
          <h3>24/7 Support</h3>
          <p>Get round-the-clock assistance from our expert support team.</p>
        </div>
      </section>

      {/* Choose Employer or Employee */}
      <section className="user-type-section">
        <h2>Are you an Employer or Employee?</h2>
        <div className="user-type-buttons">
          <Link to="/register-company" className="btn employer-btn">
            I am an Employer
          </Link>
          <Link to="/employee-register" className="btn employee-btn">
            I am an Employee
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
