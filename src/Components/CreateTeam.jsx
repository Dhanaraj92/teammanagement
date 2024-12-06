import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/CreateTeam.css';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';

function CreateTeam() {
  const generateRandomId = () => Math.floor(Math.random() * 1000000);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([{ id: generateRandomId(), name: '', role: 'Batsman', image: '' }]);

  const handleAddPlayer = () => {
    if (players.length < 11) {
      setPlayers([...players, { id: generateRandomId(), name: '', role: 'Batsman', image: '' }]);
    }
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleRemovePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!teamName.trim()) return alert('Team name is required');
    if (players.some((p) => !p.name.trim())) return alert('All player names are required');
    if (players.some((p) => !p.image.trim())) return alert('Player image URLs are required');

    const newTeam = { teamname: teamName, players };
    try {
      await axios.post('http://localhost:2003/teams', newTeam);
      alert('Team created successfully!');
      setTeamName('');
      setPlayers([{ id: generateRandomId(), name: '', role: 'Batsman', image: '' }]);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
   <div className="nv">
    <Navbar/>
    <Carousel/>
     <div className="create-team">
      <h2>Create a New Team</h2>
      <input required
        className="teamname"
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      {players.map((player, index) => (
        <div key={player.id} className="player-row">
          <input required
            type="text"
            placeholder="Player Name"
            value={player.name}
            onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
          />
          <select required
            value={player.role}
            onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
          >
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Wicketkeeper">Wicketkeeper</option>
          </select>
          <input required
            type="text"
            placeholder="Player Image URL"
            value={player.image}
            onChange={(e) => handlePlayerChange(index, 'image', e.target.value)}
          />
          <button onClick={() => handleRemovePlayer(index)} className="remove">
            Remove
          </button>
        </div>
      ))}
      <button onClick={handleAddPlayer} disabled={players.length >= 11}>
        Add Player
      </button>
      <button onClick={handleSubmit}>Create Team</button>
    </div>
    <Footer/>
   </div>
  );
}

export default CreateTeam;
