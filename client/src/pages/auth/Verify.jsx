import React from 'react';
import Timer from '../../components/Timer/Timer';

const Verify = () => {
  const handleResendOTP = () => {
    console.log("Resending OTP...");
  };

  return (
    <div className="auth-page">
      <form className="auth-form">
        <h2>Verify OTP</h2>
        <label htmlFor="otpInput">Enter OTP:</label>
        <input type="number" id="otpInput" placeholder="Enter OTP"  required/>

        <button type="submit" className="common-btn">Verify</button>

        <Timer initialSeconds={120} onResend={handleResendOTP} />
      </form>
    </div>
  );
};

export default Verify;
