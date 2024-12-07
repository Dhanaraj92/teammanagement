import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import CreateTeam from "./Components/CreateTeam";
import ViewTeam from "./Components/ViewTeam";
import PlayerSearch from "./Components/PlayerSearch";
import PlayerDetails from "./Components/PlayerDetails";
import PlayerView from "./Components/PlayerView";

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
      <Route path="/player" element={<PlayerView/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
