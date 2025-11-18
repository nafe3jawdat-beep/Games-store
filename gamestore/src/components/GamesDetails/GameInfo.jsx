import React from "react";

export default function GameInfo({ game }) {
  if (!game) return null;

  return (
    <div className="max-w-xl space-y-8">
      ={" "}
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
          {game.category ? (
            <p className="text-lg">{game.category.name}</p>
          ) : (
            <p className="text-lg">N/A</p>
          )}
        </div>

        {/* Price */}
        <div>
          <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide">
            Price
          </p>
          {/* <p className="text-lg">${game.price}</p>         */}
        </div>

        <div>
          <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide">
            Platform
          </p>
          {/* <p className="text-lg">{game.versions[0].platform.name}</p> */}
        </div>
      </div>
    </div>
  );
}
