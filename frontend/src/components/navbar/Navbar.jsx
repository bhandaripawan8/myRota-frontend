import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuthStore from "../../../Store/AuthStore";

const Navbar = () => {
  const { user, setUser } = useAuthStore(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>MyRota</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user ? (
          <>
            <Link onClick={handleLogout} className="logout-button">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
