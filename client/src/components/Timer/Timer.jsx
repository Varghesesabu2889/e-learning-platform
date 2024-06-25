import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const TimerDisplay = styled(motion.div)`
  font-size: 1.2rem;
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #333;
`;

const Timer = ({ initialSeconds = 60, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  

  const navigate = useNavigate() 


  return (
    <div>
      <TimerDisplay
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {seconds > 0 ? `Time For OTP Verification in ${seconds}s` : navigate('/register') }
      </TimerDisplay>
     
    </div>
  );
};

export default Timer;
