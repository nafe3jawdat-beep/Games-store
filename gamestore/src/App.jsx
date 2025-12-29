import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import GameDetails2 from "./components/GamesDetails/GameDetails2";
import Gamestotest from "./Pages/Braintester/Gamestotest";
import Brainlist from "./Pages/Braintester/Brainlist";
import TesterStore from "./Pages/Braintester/TesterStore";
import NotesPage from "./Pages/Braintester/NotesPage";
import SelectTester from "./Pages/Braintester/SelectTester";
import TesterList from "./Pages/Braintester/TesterList";
import AddGame from "./Pages/Developer/AddGame";
import TesterNotesPage from "./Pages/Tester/TesterNotesPage";
import SideBar from "./components/SideBar";
import Games from "./Pages/Player/Games";
import MyLibrary from "./Pages/Player/MyLibrary";
import Login from "./Pages/Login/Login";
function AppWrapper() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const showSidebar = !location.pathname.includes("/details");

  return (
    <>
      {showSidebar && <SideBar open={open} setOpen={setOpen} />}

      <div
        className={`min-h-screen bg-[#0f172a] text-white transition-all duration-300 ${
          showSidebar && open ? "ml-64" : "ml-0"
        }`}
      >
        <Routes>
          <Route path="/AddGame" element={<AddGame />} />
          <Route path="/MyLibrary" element={<MyLibrary />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/" element={<Login />} />
          <Route path="/TesterNotesPage" element={<TesterNotesPage />} />
          <Route path="/Brainlist" element={<Brainlist />} />
          <Route path="/NotesPage/:id" element={<NotesPage />} />
          <Route path="/TesterNotesPage/:id" element={<TesterNotesPage />} />
          <Route path="/SelectTester" element={<SelectTester />} />
          <Route path="/details/:id" element={<GameDetails2 />} />
          <Route path="/Gamestotest" element={<Gamestotest />} />
          <Route path="/TesterStore" element={<TesterStore />} />
          <Route path="/TesterList/:id" element={<TesterList />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
