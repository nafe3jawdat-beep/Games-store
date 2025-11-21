import React from "react";

export default function GameInfo({ game }) {
  if (!game) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3 border-b border-gray-700 pb-2">
        🕹️ About the Game
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">{game.description}</p>

      {game.tasks && game.tasks.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-3">🎯 Game Missions</h3>
          <ul className="space-y-3">
            {game.tasks.map((task) => (
              <li
                key={task.id}
                className="bg-[#1e293b] hover:bg-[#334155] transition rounded-lg p-4 shadow-lg"
              >
                <h4 className="font-bold text-indigo-300 mb-1">{task.title}</h4>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </li>
            ))}
          </ul>
          
        </>
      )}
    </div>
  );
}
