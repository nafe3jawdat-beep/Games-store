import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import GameInfo from "./GameInfo";
import BrainNotes from "./BrainNotes";
import SelectTester from "../../Pages/Braintester/SelectTester";
import SelectCoupon from "../../Pages/Player/SelectCoupon";
import { BaseUrl } from "../../Pages/BaseUrl";

export default function GamesDetails2() {
  const { id } = useParams();
  const location = useLocation();

  const { status, tester_id, from } = location.state || {};

  const [game, setGames] = useState(null);

  const [selectedCouponId, setSelectedCouponId] = useState(null);
  useEffect(() => {
    if (!id || !status) return;

    const token = localStorage.getItem("token");

    const url =
      status === "testing" && tester_id
        ? `${BaseUrl}/api/games/${id}/braintester/${status}?tester_id=${tester_id}`
        : `${BaseUrl}/api/games/${id}/${status}`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setGames(data.game || data);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setGames(false);
      });
  }, [id, status, tester_id]);

  const handleCheck = (newTasks) => {
    setGames((prevGame) => ({
      ...prevGame,
      tasks: newTasks,
    }));
  };

  if (game === null) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (game === false) {
    return (
      <div className="text-white text-center py-10">
        لم يتم العثور على اللعبة أو حدث خطأ في الصلاحيات (403)
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col">
      <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src={game.image_url}
          alt={game.title}
          className="w-full h-full object-center slowZoom opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a88] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <GameInfo
          game={game}
          from={from}
          onTasksUpdate={handleCheck}
          couponId={selectedCouponId}
        />
      </div>

      {/* <div className="w-full px-4 flex flex-col items-end gap-6 pb-20"> */}
        {status === "testing" && (
          <BrainNotes versions={game?.game_versions?.[0]?.triage_record} />
        )}

        {status === "triage_pending" && (
          <SelectTester gameId={game?.game_versions?.[0]?.triage_record?.id} />
        )}

        {from === "store" && (
          <div className="max-w-md w-full items-center mx-auto px-4 mb-10">
            <SelectCoupon
              onSelect={(couponId) => setSelectedCouponId(couponId)
                
              }
            />
          </div>
        )}
      {/* </div> */}

      <style>{`
        @keyframes slowzoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .slowZoom {
          animation: slowzoom 15s ease-in-out infinite alternate;
          transform-origin: center center; 
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
