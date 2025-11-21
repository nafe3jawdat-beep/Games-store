import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const fakeGames = {
  1: [
    {
      id: 101,
      title: "Memory Challenge",
      short_description: "Test your memory speed!",
      category: { name: "Puzzle" },
      image: "../../imges/download.jpg",
      tester: { name: "Tester One" },
    },
    {
      id: 102,
      title: "Brain Speed",
      short_description: "Increase your brain reaction.",
      category: { name: "Speed" },
      image: "../../imges/download.jpg",
      tester: { name: "Tester One" },
    },
  ],
  2: [
    {
      id: 201,
      title: "Logic Master",
      short_description: "Solve advanced logic puzzles.",
      category: { name: "Logic" },
      image: "../../imges/download.jpg",
      tester: { name: "Tester Two" },
    },
  ],
};

function TesterList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const testerGames = fakeGames[id] || [];

  const handleDetails = (game) => {
    navigate(`/details/${game.id}`);
  };

  return (
    <div className="p-5 flex flex-col gap-6">
      {testerGames.map((game) => (
        <div
          key={game.id}
          className="border rounded-xl shadow-md overflow-hidden flex flex-col w-full hover:shadow-xl transition"
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-40 object-cover"
          />

          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-800">{game.title}</h3>
            <p className="text-sm text-gray-600">{game.short_description}</p>
            <p className="text-gray-500 text-sm">{game.category?.name}</p>
            <p className="text-gray-700 font-medium">{game.tester?.name}</p>

            <button
              onClick={() => handleDetails(game)}
              className="mt-3 w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              التفاصيل
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default TesterList;
