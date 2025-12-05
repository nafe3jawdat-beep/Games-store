import React, { useEffect, useState } from "react";
// import React from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/CARDS/Gameslist";
import {BaseUrl} from "../BaseUrl";

const Games = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BaseUrl}/api/player/games/published`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
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
<Gamelist games={games} onDetails={(game) => handleDetails(game, "store")} />
    </div>
  );
};

export default Games;
