import { useState } from "react";
import React from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import GameCard from "./Gamecard.jsx";

const Gamelist = ({ games, onDetails }) => {
  const [titleQuery, setTitleQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  const safeGames = Array.isArray(games) ? games : [];

  const filteredGames = safeGames.filter((game) => {
    const title = game.title?.toLowerCase() ?? "";
    const category = game.category?.name ?? "";

    return (
      title.includes(titleQuery.toLowerCase()) &&
      (!categoryQuery || category === categoryQuery)
    );
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed w-screen h-screen bg-[#0f172a] text-white flex flex-col md:flex-row overflow-hidden my-10  ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full bg-[#1e293b] flex flex-col md:flex-row justify-center items-center p-4 shadow-lg z-50 "
      >
        <div className="flex flex-row justify-center items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-[200px] pl-10 pr-3 py-2 rounded-lg bg-[#334155] text-sm text-white
        border border-transparent focus:ring-2 focus:ring-cyan-400
        hover:border-cyan-400 transition-all duration-300"
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
            />
          </div>

          <select
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            className="w-[200px] p-2 rounded-lg bg-[#334155] text-sm text-white
         border border-transparent hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          >
            <option value="">All types</option>
            <option value="Action">Action</option>
            <option value="Sports">Sports</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>
      </motion.div>

      <main className="flex-1 h-full overflow-y-auto px-4 md:px-8 py-6 md:py-8">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-end ml-20">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 20 }}
                layout
                // className="bg-[#1e293b] w-[350px] p-2 rounded-xl shadow-md border border-transparent
                //     hover:border-blue-400/60 hover:shadow-blue-900/40
                //     hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <GameCard game={game} onDetails={onDetails} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};
export default Gamelist;
