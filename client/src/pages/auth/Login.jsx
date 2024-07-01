import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';
import { UserData } from '../../context/UserContext';
import { CourseData } from '../../context/CourseContext';


const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate()
const {btnLoading,loginUser} = UserData()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { fetchMyCourse }= CourseData()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

const handleSubmit =async(e)=>{
  e.preventDefault();
  await loginUser(email,password,navigate,fetchMyCourse)
}



  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button disabled={btnLoading} 
          className="common-btn"
           type="submit">

            {btnLoading?"Please Wait....": "Login"}
      
            </button>
        </form>
        <p>Do not have an account? <Link to={"/register"}>Register</Link></p>
        <p><Link to={"/forgot"}>Forgot Password?</Link></p>

      </div>
    </div>
  );
}

export default Login;
