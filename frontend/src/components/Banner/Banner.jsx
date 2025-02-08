import React from 'react';
import './Banner.css'; // Import the custom CSS
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner">
      <img src='https://www.thinking-software.com/templates/yootheme/cache/94/How-To-Plan-a-Staff-Rota-94b9e3ff.webp' alt='Banner' />
      <div className="banner-container">
        <h1 className="banner-title">Simplify Your Rota Management</h1>
        <p className="banner-description">
          Effortlessly allocate shifts, manage staff availability, and optimize your workforce with our intuitive rota
          allocation system.
        </p>
        <div className="new-to-myrota">
          <p>New to MyRota?</p>
          <Link to="/registercompany" className="banner-button button-primary">
            Register Your Company
          </Link>
          <Link to="/learn-more" className="banner-button button-secondary">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;