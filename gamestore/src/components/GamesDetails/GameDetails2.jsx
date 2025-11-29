import React from "react";
// import { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
import GameInfo from "./GameInfo";
import Buttons from "./Buttons";
import BrainNotes from "./BrainNotes";
import SelectTester from "../../Pages/Braintester/SelectTester";
import { BaseUrl } from "../../Pages/BaseUrl";

export default function GamesDetails2() {
  // const { id } = useParams();
  // const location = useLocation();
  // const { status, tester_id } = location.state || {};
  // const [game, setGames] = useState(null);

  // useEffect(() => {
  //   if (!id || !status) return;

  //   const url =
  //     status === "testing" && tester_id
  //       ? `${BaseUrl}/api/braintester/games/${id}/${status}?tester_id=${tester_id}`
  //       : `${BaseUrl}/api/braintester/games/${id}/${status}`;

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data && data.game) {
  //         setGames(data.game);
  //       } else {
  //         setGames(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setGames(false);
  //     });
  // }, [id, status, tester_id]);
const game = {
  id: 2,
  title: "Call of Duty Mobile",
  image: "games/cod.jpg",
  status: "triage_pending",
  category: { name: "Action" },

  versions: [
    {
      id: 4,
      version_string: "2.0.0",
      file_path: "games/cod/setup_v2.0.0.exe",

      triage_record: {
        id: 8,
        brain_tester_id: 5,
        is_game: false,
        category_valid: true,
        notes: "",
        triage_status: "pending",
      },
    },
        {
      id: 5,
      version_string: "2.0.0",
      file_path: "games/cod/setup_v2.0.0.exe",

      triage_record: {
        id: 9,
        brain_tester_id: 5,
        is_game: false,
        category_valid: true,
        notes: "",
        triage_status: "pending",
      },
    },
  ],
};

  if (!game) {
    return (
      <div className="text-center text-fuchsia-600 py-10 text-xl">
        Game not found{" "}
      </div>
    );
  }

  const lastVersion =
    game.versions && game.versions.length > 0
      ? game.versions[game.versions.length - 1]
      : null;

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
        <div className="md:col-span-3">
          <GameInfo game={game} />
        </div>
        </div>

  <div className="w-full flex sm:flex-row flex-col gap-6">
  {lastVersion?.triage_record && <BrainNotes versions={lastVersion} />}
  {game.status === "triage_pending" && <SelectTester gameId={game.id} />}
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
