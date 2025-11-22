import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import React from "react";
import GameInfo from "../components/GamesDetails/GameInfo";
import Buttons from "../components/GamesDetails/Buttons";
import BrainNotes from "./GamesDetails/BrainNotes";

export default function GamesDetails2() {
  const { id } = useParams();
  const [game, setGames] = useState(null);
  useEffect(() => {
fetch(`http://10.52.19.133:8000/api/braintester/games/${id}/uploaded`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.game) {
          setGames(data.game);
        } else {
          setGames(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setGames(false);
      });
  }, [id]);


  if (!game)
    return (
      <div className="text-center text-red-500 py-10 text-xl">
        Game not found
      </div>
    );

  return (
   <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col">
  {/* صورة الغلاف */}
  <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
    <img
      src={game.image}
      alt={game.title}
      onError={(e) => (e.currentTarget.src = "/src/imges/placeholder.jpg")}
      className="w-full h-full object-cover opacity-70 scale-105 slowZoom"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a88] to-transparent"></div>
  </div>

  <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="md:col-span-2">
      <GameInfo game={game} />
    </div>
    <div className="w-full ">
      <BrainNotes game={game} />
  <div className="mt-6 flex flex-col md:flex-row gap-4">
    <Buttons game={game} />
  </div>
    </div>
  </div>



  <style>{`
    @keyframes slowzoom {
      0% { transform: scale(1.05) translateY(0); }
      50% { transform: scale(1.1) translateY(-5px); }
      100% { transform: scale(1.05) translateY(0); }
    }
    .slowZoom {
      animation: slowzoom 15s ease-in-out infinite alternate;
    }
  `}</style>
</div>

  );
}
