import React from "react";
import { BaseUrl } from "../../Pages/BaseUrl";

export default function GameCard({ game, onDetails }) {
  return (
    <div
      className="
  bg-gray-400 border border-gray-300 rounded-xl overflow-hidden shadow-sm
  w-66 h-[340px] flex flex-col justify-between
  transition-transform duration-300 hover:scale-105 hover:shadow-2xl  m-[25px]
"
    >
      <div className="h-[140px] overflow-hidden">
        <img
          src={`${BaseUrl}/images/games/${game.image}`}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-3 text-center flex flex-col justify-between flex-1">
        <div className="flex-1">
          <h3
            className="
              text-base font-semibold text-gray-800 truncate block
              max-w-[200px] mx-auto"
          >
            {game.title}
          </h3>
          <p>{game.short_description}</p>
          <p className="text-gray-500 text-sm mt-1">{game.category?.name}</p>
          {/* <p className="text-green-600 font-bold mt-2">{game.price}$</p> */}
        </div>

        <button
          onClick={() => onDetails(game)}
          className="
    w-full py-2 mt-3 rounded-md text-sm font-medium text-white
    bg-gradient-to-r from-indigo-500 to-purple-500
    hover:from-indigo-600 hover:to-purple-600
    transition-all duration-300
  "
        >
          details
        </button>
      </div>
    </div>
  );
}
