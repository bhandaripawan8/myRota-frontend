import React, { useState } from 'react';
import './Authenticate.css'; // Import the custom CSS
import useAuthStore from '../../Store/AuthStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    company_unique_code: '',
    availability: [],
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.company_unique_code) newErrors.company_unique_code = 'Company ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = { ...formData };
      setUser(user);
      console.log(user);
      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/register', user);
        console.log(response);
        if (response.status === 201) {
          setResponseMessage(response.data.message);
  
          // Save user information and token to localStorage
          localStorage.setItem('user', JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            company_unique_code: formData.company_unique_code,
            token: response.data.token,
            EmployerName: response.data.data.CompanyName,
          }));
  
          setTimeout(() => {
            navigate('/register/success', {
              state: { name: formData.name, CompanyName: response.data.data.CompanyName },
            });
          }, 2000);
        } else {
          setResponseMessage(response.data.message);
        }
      } catch (error) {
        console.error('Registration failed:', error);
        setResponseMessage(error.response.data.message);
      }
    }
  };
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <p>Register as:</p>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>
        <input
          type="text"
          name="company_unique_code"
          placeholder="Company ID"
          value={formData.company_unique_code}
          onChange={handleChange}
          required
        />
        {errors.company_unique_code && <span className="error">{errors.company_unique_code}</span>}
        <button type="submit">Register</button>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
        <a href="/login" className="auth-link">Already have an account? Login</a>
      </form>
    </div>
  );
};

export default Register;
