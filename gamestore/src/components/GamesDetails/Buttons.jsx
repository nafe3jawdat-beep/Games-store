import React from "react";
import { useNavigate } from "react-router-dom";
import { SendToStore, Reject } from "./ActionButtons";

function Buttons({ game }) {
  const navigate = useNavigate();

  const handleSendToStore = async () => {
    await SendToStore(game.id);
    navigate("/Gamestotest");
  };

  const handleReject = async () => {
    await Reject(game.id);
    navigate(-1);
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
        <div className="space-y-3 mt-6">
          <button
            onClick={() => navigate("/NotesPage")}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
          >
            ADD NOTES
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Buttons;
