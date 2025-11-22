import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/Gameslist";
import {BaseUrl} from "../BaseUrl";

const Brainlist = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BaseUrl}/api/braintester/games/uploaded`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
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

export default Brainlist;
