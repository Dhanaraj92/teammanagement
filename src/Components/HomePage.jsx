// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../Styles/HomePage.css'
// import Navbar from './Navbar';
// import Carousel from './Carousel';
// import Footer from './Footer';

// function HomePage() {
//   return (
//    <div className="n">
//     <Navbar/>
//     <Carousel/>
//      <div className="home-container">
//       <header className="home-header">
//         <h1>Welcome to Cricket Team Management</h1>
//         <p>Organize and manage your teams effortlessly.</p>
//       </header>

//       <div className="home-navigation">
//         <div className="home-card">
//           <h2>Create a Team</h2>
//           <p>Build your team by adding players and defining roles.</p>
//           <Link to="/create" className="home-button">
//             Create Team
//           </Link>
//         </div>

//         <div className="home-card">
//           <h2>View Teams</h2>
//           <p>Browse and manage your existing teams.</p>
//           <Link to="/view" className="home-button">
//             View Teams
//           </Link>
//         </div>

       
//       </div>
//     </div>
//     <Footer/>
//    </div>
//   );
// }

// export default HomePage;


import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';

function HomePage() {
  return (
    <div className="n">
      <Navbar />
      <Carousel />
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
            <div className="home-card-content">
              <p>
                With the <strong>Create Team</strong> option to Add players,<br /> assign them specific roles!
              </p>
            </div>
          </div>

          <div className="home-card">
            <h2>View Teams</h2>
            <p>Browse and manage your existing teams.</p>
            <Link to="/view" className="home-button">
              View Teams
            </Link>
            <div className="home-card-content">
              <p>
                Use the <strong>View Teams</strong> option to Edit player details,<br /> add new members!
              </p>
            </div>
          </div>
        </div>

        <section className="additional-info">
          <h2 className='headline'>Why Choose Cricket Team Management?</h2>
          <p>
           1. Cricket is not just a game; it's a passion. Managing a cricket team requires precision, planning, and a deep understanding of each player's role. With our platform, you can:
          </p>
          <ul>
            <li>Build a robust team with clear roles and responsibilities.</li>
            <li>Easily update player details and roles as your strategy evolves.</li>
            <li>Keep all your teams organized in one place for easy access.</li>
          </ul>
          <p>
           2. Whether you are managing a school team, a corporate squad, or a professional lineup, Cricket Team Management simplifies the process, allowing you to focus on what matters—winning matches.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
