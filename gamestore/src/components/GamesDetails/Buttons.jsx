import React from "react";
import { useNavigate } from "react-router-dom";
import { Sendtotest, Reject, Accept,Sendtolibrare } from "./ActionButtons";

function Buttons({ game }) {
  const navigate = useNavigate();

  const handlSendtotest = async () => {
    await Sendtotest(game.id);
    navigate("/Gamestotest");
  };

  const handleReject = async () => {
    await Reject(game.id);
    navigate(`/ComparePage/${game.id}`, { state: { status: "reject" } });
  };
const SendToLibrary = async () => {
  await Sendtolibrare(game.id);
  navigate("/MyLibrary");
};

  const handleAccept = async () => {
    await Accept(game.id);
    // navigate(`/ComparePage/${game.id}`, {
    //   state: { status: "accept" }
    // });
  };
  // console.log(game['game_versions']['triage_record']['id'])
  // const lastVersion =
  //   game.versions && game.versions.length > 0
  //     ? game.versions[game.versions.length - 1]
  //     : null;
  const buttonClass =
    "w-full  py-3 rounded-xl font-semibold text-white " +
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
          onClick={handlSendtotest}
          className={`${buttonClass} bg-green-500 hover:bg-green-600`}
        >
          Send to test
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
           navigate(`/NotesPage/${game.game_versions?.[0]?.triage_record?.id}`)

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
      <div className="grid grid-cols-2 gap-6 mt-6 max-w-xl mx-auto ">
        <button
          onClick={handleReject}
          className={`${buttonClass} bg-red-500 hover:bg-red-600`}
        >
          Reject
        </button>

        <button
          onClick={handlSendtotest}
          className={`${buttonClass} bg-purple-600-500 hover:bg-purple-600`}
        >
          Download
        </button>
        <button
          onClick={() =>
navigate(`/TesterNotesPage/${game.id}`, {
  state: {
    game: game
  }
})   }
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
  }else if (game.status === "published") {
    return(
            <div className="grid grid-cols-1 gap-6 mt-6 max-w-full mx-auto ">

   <button
  onClick={SendToLibrary}
  className={`${buttonClass} bg-green-600 hover:bg-green-300`}
>
  Download
</button>
</div>
    );

  }

  
}

export default Buttons;
