import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/PlayerSearch.css';

function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get('http://localhost:2003/teams');
      const teams = response.data;

      if (!teams || !Array.isArray(teams)) {
        throw new Error('Invalid data format');
      }

      const allPlayers = teams.reduce((acc, team) => {
        if (team.players && Array.isArray(team.players)) {
          const playersWithTeam = team.players.map((player) => ({
            ...player,
            teamName: team.teamname || '',
            teamId: team.id || null,
          }));
          return acc.concat(playersWithTeam);
        }
        return acc;
      }, []);

      const filteredSuggestions = allPlayers.filter(
        (player) =>
          player.name.toLowerCase().includes(query.toLowerCase()) ||
          player.role.toLowerCase().includes(query.toLowerCase()) ||
          player.teamName.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filteredSuggestions.slice(0, 5));
      setError('');
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Failed to fetch suggestions. Try again later.');
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleSearch = (player) => {
    if (!player) {
      setError('Player not found');
      return;
    }
    setSearchQuery('');
    setSuggestions([]); 
    navigate(`/player/${player.id}`, { state: { player, teamId: player.teamId } });
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Player Name, Role, or Team Name"
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSearch(suggestion)}
              className="suggestion-item"
            >
              {suggestion.name} - {suggestion.role} ({suggestion.teamName})
            </div>
          ))}
        </ul>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PlayerSearch;
