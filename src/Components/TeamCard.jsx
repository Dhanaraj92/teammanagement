import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/TeamCard.css';

function TeamCard({ team, onUpdate }) {
  const [players, setPlayers] = useState([]);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editingPlayerData, setEditingPlayerData] = useState(null);

  useEffect(() => {
    setPlayers(team.players || []);
  }, [team]);

  const handleEdit = (player) => {
    setEditingPlayerId(player.id);
    setEditingPlayerData({ ...player });
  };

  const handleInputChange = (field, value) => {
    setEditingPlayerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedPlayers = players.map((player) =>
        player.id === editingPlayerId ? { ...editingPlayerData } : player
      );
      const updatedTeam = { ...team, players: updatedPlayers };
      await axios.put(`http://localhost:2003/teams/${team.id}`, updatedTeam);

      setPlayers(updatedPlayers);
      setEditingPlayerId(null);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error saving player:', error);
      alert('Failed to save player. Please try again.');
    }
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      const updatedPlayers = players.filter((player) => player.id !== playerId);
      const updatedTeam = { ...team, players: updatedPlayers };
      await axios.put(`http://localhost:2003/teams/${team.id}`, updatedTeam);

      setPlayers(updatedPlayers);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player. Please try again.');
    }
  };

  const handleAddPlayer = () => {
    if (players.length < 11) {
      const newPlayer = { id: Date.now(), name: '', role: 'Batsman', image: '' };
      setPlayers([...players, newPlayer]);
    }
  };

  const handleDeleteTeam = async () => {
    try {
      await axios.delete(`http://localhost:2003/teams/${team.id}`);
      alert('Team deleted successfully!');
      onUpdate();
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team. Please try again.');
    }
  };

  return (
    <div className="pag">
      <div className="team-card">
        <h3 className="team-name">{team.teamname}</h3>
        <div className="player-list">
          {players.map((player) => (
            <div key={player.id} className="player-card">
              {editingPlayerId === player.id ? (
                <>
                  <input
                    type="text"
                    value={editingPlayerData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Player Name"
                    className="player-input"
                  />
                  <select
                    value={editingPlayerData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="player-select"
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-rounder">All-rounder</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                  </select>
                  <input
                    type="text"
                    value={editingPlayerData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Player Image URL"
                    className="player-input"
                  />
                  <div className="player-actions">
                    <button onClick={handleSave} className="save-button">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPlayerId(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {player.image && (
                    <img
                      src={player.image}
                      alt={player.name}
                      className="player-image"
                    />
                  )}
                  <p className="player-name">{player.name}</p>
                  <p className="player-role">{player.role}</p>
                  <div className="player-actions">
                    <button
                      onClick={() => handleEdit(player)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlayer(player.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {players.length < 11 && (
          <button onClick={handleAddPlayer} className="add-player-button">
            Add Player
          </button>
        )}
        <button onClick={handleDeleteTeam} className="delete-team-button">
          Delete Team
        </button>
      </div>
    </div>
  );
}
export default TeamCard;
