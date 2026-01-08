import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sendtotest, Reject, Accept,  Check } from "./ActionButtons";
import { FaGamepad } from "react-icons/fa"; 

function Buttons({ game, from,onTasksUpdate,couponId }) {
  const navigate = useNavigate();
  const triage_record_id= game?.game_versions?.[0]?.triage_record?.id

  const [loading, setLoading] = useState({
    sendToTest: false,
    reject: false,
    accept: false,
    sendToLibrary: false,
    check: false,
  });
const userData = JSON.parse(localStorage.getItem("user") || "{}");
const currentRole = userData?.roles?.[0];
  console.log("Current Role:", currentRole);

  const handlSendtotest = async () => {
    setLoading(prev => ({ ...prev, sendToTest: true }));
    await Sendtotest(game.id);
    navigate("/Gamestotest");
    setLoading(prev => ({ ...prev, sendToTest: false }));
  };

  const handleReject = async () => {
    setLoading(prev => ({ ...prev, reject: true }));
    await Reject(triage_record_id);
    setLoading(prev => ({ ...prev, reject: false }));
  };

const SendToLibrary = () => {
    
    navigate("/SimplePayment", { 
      state: { 
        gameId: game.id, 
        price: game.price, 
        couponId: couponId,
        gameName: game.name 
      } 
    });
  };

  const Checkd = async () => {
    setLoading(prev => ({ ...prev, check: true }));
const newTasks = await Check(game.id);  
    
    if (newTasks) {
      onTasksUpdate(newTasks); 
    }    setLoading(prev => ({ ...prev, check: false }));
  };

  const handleAccept = async () => {
    setLoading(prev => ({ ...prev, accept: true }));
    await Accept(game.id);
    setLoading(prev => ({ ...prev, accept: false }));
  };

  const buttonClass =
    "w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex justify-center items-center gap-2";

  const renderButtonContent = (label, isLoading) => (
    <>
      {isLoading && <FaGamepad className="animate-spin" />}
      {label}
    </>
  );

  if (game.status === "uploaded") {
    return (
      <div className="flex flex-wrap gap-4 mt-6 max-w-md mx-auto justify-start">
        <button
          onClick={handleReject}
          className={`${buttonClass} bg-red-500 hover:bg-red-600`}
          disabled={loading.reject || loading.sendToTest}
        >
          {renderButtonContent("Reject", loading.reject)}
        </button>

        <button
          onClick={handlSendtotest}
          className={`${buttonClass} bg-green-500 hover:bg-green-600`}
          disabled={loading.reject || loading.sendToTest}
        >
          {renderButtonContent("Send to test", loading.sendToTest)}
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
          disabled={loading.reject}
        >
          {renderButtonContent("Reject", loading.reject)}
        </button>
      </div>
    );
  } else if (game.status === "testing") {
  if (currentRole === "brain_tester") {
    return null; 
  }
  return (
    <div className="grid grid-cols-2 gap-6 mt-6 max-w-xl mx-auto">
      <button 
        onClick={handleReject} 
        className={`${buttonClass} bg-red-500 hover:bg-red-600`}
        disabled={loading.reject || loading.accept}
      >
        {renderButtonContent("Reject", loading.reject)}
      </button>

      <button 
        onClick={() => console.log("Downloading...")} 
        className={`${buttonClass} bg-purple-600 hover:bg-purple-700`}
      >
        Download
      </button>

      <button 
        onClick={() => navigate(`/TesterNotesPage/${game.id}`, { state: { game: game } })} 
        className={`${buttonClass} bg-cyan-500 hover:bg-cyan-600`}
      >
        Add Notes
      </button>

      <button 
        onClick={handleAccept} 
        className={`${buttonClass} bg-emerald-400 hover:bg-emerald-600`}
        disabled={loading.accept || loading.reject}
      >
        {renderButtonContent("Accept", loading.accept)}
      </button>
    </div>
  );
}
  
  else if (game.status === "published") {
    return (
      <div className="grid grid-cols-1 gap-6 mt-6 max-w-full mx-auto ">
        {from === "store" && (
       <button
            onClick={SendToLibrary} 
            className={`${buttonClass} bg-green-600 hover:bg-green-700`}
          >
             Buy & Download
          </button>
        )}

        {from === "library" && (
          <button
            onClick={Checkd}
            className={`${buttonClass} bg-blue-600 hover:bg-blue-400`}
            disabled={loading.check}
          >
            {renderButtonContent("Check", loading.check)}
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default Buttons;
