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

  // Container مشترك لكل الأزرار
  const buttonClass =
    "w-full md:w-auto py-3 px-6 rounded-xl text-white font-semibold transition-colors duration-300";

  if (game.status === "uploaded") {
    return (
      <div className="flex flex-col md:flex-row gap-4 mt-6 max-w-md mx-auto">
        <button
          onClick={handleReject}
          className={`${buttonClass} bg-red-500 hover:bg-red-600`}
        >
          Reject
        </button>

        <button
          onClick={handleSendToStore}
          className={`${buttonClass} bg-green-500 hover:bg-green-600`}
        >
          Send to Store
        </button>
      </div>
    );
  } else if (game.game.status === "triage") {
    const buttonClass =
      "w-full md:w-40 py-3 rounded-xl text-white font-semibold transition-all duration-300";

    // JSX
    return (
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-6 max-w-xl mx-auto justify-center">
        <button
          onClick={() => console.log("Game is in testing")}
          className={`${buttonClass} bg-blue-900 hover:bg-green-400`}
        >
          Download
        </button>

        <button
          onClick={() => navigate("/NotesPage")}
          className={`${buttonClass} bg-cyan-500 hover:bg-cyan-600`}
        >
          Add Notes
        </button>

        <button
          onClick={handleReject}
          className={`${buttonClass} bg-red-500 hover:bg-red-600`}
        >
          Reject
        </button>

        <button
          onClick={handleSendToStore}
          className={`${buttonClass} bg-emerald-400 hover:bg-emerald-600`}
        >
          Accept
        </button>
      </div>
    );
  } else if (game.status === "testing") {
    return (
      <div className="flex flex-col md:flex-row gap-4 mt-6 max-w-md mx-auto">
        <button
          onClick={handleReject}
          className={`${buttonClass} bg-red-500 hover:bg-red-600`}
        >
          Reject
        </button>

        <button
          onClick={handleSendToStore}
          className={`${buttonClass} bg-green-500 hover:bg-green-600`}
        >
          Download
        </button>
        <button
          onClick={() => navigate("/NotesPage")}
          className={`${buttonClass} bg-cyan-500 hover:bg-cyan-600`}
        >
          Add Notes
        </button>
      </div>
    );
  }
}

export default Buttons;
