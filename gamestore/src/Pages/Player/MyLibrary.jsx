import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/CARDS/Gameslist";
import{BaseUrl} from "../BaseUrl";
function MyLibrary (){
  const [games, setGames] = useState([]);
  const navigate = useNavigate();



useEffect(() => {
  const playerId = 6;

  fetch(`${BaseUrl}/api/player/library/games?player_id=${playerId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => setGames(data.games))
    .catch(err => console.error("Error fetching games:", err));
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
<Gamelist games={games} onDetails={(game) => handleDetails(game, "library")} />
    </div>
  );

};
export default MyLibrary