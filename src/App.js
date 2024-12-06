import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import CreateTeam from "./Components/CreateTeam";
import ViewTeam from "./Components/ViewTeam";
// import TeamCard from "./TeamCard";
// import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerSearch from "./Components/PlayerSearch";
import PlayerDetails from "./Components/PlayerDetails";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/create" element={<CreateTeam/>}></Route>
      <Route path="/view" element={<ViewTeam/>}></Route>
      <Route path="/search" element={<PlayerSearch/>}></Route>
      <Route path="/player/:id" element={<PlayerDetails />} />

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
