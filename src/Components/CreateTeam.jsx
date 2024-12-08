// import React, { useState } from 'react';
// import axios from 'axios';
// import '../Styles/CreateTeam.css';
// import Navbar from './Navbar';
// import Carousel from './Carousel';
// import Footer from './Footer';

// function CreateTeam() {
//   const generateRandomId = () => Math.floor(Math.random() * 1000000);
//   const defaultImageUrl =
//     'https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?w=175&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7';
//   const [teamName, setTeamName] = useState('');
//   const [players, setPlayers] = useState([
//     { id: generateRandomId(), name: '', role: 'Batsman', image: '' },
//   ]);

//   const handleAddPlayer = () => {
//     if (players.length < 11) {
//       setPlayers([
//         ...players,
//         { id: generateRandomId(), name: '', role: 'Batsman', image: '' },
//       ]);
//     }
//   };

//   const handlePlayerChange = (index, field, value) => {
//     const updatedPlayers = [...players];
//     updatedPlayers[index][field] = value;
//     setPlayers(updatedPlayers);
//   };

//   const handleRemovePlayer = (index) => {
//     setPlayers(players.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!teamName.trim()) return alert('Team name is required');
//     if (players.some((p) => !p.name.trim())) return alert('All player names are required');

//     const playersWithImages = players.map((player) => ({
//       ...player,
//       image: player.image.trim() || defaultImageUrl,
//     }));

//     const newTeam = { teamname: teamName, players: playersWithImages };
//     try {
//       await axios.post('http://localhost:2003/teams', newTeam);
//       alert('Team created successfully!');
//       setTeamName('');
//       setPlayers([{ id: generateRandomId(), name: '', role: 'Batsman', image: '' }]);
//     } catch (error) {
//       console.error('Error creating team:', error);
//     }
//   };

//   return (
//     <div className="nv">
//       <Navbar />
//       <Carousel />
//       <div className="create-team">
//         <h2>Create a New Team</h2>
//         <input
//           className="teamname"
//           type="text"
//           placeholder="Team Name"
//           value={teamName}
//           onChange={(e) => setTeamName(e.target.value)}
//         />
//         {players.map((player, index) => (
//           <div key={player.id} className="player-row">
//             <input
//               type="text"
//               placeholder="Player Name"
//               value={player.name}
//               onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
//             />
//             <select
//               value={player.role}
//               onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
//             >
//               <option value="Batsman">Batsman</option>
//               <option value="Bowler">Bowler</option>
//               <option value="All-rounder">All-rounder</option>
//               <option value="Wicketkeeper">Wicketkeeper</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Player Image URL (Optional)"
//               value={player.image}
//               onChange={(e) => handlePlayerChange(index, 'image', e.target.value)}
//             />
//             <button onClick={() => handleRemovePlayer(index)} className="clear">
//               Clear
//             </button>
//           </div>
//         ))}
//         <div className="buttons">
//           <button onClick={handleAddPlayer} disabled={players.length >= 11} className='add-btn'>
//             Add More
//           </button>
//           <button onClick={handleSubmit} className='create-btn'>Create</button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default CreateTeam;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Styles/CreateTeam.css';
// import Navbar from './Navbar';
// import Carousel from './Carousel';
// import Footer from './Footer';

// function CreateTeam() {
//   const generateRandomId = () => Math.floor(Math.random() * 1000000);
//   const defaultImageUrl =
//     'https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?w=175&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7';

//   const [teamName, setTeamName] = useState('');
//   const [players, setPlayers] = useState([
//     { id: generateRandomId(), name: '', role: 'Batsman', image: '' },
//   ]);
//   const [existingTeams, setExistingTeams] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch existing team names on mount
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get('http://localhost:2003/teams');
//         setExistingTeams(response.data.map((team) => team.teamname.toLowerCase()));
//       } catch (error) {
//         console.error('Error fetching teams:', error);
//       }
//     };
//     fetchTeams();
//   }, []);

//   const handleAddPlayer = () => {
//     if (players.length < 11) {
//       setPlayers([
//         ...players,
//         { id: generateRandomId(), name: '', role: 'Batsman', image: '' },
//       ]);
//     }
//   };

//   const handlePlayerChange = (index, field, value) => {
//     const updatedPlayers = [...players];
//     updatedPlayers[index][field] = value;
//     setPlayers(updatedPlayers);
//   };

//   const handleRemovePlayer = (index) => {
//     setPlayers(players.filter((_, i) => i !== index));
//   };

//   const validateTeamName = () => {
//     const trimmedName = teamName.trim();
//     if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
//       setError('Team name must contain only alphabets and spaces.');
//       return false;
//     }
//     if (existingTeams.includes(trimmedName.toLowerCase())) {
//       setError('Team name already taken.');
//       return false;
//     }
//     return true;
//   };

//   const validatePlayers = () => {
//     for (const player of players) {
//       if (!player.name.trim()) {
//         setError('Player name is required.');
//         return false;
//       }
//       if (!/^[a-zA-Z\s]+$/.test(player.name.trim())) {
//         setError('Player name must contain only alphabets and spaces.');
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     setError('');

//     if (!teamName.trim()) {
//       setError('Team name is required.');
//       return;
//     }
//     if (!validateTeamName() || !validatePlayers()) {
//       return;
//     }

//     const playersWithImages = players.map((player) => ({
//       ...player,
//       image: player.image.trim() || defaultImageUrl,
//     }));

//     const newTeam = { teamname: teamName, players: playersWithImages };

//     try {
//       await axios.post('http://localhost:2003/teams', newTeam);
//       alert('Team created successfully!');
//       setTeamName('');
//       setPlayers([{ id: generateRandomId(), name: '', role: 'Batsman', image: '' }]);
//     } catch (error) {
//       console.error('Error creating team:', error);
//     }
//   };

//   return (
//     <div className="nv">
//       <Navbar />
//       <Carousel />
//       <div className="create-team">
//         <h2>Create a New Team</h2>
//         {error && <p className="error-message">{error}</p>}
//         <input
//           className="teamname"
//           type="text"
//           placeholder="Team Name"
//           value={teamName}
//           onChange={(e) => setTeamName(e.target.value)}
//         />
//         {players.map((player, index) => (
//           <div key={player.id} className="player-row">
//             <input
//               type="text"
//               placeholder="Player Name"
//               value={player.name}
//               onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
//             />
//             <select
//               value={player.role}
//               onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
//             >
//               <option value="Batsman">Batsman</option>
//               <option value="Bowler">Bowler</option>
//               <option value="All-rounder">All-rounder</option>
//               <option value="Wicketkeeper">Wicketkeeper</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Player Image URL (Optional)"
//               value={player.image}
//               onChange={(e) => handlePlayerChange(index, 'image', e.target.value)}
//             />
//             <button onClick={() => handleRemovePlayer(index)} className="clear">
//               Clear
//             </button>
//           </div>
//         ))}
//         <div className="buttons">
//           <button onClick={handleAddPlayer} disabled={players.length >= 11} className="add-btn">
//             Add More
//           </button>
//           <button onClick={handleSubmit} className="create-btn">
//             Create
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default CreateTeam;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [existingTeams, setExistingTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:2003/teams');
        setExistingTeams(response.data.map((team) => team.teamname.toLowerCase()));
      } catch (error) {
        console.error('Error fetching teams:', error);
        toast.error('Failed to fetch existing teams!');
      }
    };
    fetchTeams();
  }, []);

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

  const validateTeamName = () => {
    const trimmedName = teamName.trim();
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      setError('Team name must contain only alphabets and spaces.');
      toast.error('Team name must contain only alphabets and spaces.');
      return false;
    }
    if (existingTeams.includes(trimmedName.toLowerCase())) {
      setError('Team name is already taken.');
      toast.error('Team name is already taken.');
      return false;
    }
    return true;
  };

  const validatePlayers = () => {
    for (const player of players) {
      if (!player.name.trim()) {
        setError('Player name is required.');
        toast.error('Player name is required.');
        return false;
      }
      if (!/^[a-zA-Z\s]+$/.test(player.name.trim())) {
        setError('Player name must contain alphabets and space only.');
        toast.error('Player name must contain alphabets and space only.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setError('');

    if (!teamName.trim()) {
      setError('Team name is required.');
      toast.error('Team name is required.');
      return;
    }
    if (!validateTeamName() || !validatePlayers()) {
      return;
    }

    const playersWithImages = players.map((player) => ({
      ...player,
      image: player.image.trim() || defaultImageUrl,
    }));

    const newTeam = { teamname: teamName, players: playersWithImages };

    try {
      await axios.post('http://localhost:2003/teams', newTeam);
      toast.success('Team created successfully!');
      setTeamName('');
      setPlayers([{ id: generateRandomId(), name: '', role: 'Batsman', image: '' }]);
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error('Failed to create team!');
    }
  };

  return (
    <div className="nv">
      <Navbar />
      <Carousel />
      <div className="create-team">
        <ToastContainer />
        <h2>Create a New Team</h2>
        {error && <p className="error-message">{error}</p>}
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
          <button onClick={handleAddPlayer} disabled={players.length >= 11} className="add-btn">
            Add Players
          </button>
          <button onClick={handleSubmit} className="create-btn">
            Create Team
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateTeam;
