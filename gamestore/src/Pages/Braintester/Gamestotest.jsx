import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/CARDS/Gameslist";
import { BaseUrl } from "../BaseUrl";
const Gamestotest = () => {
  const [games, setGames] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

useEffect(() => {
  if (!token) return;

fetch(`${BaseUrl}/api/games/triage_pending/`, { 
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}` 
  }
})
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("البيانات القادمة من السيرفر:", data); 
      
      setGames(data.games || data); 
    })
    .catch((err) => console.error("Error fetching games:", err));
    
}, [token]); 
  const handleDetails = (game) => {
    navigate(`/details/${game.id}`, {
      state: {
        status: game.status,
      },
    });
  };

  return (
    <div className="p-5">
      {<Gamelist games={games} onDetails={handleDetails} />}
    </div>
  );
};

export default Gamestotest;
