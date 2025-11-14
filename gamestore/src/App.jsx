import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// import Gamelist from "./components/Gameslist";
// import Home from "./Pages/Home";
import GameDetails2 from "./Pages/Braintester/GameDetails2";
// import GameDetailsBrain2 from "./Pages/Braintester/GameDetailsBrain2";
import Gamestotest from "./Pages/Braintester/Gamestotest";
import Brainlist from './Pages/Braintester/Brainlist';
// import Gamelist from './components/Gameslist';
// import GameCard from './components/Gamecard.jsx';
function App() {
  return (
    
    <Router>
      <Routes>
        {/* <Route path="/Home" element={<Home />} /> */}
        {/* <Route path="/Gamelist" element={<Gamelist />} /> */}
        <Route path="/details/:id" element={<GameDetails2 />} />
        {/* <Route path="/details2/:id" element={<GameDetailsBrain2 />} /> */}
        <Route path="/" element={<Gamestotest />} />
        <Route path="/Brainlist" element={<Brainlist />} />
        {/* <Route path="/GameCard" element={<GameCard />} /> */}
        {/* <Route path="/Gamelist" element={<Gamelist />} /> */}

      </Routes>
    </Router>
  );
}


export default App;
