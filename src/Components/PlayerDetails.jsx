import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/PlayerDetails.css';

function PlayerDetails() {
  const { state } = useLocation();
  const { player, teamId } = state || {};  // Extract player and teamId from state
  const [editingPlayer, setEditingPlayer] = useState(player || {});
  const [isEditing, setIsEditing] = useState(false);
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:2003/teams/${teamId}`);
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team:', error);
        alert('Failed to load team data.');
        navigate('/view'); // Navigate back if the team data cannot be fetched
      }
    };

    if (teamId) {
      fetchTeam();
    }
  }, [teamId, navigate]);

  // Handle input changes for the editable player fields
  const handleInputChange = (field, value) => {
    setEditingPlayer((prev) => ({ ...prev, [field]: value }));
  };

  // Save the edited player data
  const handleSave = async () => {
    if (!team) {
      alert('Team data is not available!');
      return;
    }

    try {
      // Find the player to update and update the player data
      const updatedPlayers = team.players.map((p) =>
        p.id === editingPlayer.id ? { ...editingPlayer } : p
      );

      // Prepare the updated team data
      const updatedTeam = { ...team, players: updatedPlayers };

      // Send the PUT request to update the team data
      await axios.put(`http://localhost:2003/teams/${teamId}`, updatedTeam);

      alert('Player updated successfully!');
      navigate('/view'); // Navigate back to the view page
    } catch (error) {
      console.error('Error saving player:', error);
      alert('Failed to save player. Please try again.');
    }
  };

  // Delete the player from the team
  const handleDelete = async () => {
    if (!team) {
      alert('Team data is not available!');
      return;
    }

    try {
      // Filter out the player to delete from the team
      const updatedPlayers = team.players.filter((p) => p.id !== player.id);

      // Prepare the updated team data
      const updatedTeam = { ...team, players: updatedPlayers };

      // Send the PUT request to update the team data with the removed player
      await axios.put(`http://localhost:2003/teams/${teamId}`, updatedTeam);

      alert('Player deleted successfully!');
      navigate('/view'); // Navigate back to the view page
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player. Please try again.');
    }
  };

  return (
    <div className="player-detail">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editingPlayer.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Player Name"
          />
          <select
            value={editingPlayer.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Wicketkeeper">Wicketkeeper</option>
          </select>
          <input
            type="text"
            value={editingPlayer.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="Player Image URL"
          />
          <button onClick={handleSave}className='savebtn'>Save</button>
          <button onClick={() => setIsEditing(false)} className='cnclbtn'>Cancel</button>
        </div>
      ) : (
        <div className="player-info">
          <img src={editingPlayer.image || 'https://via.placeholder.com/150'} alt={editingPlayer.name} />
          <h1>{editingPlayer.name}</h1>
          <p>Role: {editingPlayer.role}</p>
          <p>Team: {team?.teamname}</p>
          <button onClick={() => setIsEditing(true)} className="ed-btn">Edit</button>
          <button onClick={handleDelete} className='dlt-btn'>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PlayerDetails;
