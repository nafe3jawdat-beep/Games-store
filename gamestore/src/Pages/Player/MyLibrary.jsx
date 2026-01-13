import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/CARDS/Gameslist";
import { BaseUrl } from "../BaseUrl";
function MyLibrary() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`${BaseUrl}/api/library/games`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  })
    .then((res) => {
      console.log("Status Code:", res.status);
      
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched Data:", data); 
      setGames(data.games || data); 
    })
    .catch((err) => console.error("Error fetching games:", err));
    
}, []);

  const handleDetails = (game, from) => {
    navigate(`/details/${game.id}`, {
      state: {
        from: from,
        status: game.status,
      },
    });
  };

  return (
    <div className="p-5">
      <Gamelist
      games={games.map((game) => {
    const {_price, ...rest } = game; 
    return rest; 
})}
        onDetails={(game) => handleDetails(game, "library")}
      />
    </div>
  );
}
export default MyLibrary;
