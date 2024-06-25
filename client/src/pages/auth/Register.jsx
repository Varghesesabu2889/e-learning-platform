import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';
import {UserData } from '../../context/UserContext'

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate()
  const {btnLoading,registerUser} = UserData()
  const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit =async(e)=>{
    e.preventDefault();
    await registerUser(name,email,password,navigate)
  }

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Enter your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="common-btn" disabled={btnLoading} type="submit">
            {btnLoading?"Please Wait...":"Register"}

          </button>
        </form>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
