import React, { useState } from 'react'
import './auth.css'
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

const [password, setPassword] = useState("")
const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams()  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/reset?token=${params.token}`, {
         password,
         });
      toast.success(data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };
  return (
    <div className='auth-page'>
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter Password</label>
          <input
            type="password"
            id="email"
            value={password}
            placeholder='Enter New Password'
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button disabled={btnLoading} type="submit" className='common-btn'>
            {btnLoading ? 'Please Wait...' : 'Forgot Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword