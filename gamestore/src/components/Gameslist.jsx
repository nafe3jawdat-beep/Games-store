import { useState } from "react";
import React from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import GameCard from "./Gamecard.jsx";

const Gamelist = ({ games, onDetails }) => {
  const [titleQuery, setTitleQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  console.log(games );
  
const filteredGames = (Array.isArray(games) ? games : []).filter((game) => {
  const title = game.title?.toLowerCase() || "";
  const category = game.category?.name || "";
  return title.includes(titleQuery.toLowerCase()) &&
         (categoryQuery === "" || category === categoryQuery);
});

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0f172a] text-white flex flex-col md:flex-row overflow-hidden m-0 p-0">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-64 bg-[#1e293b] flex md:flex-col items-center md:items-start justify-between md:justify-start p-4 md:p-6 border-b md:border-b-0 md:border-r border-blue-900/30 shadow-lg m-0"
      >
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-cyan-400 text-center md:text-left">
            CLASSIFICATIONS
          </h2>

          {/* Search */}
          <div className="relative mb-3 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#334155] text-sm text-white
                border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400
                hover:border-cyan-400 transition-all duration-300"
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            className="w-full mb-5 p-2 rounded-lg bg-[#334155] text-sm text-white
              border border-transparent hover:border-blue-400
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition-all duration-300"
          >
            <option value="">All types</option>
            <option value="Action">Action</option>
            <option value="Sports">Sports</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>

        <p className="text-xs text-gray-400 mt-auto hidden md:block">© 2025 GameStore</p>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto px-4 md:px-8 py-6 md:py-8 m-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2 text-cyan-400"
        >
          Games List..🎮
        </motion.h1>
        {/* Games Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          <AnimatePresence>
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <motion.div
                  key={game.id}       // مهم جداً لكل كرت
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: 20 }}
                  layout
                  className="bg-[#1e293b] p-4 rounded-xl shadow-md border border-transparent
                    hover:border-blue-400/60 hover:shadow-blue-900/40
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <GameCard game={game} onDetails={onDetails} />
                </motion.div>
              ))
            ) : (
              <motion.p
                key="no-games"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 mt-8 text-center col-span-full"
              >
                No games match your search.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Gamelist;