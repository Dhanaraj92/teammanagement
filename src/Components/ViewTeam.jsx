import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import axios from 'axios';
import Navbar from './Navbar';
import '../Styles/ViewTeam.css';
import Footer from './Footer';

function ViewTeam() {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:2003/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="n">
      <Navbar/>
      <div className="teamlist-container">
    
      <div className="team-list">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} onUpdate={fetchTeams} />
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}
export default ViewTeam;
