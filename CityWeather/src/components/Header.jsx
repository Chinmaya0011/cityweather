import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../styles/Header.css'
import logo from '../assets/weatherlogo.png'
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Logo" /> {/* Replace logo.png with your actual logo */}
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
