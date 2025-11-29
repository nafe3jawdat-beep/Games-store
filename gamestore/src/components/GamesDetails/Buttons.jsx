import React from "react";
import { useNavigate } from "react-router-dom";
import { SendToStore, Reject, Accept } from "./ActionButtons";

function Buttons({ game }) {
  const navigate = useNavigate();

  const handleSendToStore = async () => {
    await SendToStore(game.id);
    navigate("/Gamestotest");
  };

  const handleReject = async () => {
    await Reject(game.id);
    navigate(`/ComparePage/${game.id}`, { state: { status: "reject" } });
  };

  const handleAccept = async () => {
    await Accept(game.id);
    // navigate(`/ComparePage/${game.id}`, {
    //   state: { status: "accept" }
    // });
  };

  const lastVersion =
    game.versions && game.versions.length > 0
      ? game.versions[game.versions.length - 1]
      : null;

  const buttonClass =
    "w-full md:w-40 py-3 rounded-xl font-semibold text-white " +
    "transition-all duration-300 hover:scale-105 hover:shadow-lg";

  if (game.status === "uploaded") {
    return (
      <div className="flex flex-wrap gap-4 mt-6 max-w-md mx-auto justify-start">
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
  } else if (game.status === "triage_pending") {
    return (
      <div className="flex flex-wrap gap-4 mt-6 max-w-xl mx-auto justify-center">
        <button
          onClick={() => console.log("Game is in testing")}
          className={`${buttonClass} bg-blue-900 hover:bg-green-400`}
        >
          Download
        </button>

        <button
          onClick={() =>
            navigate(`/NotesPage/${lastVersion?.triage_record?.id}`)
          }
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
      </div>
    );
  } else if (game.status === "testing") {
    return (
      <div className="flex flex-wrap gap-4 mt-6 max-w-md mx-auto justify-center">
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
          onClick={() =>
            navigate(`/TesterNotesPage/${lastVersion?.Tester_records?.id}`)
          }
          className={`${buttonClass} bg-cyan-500 hover:bg-cyan-600`}
        >
          Add Notes
        </button>
        <button
          onClick={handleAccept}
          className={`${buttonClass} bg-emerald-400 hover:bg-emerald-600`}
        >
          Accept
        </button>
      </div>
    );
  }

  return null;
}

export default Buttons;
