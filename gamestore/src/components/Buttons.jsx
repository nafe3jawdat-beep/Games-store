import React from "react";
import { useNavigate } from "react-router-dom";

function Buttons({ game }) {
  const navigate = useNavigate();

  const handleSendToStore = async () => {
    try {
      await fetch(`http://10.31.42.133:8000/api/braintester/games/${game.id}/chnagestatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      navigate("/Gamestotest");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    try {
      await fetch(`http://10.31.42.133:8000/api/braintester/games/${game.id}/chnagestatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (game.status === "uploaded") {
    return (
      <div className="space-y-3 mt-6">
        <button
          onClick={handleReject}
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl"
        >
          Reject
        </button>

        <button
          onClick={handleSendToStore}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl"
        >
          Send to Store
        </button>
      </div>
    );
  } else if (game.status === "testing") {
    return (
      <div className="space-y-3 mt-6">
        <button
          onClick={() => console.log("Game is in testing")}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
        >
          Testing Action
        </button>
      </div>
    );
  } else {
    return null; // لأي حالة أخرى
  }
}

export default Buttons;
