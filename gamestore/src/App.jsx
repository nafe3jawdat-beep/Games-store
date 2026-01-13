import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import GameDetails2 from "./components/GamesDetails/GameDetails2";
import Gamestotest from "./Pages/Braintester/Gamestotest";
import Brainlist from "./Pages/Braintester/Brainlist";
import TesterStore from "./Pages/Braintester/TesterStore";
import NotesPage from "./Pages/Braintester/NotesPage";
import SelectTester from "./Pages/Braintester/SelectTester";
import BTesterList from "./Pages/Braintester/BTesterList";
import AddGame from "./Pages/Developer/AddGame";
import MyGames from "./Pages/Developer/MyGames";
import NotificationsPage from "./Pages/Developer/NotificationsPage";
import TesterNotesPage from "./Pages/Tester/TesterNotesPage";
import TesterList from "./Pages/Tester/TesterList";
import SideBar from "./components/SideBar";
import BrainNotes from "./components/GamesDetails/BrainNotes";
import Games from "./Pages/Player/Games";
import SelectCoupon from "./Pages/Player/SelectCoupon";
import MyLibrary from "./Pages/Player/MyLibrary";
import Coupon from "./Pages/Player/Coupon";
import MyCoupon from "./Pages/Player/MyCoupon";
import Login from "./Pages/Login/Login";
import Payment from  "./Pages/Player/Payment" ;
import Register from "./Pages/Login/Register";
import Edit from "./Pages/Admin/Edit";
import Brain_List from "./Pages/Admin/Brain_List";
import Player_List from "./Pages/Admin/Player_List";
import Tester_List from "./Pages/Admin/Tester_List";
import AdminCoupons from "./Pages/Admin/AdminCoupons";

function AppWrapper() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/Register";
  const isDetailsPage = location.pathname.startsWith("/details");

  const showSidebar = !(isLoginPage || isRegisterPage || isDetailsPage);

  return (
    <>
      {showSidebar && <SideBar open={open} setOpen={setOpen} />}

      <div
        className={`min-h-screen bg-[#0f172a] text-white transition-all duration-300 ${
          showSidebar && open ? "ml-64" : "ml-0"
        }`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
            <Route path="/AddGame" element={<AddGame />} />
            <Route path="/MyGames" element={<MyGames />} />
            <Route path="/MyLibrary" element={<MyLibrary />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/NotificationsPage" element={<NotificationsPage />} />
            <Route path="/Edit" element={<Edit />} /> 
            <Route path="/Edit/:id" element={<Edit />} />{" "}
            <Route path="/Brain_List" element={<Brain_List />} />
            <Route path="/Player_List" element={<Player_List />} />
            <Route path="/SelectCoupon" element={<SelectCoupon />} />
            <Route path="/Tester_List" element={<Tester_List />} />
            <Route path="/AdminCoupons" element={<AdminCoupons />} />
            <Route path="/Coupon" element={<Coupon />} />
            <Route path="/MyCoupon" element={<MyCoupon />} />
            <Route path="/BrainNotes" element={<BrainNotes />} />
            <Route path="/Games" element={<Games />} />
            {/* <Route path="/TesterNotesPage" element={<TesterNotesPage />} /> */}
            <Route path="/Brainlist" element={<Brainlist />} />
            <Route path="/NotesPage/:id" element={<NotesPage />} />
            <Route path="/TesterNotesPage/:id" element={<TesterNotesPage />} />
            <Route path="/SelectTester" element={<SelectTester />} />
            <Route path="/details/:id" element={<GameDetails2 />} />
            <Route path="/Gamestotest" element={<Gamestotest />} />
            <Route path="/TesterStore" element={<TesterStore />} />
            <Route path="/BTesterList/:id" element={<BTesterList />} />
            <Route path="/TesterList" element={<TesterList />} />
            
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
