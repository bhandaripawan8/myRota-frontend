import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import useAuthStore from "../../Store/AuthStore";
import "./Authenticate.css";
import { API_BASE_URL } from "../../src/Config";
import {toast} from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, { email, password });
      const { user, token } = response.data;
  
      // Save user and token
      setUser({ ...user, token }); 
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    }
  };
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <a href="/register" className="auth-link">
          Don't have an account? Register
        </a>
      </form>
    </div>
  );
};

export default Login;
