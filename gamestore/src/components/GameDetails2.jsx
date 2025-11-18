import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Buttons from "./GamesDetails/Buttons";
import GameInfo from "./GamesDetails/GameInfo";

export default function GamesDetails2() {
  const { id } = useParams();
  const [game, setGames] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://10.31.42.133:8000/api/braintester/games/${id}/uploaded`)
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
  }, [id]);

  if (game === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <p>🔄 Loading Game Details...</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0f172a] flex flex-col md:flex-row overflow-hidden m-0 p-0">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Games
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
      >
        <motion.img
          src={`http://10.31.42.133:8000/images/${game.image}`}
          alt={game?.title || "No title"}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-[#1e293b] text-white flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 md:py-0 relative"
      >
        <div className="max-w-xl space-y-8">
          <GameInfo game={game} />

          <div>
            <Buttons game={game} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
