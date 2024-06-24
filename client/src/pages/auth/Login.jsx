import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter your email" required />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="common-btn" type="submit">Login</button>
        </form>
        <p>Do not have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
