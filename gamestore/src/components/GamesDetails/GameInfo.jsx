import React from "react";

export default function GameInfo({ game }) {
  if (!game) return null;

  return (
    
   <div className="w-full space-y-6">

  <div className="bg-gradient-to-b from-[#60718a] to-[#475569] rounded-xl p-4 flex flex-col justify-between shadow-md shadow-blue-900/20 border border-transparent transform transition-all duration-300 ease-in-out hover:scale-95 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400/30 hover:from-[#71839c] hover:to-[#4b5e7a] break-words">
    <div className="space-y-2">
      <p className="text-gray-400 text-sm">Main Store</p>
      {/* <p className="text-white font-semibold">{game.mainstore}</p> */}

      <p className="text-gray-400 text-sm">Price</p>
      {/* <p className="text-green-400 text-2xl font-bold">{game.price} $</p> */}

      <p className="text-gray-400 text-sm">Category</p>
      <p className="text-indigo-300 font-semibold">{game.category}</p>
    </div>
  </div>

  <div>
    <h2 className="text-2xl font-semibold mb-3 border-b border-gray-700 pb-2">
      🕹️ About the Game
    </h2>
    <p className="text-gray-300 leading-relaxed break-words">{game.long_description}</p>
  </div>

  {/* {game.game.tasks && game.game.tasks.length > 0 && (
    <div>
      <h3 className="text-xl font-semibold mb-3">🎯 Game Missions</h3>
      <ul className="space-y-3">
        {game.game.tasks.map((task) => (
          <li
            key={task.id}
            className="bg-[#1e293b] hover:bg-[#334155] transition rounded-lg p-4 shadow-lg break-words"
          >
            <h4 className="font-bold text-indigo-300 mb-1">{task.title}</h4>
            <p className="text-gray-400 text-sm">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )} */}
</div>

  );
}
