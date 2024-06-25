import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 
import Carousel from '../../components/carousel/Carousel';
import Testimonials from '../../components/testimonials/Testimonials';

const Home = () => {
  const navigate = useNavigate();

  return (
   <>
    <Carousel/>
    <div className="home mb-5">
      <div className="home-content">
        <h1>Welcome to our learning hub!</h1>
        <p>Here, you can find a wide range of courses and resources to help you learn</p>
        <p>and grow in your career. From beginner-friendly tutorials to advanced</p>
        <p>topics, we've got you covered. So, what are you waiting for?</p>
        <button onClick={() => navigate("/courses")} className='common-btn'>Get Started</button>
      </div>
    </div>
    <Testimonials/>
   </>
  );
};

export default Home;