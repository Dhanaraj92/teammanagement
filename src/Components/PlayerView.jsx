// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../Styles/PlayerView.css';

// function PlayerView() {
//   const { state } = useLocation();
//   const { teamId, playerId } = state || {}; // Get teamId and playerId from the passed state
//   const [player, setPlayer] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlayerData = async () => {
//       try {
//         const teamResponse = await axios.get(`http://localhost:2003/teams/${teamId}`);
//         const team = teamResponse.data;
//         const selectedPlayer = team.players.find((p) => p.id === playerId);
//         setPlayer(selectedPlayer);
//       } catch (error) {
//         console.error('Error fetching player:', error);
//         alert('Failed to load player data.');
//         navigate('/view'); // Navigate to the view page
//       }
//     };

//     if (teamId && playerId) {
//       fetchPlayerData();
//     }
//   }, [teamId, playerId, navigate]);

//   const handleInputChange = (field, value) => {
//     setPlayer((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const teamResponse = await axios.get(`http://localhost:2003/teams/${teamId}`);
//       const team = teamResponse.data;
//       const updatedPlayers = team.players.map((p) =>
//         p.id === player.id ? player : p
//       );
//       await axios.put(`http://localhost:2003/teams/${teamId}`, {
//         ...team,
//         players: updatedPlayers,
//       });

//       alert('Player updated successfully!');
//       navigate('/view');
//     } catch (error) {
//       console.error('Error saving player:', error);
//       alert('Failed to save player.');
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const teamResponse = await axios.get(`http://localhost:2003/teams/${teamId}`);
//       const team = teamResponse.data;
//       const updatedPlayers = team.players.filter((p) => p.id !== player.id);
//       await axios.put(`http://localhost:2003/teams/${teamId}`, {
//         ...team,
//         players: updatedPlayers,
//       });

//       alert('Player deleted successfully!');
//       navigate('/view');
//     } catch (error) {
//       console.error('Error deleting player:', error);
//       alert('Failed to delete player.');
//     }
//   };

//   return (
//     <div className="playerDetail">
//       {isEditing ? (
//         <div className="editForm">
//           <input
//             type="text"
//             value={player?.name}
//             onChange={(e) => handleInputChange('name', e.target.value)}
//             placeholder="Player Name"
//           />
//           <select
//             value={player?.role}
//             onChange={(e) => handleInputChange('role', e.target.value)}
//           >
//             <option value="Batsman">Batsman</option>
//             <option value="Bowler">Bowler</option>
//             <option value="All-rounder">All-rounder</option>
//             <option value="Wicketkeeper">Wicketkeeper</option>
//           </select>
//           <input
//             type="text"
//             value={player?.image}
//             onChange={(e) => handleInputChange('image', e.target.value)}
//             placeholder="Player Image URL"
//           />
//           <div className="actions">
//             <button onClick={handleSave}className='savebtn'>Save</button>
//             <button onClick={() => setIsEditing(false)}className='cnclbtn'>Cancel</button>
//           </div>
//         </div>
//       ) : (
//         <div className="playerInnfo">
//           <img src={player?.image || 'https://via.placeholder.com/150'} alt={player?.name} />
//           <h1>{player?.name}</h1>
//           <p>Role: {player?.role}</p>
//           <div className="actions">
//             <button onClick={() => setIsEditing(true)} className='edt'>Edit</button>
//             <button onClick={handleDelete} className='dlt'>Delete</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PlayerView;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/PlayerView.css';
import Navbar from './Navbar';

function PlayerView() {
  const { state } = useLocation();
  const { teamId, playerId } = state || {};
  const [player, setPlayer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const teamResponse = await axios.get(`http://localhost:2003/teams/${teamId}`);
        const team = teamResponse.data;
        const selectedPlayer = team.players.find((p) => p.id === playerId);
        setPlayer(selectedPlayer);
      } catch (error) {
        console.error('Error fetching player:', error);
        toast.error('Failed to load player data.');
        navigate('/view'); // Navigate to the view page
      }
    };

    if (teamId && playerId) {
      fetchPlayerData();
    }
  }, [teamId, playerId, navigate]);

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

  const handleInputChange = (field, value) => {
    setPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!validatePlayerName(player.name)) {
      return;
    }

    try {
      const teamResponse = await axios.get(`http://localhost:2003/teams/${teamId}`);
      const team = teamResponse.data;
      const updatedPlayers = team.players.map((p) =>
        p.id === player.id ? player : p
      );
      await axios.put(`http://localhost:2003/teams/${teamId}`, {
        ...team,
        players: updatedPlayers,
      });

      toast.success('Player updated successfully!');
      navigate('/view');
    } catch (error) {
      console.error('Error saving player:', error);
      toast.error('Failed to save player.');
    }
  };

  const handleDelete = async () => {
    try {
      const teamResponse = await axios.get(`http://localhost:2003/teams/${teamId}`);
      const team = teamResponse.data;
      const updatedPlayers = team.players.filter((p) => p.id !== player.id);
      await axios.put(`http://localhost:2003/teams/${teamId}`, {
        ...team,
        players: updatedPlayers,
      });

      toast.success('Player deleted successfully!');
      navigate('/view');
    } catch (error) {
      console.error('Error deleting player:', error);
      toast.error('Failed to delete player.');
    }
  };

  return (
   <div className="nv">
    <Navbar/>
     <div className="playerDetail">
      <ToastContainer />
      {isEditing ? (
        <div className="editForm">
          <input
            type="text"
            value={player?.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Player Name"
          />
          <select
            value={player?.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Wicketkeeper">Wicketkeeper</option>
          </select>
          <input
            type="text"
            value={player?.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="Player Image URL"
          />
          <div className="actions">
            <button onClick={handleSave} className="savebtn">Save</button>
            <button onClick={() => setIsEditing(false)} className="cnclbtn">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="playerInnfo">
          <img src={player?.image || 'https://via.placeholder.com/150'} alt={player?.name} />
          <h1>{player?.name}</h1>
          <p>Role: {player?.role}</p>
          <div className="actions">
            <button onClick={() => setIsEditing(true)} className="edt">Edit</button>
            <button onClick={handleDelete} className="dlt">Delete</button>
          </div>
        </div>
      )}
    </div>
   </div>
  );
}

export default PlayerView;
