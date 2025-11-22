import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import GameDetails2 from "./components/GameDetails2"
import Gamestotest from "./Pages/Braintester/Gamestotest";
import Brainlist from './Pages/Braintester/Brainlist';
import TesterStore from './Pages/Braintester/TesterStore';
import NotesPage from './Pages/Braintester/NotesPage';
import SelectTester from './Pages/Braintester/SelectTester';
import TesterList from './Pages/Braintester/TesterList';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/Brainlist" element={<Brainlist />} />
        <Route path="/NotesPage" element={<NotesPage />} />
        <Route path="/SelectTester" element={<SelectTester />} />
        <Route path="/NotesPage" element={<NotesPage />} />
        <Route path="/details/:id" element={<GameDetails2 />} />
        <Route path="/Gamestotest" element={<Gamestotest />} />
        <Route path="/" element={<TesterStore />} />
        <Route path="/TesterList/:id" element={<TesterList />} />

      

      </Routes>
    </Router>
  );
}


export default App;
