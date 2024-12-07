import React from 'react';
import { Link } from 'react-router-dom';
import PlayerSearch from './PlayerSearch';
import '../Styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Cricket Team Management</h1>
      </div>

      <div className="search-bar-container">
        <PlayerSearch />
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Create Team</Link>
        <Link to="/view" className="nav-link">View Team</Link>

      </div>
    </nav>
  );
}

export default Navbar;
