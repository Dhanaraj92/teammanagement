import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css'
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';

function HomePage() {
  return (
   <div className="n">
    <Navbar/>
    <Carousel/>
     <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Cricket Team Management</h1>
        <p>Organize and manage your teams effortlessly.</p>
      </header>

      <div className="home-navigation">
        <div className="home-card">
          <h2>Create a Team</h2>
          <p>Build your team by adding players and defining roles.</p>
          <Link to="/create" className="home-button">
            Create Team
          </Link>
        </div>

        <div className="home-card">
          <h2>View Teams</h2>
          <p>Browse and manage your existing teams.</p>
          <Link to="/view" className="home-button">
            View Teams
          </Link>
        </div>

       
      </div>
    </div>
    <Footer/>
   </div>
  );
}

export default HomePage;
