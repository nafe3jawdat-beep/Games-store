import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/CARDS/Gameslist";
import {BaseUrl} from "../BaseUrl";

const TesterList = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`${BaseUrl}/api/games/testing`, {
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
      setGames(data.games || data); 
    })
    .catch((err) => console.error("Error fetching games:", err));
    
}, []);

const handleDetails = (game) => {
  navigate(`/details/${game.id}`, {
    state: {
      status: game.status, 
    }
  });
};


  return (
    <div className="p-5">
      {<Gamelist games={games} onDetails={handleDetails} />}
    </div>
  );
};

export default TesterList;
