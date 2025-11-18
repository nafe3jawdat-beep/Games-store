import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/Gameslist";

const Brainlist = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://10.31.42.133:8000/api/braintester/games/uploaded")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  const handleDetails = (game) => {
    console.log(game);
    navigate(`/details/${game.id}`);
  };

  return (
    <div className="p-5">
      {<Gamelist games={games} onDetails={handleDetails} />}
    </div>
  );
};

export default Brainlist;
