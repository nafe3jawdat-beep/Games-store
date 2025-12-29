import React, { useState, useEffect } from "react";
import { BaseUrl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/CARDS/Gameslist";
function MyGames() {
  const [games, setgames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchgame = async () => {
      try {
        const res = await fetch(
          `${BaseUrl}/api/developer/games/published?developer_id=3`
        );
        const data = await res.json();
        setgames(data.game);

        console.log("respos :", res.status);
        const text = await res.text();
        console.log("Respones :", text);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchgame();
  }, []);

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
}

export default MyGames;
