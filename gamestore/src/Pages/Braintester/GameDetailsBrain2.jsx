import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function GamesDetails2() {
  const { id } = useParams();
  const [game, setGames] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://10.31.42.133:8000/api/braintester/games/${id}/uploaded`)
      .then(res => res.json())
      .then(data => {
        if (data && data.game) {
          setGames(data.game);
        } else {
          setGames(false); 
        }
      })
      .catch(err => {
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
  
  if (game === false) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <p>❌ Game not found or an error occurred</p>
      </div>
    );
  }

const handlesendtostore = async (gameId) => {
  try {
    const res = await fetch(
      `http://10.31.42.133:8000/api/braintester/games/${gameId}/chnagestatus`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error("Network response was not ok");

    await res.json();

    navigate(`/Gamestotest/${gameId}`);

  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0f172a] flex flex-col md:flex-row overflow-hidden m-0 p-0">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Games
      </button>

      {/* IMAGE SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
      >
        <motion.img
            // Accessing game.image directly is now correct
            src={`http://10.31.42.133:8000/images/${game.image}`}
            alt={game?.title || "No title"}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* DETAILS SECTION */}
      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 h-1/2 md:h-full bg-[#1e293b] text-white flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 md:py-0 relative"
      >
        <div className="max-w-xl space-y-8">
          {/* Title */}
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 leading-tight inline-block">
              {game.title}
            </h1>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-3 w-[80%] h-[3px] bg-cyan-500/80 rounded-full"></div>
          </div>


          <p className="text-gray-300 leading-relaxed text-lg">
            {game.long_description}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-300 pt-2">
            <div>
              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide">
                Category
              </p>
              {game.category && <p className="text-lg">{game.category.name}</p>}
            </div>
            
            <div>
              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide">
                Price
              </p>
              {/* <p className="text-lg">${game.price}</p> */} 
            </div>
            
            <div>
              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide">
                Platform
              </p>
              {game.versions?.[0]?.platform && <p className="text-lg">{game.versions[0].platform.name}</p>}
            </div>
          </div>
          
          {/* Download Button */}
          <div className="pt-6">
            <motion.a
              // Use the file_path from the first version if gameurl is not present
              href={`http://10.31.42.133:8000/files/${game.versions?.[0]?.file_path}`} 
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl shadow-md transition-all"
            >
              ⬇️ Download Game
            </motion.a>
            
            {/* "Send to Store" button now calls the handlesend function */}
            <button
              onClick={() => handlesendtostore(game.id)}
              className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition-colors"
            >
              ✅ Send to Store
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}