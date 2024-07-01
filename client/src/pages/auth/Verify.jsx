import React, { useState } from 'react';
import Timer from '../../components/Timer/Timer';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {

  const {btnLoading,verifyOtp} = UserData()
  const navigate = useNavigate()

const [otp, setOtp]= useState("")
const [show, setShow] = useState(false)

const handleSubmit = async(e)=>{
  e.preventDefault();
await verifyOtp(Number(otp),navigate)

  console.log("OTP submitted", otp);
}
function onChange(value) {
  console.log("Captcha value:", value);
  setShow(true)
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
<ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />
        {show && (<button disabled={btnLoading}  type="submit" className="common-btn">
          {btnLoading? "Please Wait":"Verify"}
          </button>)}

        <Timer initialSeconds={85} />
      </form>
    </div>
  );
};

export default Verify;
