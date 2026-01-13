import React from "react";
import Buttons from "./Buttons";
import { BaseUrl } from "../../Pages/BaseUrl";

export default function GameInfo({ game, from, onTasksUpdate,couponId }) {
  // console.log(couponId);

  if (!game) return null;
  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3  gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-3 border-b border-gray-700 pb-2">
            🕹️ About the Game
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            {game.description}
          </p>
          {game.tasks && game.tasks.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-3">🎯 Game Missions</h3>
              <ul className="space-y-3">
                {game.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="bg-[#1e293b] hover:bg-[#334155] transition rounded-lg p-4 shadow-lg flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-indigo-300 mb-1">
                        {task.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {task.description}
                      </p>
                      <p className="text-green-400 text-sm mt-1 font-medium">
                        Reward: ${task.reward}
                      </p>
                    </div>

                    <div className="ml-4">
                      {task.pivot ? (
                        task.pivot.achieved === 1 ? (
                          <div className="flex flex-col items-center">
                            <span
                              className="text-green-500 text-2xl"
                              title="Completed"
                            >
                              ✅
                            </span>
                            <span className="text-[10px] text-green-400 uppercase font-bold">
                              Done
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span
                              className="text-red-500 text-2xl"
                              title="Not Achieved"
                            >
                              ❌
                            </span>
                            <span className="text-[10px] text-red-400 uppercase font-bold">
                              Failed
                            </span>
                          </div>
                        )
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div
          className="md:col-span-1 w-full max-w-[350px] bg-gradient-to-b from-[#60718a] to-[#475569]
            rounded-xl p-4 md:p-5 flex flex-col justify-between 
            shadow-md shadow-blue-900/20 border border-transparent
            scale-95 md:scale-90
            hover:scale-95 hover:-translate-y-1
            hover:shadow-lg hover:border-blue-400/30
            hover:from-[#71839c] hover:to-[#4b5e7a]
            transition-all duration-300 ease-in-out h-fit self-start"
        >
          <div>
            <p className="text-gray-400 text-sm mb-1">Main Story</p>{" "}
            <p className="text-white font-semibold mb-4">{game.main_story}</p>
            <p className="text-gray-400 text-sm mb-1">Price</p>
            <p className="text-green-400 text-2xl font-bold mb-4">
              ${game.price}
            </p>
            <p className="text-gray-400 text-sm mb-1">Category</p>
            <p className="text-indigo-300 font-semibold">
              {game.category?.name}
            </p>
          </div>

          <div className="">
            <Buttons game={game} from={from} onTasksUpdate={onTasksUpdate} couponId={couponId} />
          </div>
        </div>
      </div>
    </div>
  );
}
