import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 
import image from '../../assets/carousels/caro2.gif'
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home mb-5">
      <div className="home-content">
        <h1>Welcome to our learning hub!</h1>
        <p>Here, you can find a wide range of courses and resources to help you learn</p>
        <p>and grow in your career. From beginner-friendly tutorials to advanced</p>
        <p>topics, we've got you covered. So, what are you waiting for?</p>
        <button onClick={() => navigate("/courses")} className='common-btn'>Get Started</button>
      </div>
      <div className="home-image">
        <img src={image} alt="Learning Hub"  width={"75%"} style={{marginBottom:"60px"}}/>
      </div>
    </div>
  );
};

export default Home;
