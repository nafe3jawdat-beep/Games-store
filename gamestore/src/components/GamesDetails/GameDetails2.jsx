import React, { useState, useEffect } from "react";
import {useParams,useLocation } from "react-router-dom";
// import React from "react";
import GameInfo from "./GameInfo";
import BrainNotes from "./BrainNotes";
import SelectTester from "../../Pages/Braintester/SelectTester";
import { BaseUrl } from "../../Pages/BaseUrl";

export default function GamesDetails2() {
  const { id } = useParams();
  const location = useLocation();
  const { status, tester_id } = location.state || {};
  const [game, setGames] = useState(null);

  const { state } = useLocation();
  const from = state?.from;  

useEffect(() => {
  if (!id || !status) return;

  const url =
    status === "testing" && tester_id
      ? `${BaseUrl}/api/tester/games/${id}/${status}?tester_id=${tester_id}`
      : `${BaseUrl}/api/player/games/${id}/${status}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log("API DATA =>", data);       
      // console.log("DATA.GAME =>", data.game);
      setGames(data.game || null);
      
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setGames(false);
    });

}, [id, status, tester_id]);
if (!game) return <div className="text-white text-center py-10">Loading...</div>;


  if (game === false)
    return (
      <div className="text-white text-center py-10">
        لم يتم العثور على اللعبة
      </div>
    );

  const lastVersion =
    game?.versions?.length > 0 ? game.versions[game.versions.length - 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col">
      <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src={`${BaseUrl}/images/games/${game.image}`}
          alt={game.title}
          onError={(e) => (e.currentTarget.src = "/src/imges/placeholder.jpg")}
          className="w-full h-full object-cover opacity-70 scale-105 slowZoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a88] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-8">
          <GameInfo game={game} from={from} />
        </div>
      </div>

      <div className="w-full">
        {game.status === "testing" && lastVersion?.triage_record && (
          <BrainNotes versions={lastVersion} />
        )}

        {game.status === "triage_pending" && (
          <SelectTester gameId={game?.game_versions?.[0]?.triage_record?.id} />
        )}
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
