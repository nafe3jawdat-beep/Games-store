import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GameInfo from "../components/GamesDetails/GameInfo";
import Buttons from "../components/GamesDetails/Buttons";
import BrainNotes from "../components/GamesDetails/BrainNotes";
import { BaseUrl } from "../Pages/BaseUrl";

export default function GamesDetails2() {
  const { id } = useParams();
  const location = useLocation();
  const { status, tester_id } = location.state || {};
  const [game, setGames] = useState(null);

  useEffect(() => {
    if (!id || !status) return;
    const url =
      status === "testing" && tester_id
        ? `${BaseUrl}/api/braintester/games/${id}/${status}?tester_id=${tester_id}`
        : `${BaseUrl}/api/braintester/games/${id}/${status}`;

    fetch(url)
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
  }, [id, status, tester_id]);

  if (!game)
    return (
      <div className="text-center text-red-500 py-10 text-xl">
        Game not found
      </div>
    );

  const lastVersion =
    game.versions && game.versions.length > 0
      ? game.versions[game.versions.length - 1]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col">
      {" "}
      <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src={`${BaseUrl}/${game.image}`}
          alt={game.title}
          onError={(e) => (e.currentTarget.src = "/src/imges/placeholder.jpg")}
          className="w-full h-full object-cover opacity-70 scale-105 slowZoom"
        />{" "}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a88] to-transparent"></div>{" "}
      </div>
      ```
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <GameInfo game={game} />
        </div>

        <div className="w-full flex flex-col gap-6">
          {lastVersion?.triage_record && <BrainNotes version={lastVersion} />}

          <div className="mt-6 flex flex-col sm:flex-row sm:gap-4 gap-3 justify-center">
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
