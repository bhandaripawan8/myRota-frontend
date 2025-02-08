import React, { useState } from 'react';
import './Authenticate.css'; // Import the custom CSS
import useAuthStore from '../../Store/AuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    const user = { email, password }; // Replace with actual login logic
    setUser(user);
    console.log(user);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <a href="/register" className="auth-link">Don't have an account? Register</a>
      </form>
    </div>
  );
}

export default Login;