import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import GameDetails2 from "./Pages/Braintester/GameDetails2";
import Gamestotest from "./Pages/Braintester/Gamestotest";
import Brainlist from './Pages/Braintester/Brainlist';
import TesterStore from './Pages/Braintester/TesterStore';
import NotesPage from './Pages/Braintester/NotesPage';
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Brainlist />} />
        <Route path="/NotesPage" element={<NotesPage />} />
        <Route path="/details/:id" element={<GameDetails2 />} />
        <Route path="/Gamestotest" element={<Gamestotest />} />
        <Route path="/TesterStore " element={<TesterStore />} />
      

      </Routes>
    </Router>
  );
}


export default App;
