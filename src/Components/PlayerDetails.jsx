import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/PlayerDetails.css';

function PlayerDetails() {
  const { state: player } = useLocation(); 
  const [editingPlayer, setEditingPlayer] = useState(player);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setEditingPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2003/teams/${editingPlayer.teamId}`
      );
      const team = response.data;

      const updatedPlayers = team.players.map((p) =>
        p.id === editingPlayer.id ? editingPlayer : p
      );

      await axios.put(`http://localhost:2003/teams/${editingPlayer.teamId}`, {
        ...team,
        teamname: editingPlayer.teamname, 
        players: updatedPlayers,
      });

      alert('Player and Team updated successfully!');
      navigate('/view'); 
    } catch (err) {
      console.error('Error saving player:', err);
      alert('Failed to save player. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2003/teams/${editingPlayer.teamId}`
      );
      const team = response.data;
      const updatedPlayers = team.players.filter(
        (p) => p.id !== editingPlayer.id
      );

      await axios.put(`http://localhost:2003/teams/${editingPlayer.teamId}`, {
        ...team,
        players: updatedPlayers,
      });

      alert('Player deleted successfully!');
      navigate('/view'); 
    } catch (err) {
      console.error('Error deleting player:', err);
      alert('Failed to delete player. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/view'); // Navigate back to the main page
  };

  return (
    <div className="player-detail">
      <div className="player-card">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editingPlayer.teamname}
              onChange={(e) => handleInputChange('teamname', e.target.value)}
              placeholder="Team Name"
              className="edit-input"
            />
            <input
              type="text"
              value={editingPlayer.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Player Name"
              className="edit-input"
            />
            <select
              value={editingPlayer.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="edit-select"
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
              className="edit-input"
            />
            <div className="actions">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={editingPlayer.image || 'https://via.placeholder.com/150'}
              alt={editingPlayer.name}  
              className="player-image"
            />
            <h1 className="player-name">{editingPlayer.name}</h1>
            <p className="player-role">{editingPlayer.role}</p>
            <p className="player-team">Team: {editingPlayer.teamname}</p>
            <div className="actions">
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerDetails;
