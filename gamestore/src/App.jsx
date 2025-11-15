import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import GameDetails2 from "./Pages/Braintester/GameDetails2";
import GameDetailsBrain2 from "./Pages/Braintester/GameDetailsBrain2";
import Gamestotest from "./Pages/Braintester/Gamestotest";
import Brainlist from './Pages/Braintester/Brainlist';
import TesterStore from './Pages/Braintester/TesterStore';
import Nav from './Pages/Braintester/Nav';

function App() {
  return (
    
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Brainlist />} />
        <Route path="/details/:id" element={<GameDetails2 />} />
        <Route path="/details2/:id" element={<GameDetailsBrain2 />} />
        <Route path="/Gamestotest" element={<Gamestotest />} />
        <Route path="/TesterStore" element={<TesterStore />} />
      



      </Routes>
    </Router>
  );
}


export default App;
