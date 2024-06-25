import React, { useState } from 'react';
import { FaHome, FaBook, FaInfoCircle, FaUser, FaBars } from 'react-icons/fa';
import './header.css';
import image from '../../assets/designs/developers.png';

const Header = ({isAuth}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo" href='/'>
          <img src={image} alt="Developers Logo" width="60px" className="logo-image" />
          <a href="/" className='logo-title'>Skill Academy</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>
        <nav className={`navigation ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/"  className='a-item'><FaHome style={{ marginRight: '5px' }} />Home</a></li>
            <li className="nav-item"><a href="/courses" className='a-item'><FaBook style={{ marginRight: '5px' }} />Courses</a></li>
            <li className="nav-item"><a href="/about" className='a-item'><FaInfoCircle style={{ marginRight: '5px' }} />About</a></li>
{
  isAuth ? (
    <li className="nav-item"><a href="/account" className='a-item'><FaUser style={{ marginRight: '5px' }} />Account</a></li>
) : (
  <li className="nav-item"><a href="/login" className='a-item'><FaUser style={{ marginRight: '5px' }} />Login</a></li>
)
}


          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
