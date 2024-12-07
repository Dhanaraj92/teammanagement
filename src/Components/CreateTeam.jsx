
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/CreateTeam.css';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';

function CreateTeam() {
  const generateRandomId = () => Math.floor(Math.random() * 1000000);
  const defaultImageUrl =
    'https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?w=175&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([
    { id: generateRandomId(), name: '', role: 'Batsman', image: '' },
  ]);

  const handleAddPlayer = () => {
    if (players.length < 11) {
      setPlayers([
        ...players,
        { id: generateRandomId(), name: '', role: 'Batsman', image: '' },
      ]);
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

    const playersWithImages = players.map((player) => ({
      ...player,
      image: player.image.trim() || defaultImageUrl,
    }));

    const newTeam = { teamname: teamName, players: playersWithImages };
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
      <Navbar />
      <Carousel />
      <div className="create-team">
        <h2>Create a New Team</h2>
        <input
          className="teamname"
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        {players.map((player, index) => (
          <div key={player.id} className="player-row">
            <input
              type="text"
              placeholder="Player Name"
              value={player.name}
              onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
            />
            <select
              value={player.role}
              onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicketkeeper">Wicketkeeper</option>
            </select>
            <input
              type="text"
              placeholder="Player Image URL (Optional)"
              value={player.image}
              onChange={(e) => handlePlayerChange(index, 'image', e.target.value)}
            />
            <button onClick={() => handleRemovePlayer(index)} className="clear">
              Clear
            </button>
          </div>
        ))}
        <div className="buttons">
          <button onClick={handleAddPlayer} disabled={players.length >= 11} className='add-btn'>
            Add More
          </button>
          <button onClick={handleSubmit} className='create-btn'>Create</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateTeam;
