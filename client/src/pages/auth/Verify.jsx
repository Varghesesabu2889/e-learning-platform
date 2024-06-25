import React, { useState } from 'react';
import Timer from '../../components/Timer/Timer';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Verify = () => {

  const {btnLoading,verifyOtp} = UserData()
  const navigate = useNavigate()

  const handleResendOTP = () => {

    console.log("Resending OTP...");

  };
const [otp, setOtp]= useState("")

const handleSubmit = async(e)=>{
  e.preventDefault();
await verifyOtp(Number(otp),navigate)

  console.log("OTP submitted", otp);
}


  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Verify OTP</h2>
        <label htmlFor="otpInput">Enter OTP:</label>
        <input type="number" id="otpInput" placeholder="Enter OTP" 
        value={otp} 
        onChange={(e)=>setOtp(e.target.value)}
        required/>

        <button disabled={btnLoading}  type="submit" className="common-btn">
          {btnLoading? "Please Wait":"Verify"}
          </button>

        <Timer initialSeconds={120} onResend={handleResendOTP} />
      </form>
    </div>
  );
};

export default Verify;
