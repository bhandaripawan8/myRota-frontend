import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuthStore from "../../../Store/AuthStore";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
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
        {user && localStorage.getItem("token") ? (
          <>
            <Link onClick={handleLogout} to={'/'} className="logout-button">
              Logout
            </Link>
            {/* Conditional redirect based on user role */}
            {user.role === "employee" ? (
              <Link to="/dashboard/employee">Dashboard</Link>
            ) : user.role === "employer" ? (
              <Link to="/dashboard/employer">Dashboard</Link>
            ) : null}
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
