// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../Styles/TeamCard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 

// function TeamCard({ team, onUpdate }) {
//   const [players, setPlayers] = useState([]);
//   const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
//   const [newPlayerData, setNewPlayerData] = useState({ name: '', role: 'Batsman', image: '' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     setPlayers(team.players || []);
//   }, [team]);

//   const handleAddPlayer = async () => {
//     // Check if player image URL is empty, then set default image URL
//     if (!newPlayerData.image.trim()) {
//       newPlayerData.image = 'https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?w=175&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7';
//     }

//     if (players.length < 11) {
//       const updatedPlayers = [...players, { id: Date.now(), ...newPlayerData }];
//       const updatedTeam = { ...team, players: updatedPlayers };

//       try {
//         await axios.put(`http://localhost:2003/teams/${team.id}`, updatedTeam);
//         setPlayers(updatedPlayers);
//         setShowAddPlayerForm(false);
//         setNewPlayerData({ name: '', role: 'Batsman', image: '' });
//         onUpdate();
//       } catch (error) {
//         console.error('Error adding player:', error);
//         alert('Failed to add player. Please try again.');
//       }
//     }
//   };

//   const handleDeleteTeam = async () => {
//     try {
//       await axios.delete(`http://localhost:2003/teams/${team.id}`);
//       alert('Team deleted successfully!');
//       onUpdate();
//     } catch (error) {
//       console.error('Error deleting team:', error);
//       alert('Failed to delete team. Please try again.');
//     }
//   };

//   const handlePlayerClick = (playerId) => {
//     navigate(`/player`, { state: { teamId: team.id, playerId } });
//   };

//   return (
//     <div className="team-card">
//       <div className="team-header">
//         <h3 className="team-name">{team.teamname}</h3>
//         <button onClick={handleDeleteTeam} className="delete-team-button">
//           <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
//         </button>
//       </div>

//       <div className="player-list">
//         {players.map((player) => (
//           <div
//             key={player.id}
//             className="player-card"
//             onClick={() => handlePlayerClick(player.id)}
//           >
//             {player.image && (
//               <img
//                 src={player.image}
//                 alt={player.name}
//                 className="player-image"
//               />
//             )}
//             <p className="player-name">{player.name}</p>
//             <p className="player-role">{player.role}</p>
//           </div>
//         ))}
//         {players.length < 11 && (
//           <button onClick={() => setShowAddPlayerForm(true)} className="add-player-button">
//             Add Player
//           </button>
//         )}
//       </div>

//       {showAddPlayerForm && (
//         <div className="add-player-form">
//           <input
//             type="text"
//             placeholder="Player Name"
//             value={newPlayerData.name}
//             onChange={(e) => setNewPlayerData({ ...newPlayerData, name: e.target.value })}
//             className="playerinput"
//           />
//           <select
//             value={newPlayerData.role}
//             onChange={(e) => setNewPlayerData({ ...newPlayerData, role: e.target.value })}
//             className="player-select"
//           >
//             <option value="Batsman">Batsman</option>
//             <option value="Bowler">Bowler</option>
//             <option value="All-rounder">All-rounder</option>
//             <option value="Wicketkeeper">Wicketkeeper</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Player Image URL (Optional)"
//             value={newPlayerData.image}
//             onChange={(e) => setNewPlayerData({ ...newPlayerData, image: e.target.value })}
//             className="playerinput"
//           />
//           <div className="player-actions">
//             <button onClick={handleAddPlayer} className="save-button">Save</button>
//             <button onClick={() => setShowAddPlayerForm(false)} className="cancel-button">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TeamCard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/TeamCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function TeamCard({ team = {}, onUpdate = () => {} }) {
  const [players, setPlayers] = useState([]);
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
  const [newPlayerData, setNewPlayerData] = useState({ name: '', role: 'Batsman', image: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setPlayers(team.players || []);
  }, [team]);

  const validatePlayerName = (name) => {
    if (!name.trim()) {
      toast.error('Player name is required.');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      toast.error('Player name must contain only alphabets and spaces.');
      return false;
    }
    return true;
  };

  const handleAddPlayer = async () => {
    if (!validatePlayerName(newPlayerData.name)) {
      return;
    }

    // Use default image if none is provided
    const playerImage = newPlayerData.image.trim()
      ? newPlayerData.image
      : 'https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?w=175&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7';

    if (players.length < 11) {
      const updatedPlayers = [...players, { id: Date.now(), name: newPlayerData.name, role: newPlayerData.role, image: playerImage }];
      const updatedTeam = { ...team, players: updatedPlayers };

      try {
        await axios.put(`http://localhost:2003/teams/${team.id}`, updatedTeam);
        setPlayers(updatedPlayers);
        setShowAddPlayerForm(false);
        setNewPlayerData({ name: '', role: 'Batsman', image: '' });
        toast.success('Player added successfully!');
        onUpdate();
      } catch (error) {
        console.error('Error adding player:', error);
        toast.error('Failed to add player. Please try again.');
      }
    }
  };

  const handleDeleteTeam = async () => {
    try {
      await axios.delete(`http://localhost:2003/teams/${team.id}`);
      toast.success('Team deleted successfully!');
      onUpdate();
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error('Failed to delete team. Please try again.');
    }
  };

  const handlePlayerClick = (playerId) => {
    navigate(`/player`, { state: { teamId: team.id, playerId } });
  };

  return (
    <div className="team-card">
      <ToastContainer />
      <div className="team-header">
        <h3 className="team-name">{team.teamname}</h3>
        <button onClick={handleDeleteTeam} className="delete-team-button">
          <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
        </button>
      </div>

      <div className="player-list">
        {players.map((player) => (
          <div
            key={player.id}
            className="player-card"
            onClick={() => handlePlayerClick(player.id)}
          >
            <img
              src={player.image}
              alt={player.name}
              className="player-image"
            />
            <p className="player-name">{player.name}</p>
            <p className="player-role">{player.role}</p>
          </div>
        ))}
        {players.length < 11 && (
          <button onClick={() => setShowAddPlayerForm(true)} className="add-player-button">
            Add Player
          </button>
        )}
      </div>

      {showAddPlayerForm && (
        <div className="add-player-form">
          <input
            type="text"
            placeholder="Player Name"
            value={newPlayerData.name}
            onChange={(e) => setNewPlayerData({ ...newPlayerData, name: e.target.value })}
            className="player-input"
          />
          <select
            value={newPlayerData.role}
            onChange={(e) => setNewPlayerData({ ...newPlayerData, role: e.target.value })}
            className="player-select"
          >
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Wicketkeeper">Wicketkeeper</option>
          </select>
          <input
            type="text"
            placeholder="Player Image URL (Optional)"
            value={newPlayerData.image}
            onChange={(e) => setNewPlayerData({ ...newPlayerData, image: e.target.value })}
            className="player-input"
          />
          <div className="player-actions">
            <button onClick={handleAddPlayer} className="save-button">Save</button>
            <button onClick={() => setShowAddPlayerForm(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamCard;
