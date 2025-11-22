import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TesterList() {
  const { id } = useParams();
  const [testerGames, setTesterGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://10.52.19.133:8000/api/braintester/games/${id}/uploaded`)
      .then((res) => res.json())
      .then((data) => {
        setTesterGames(data.games || []);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, [id]);

  const handleDetails = (game) => {
    navigate(`/details/${game.id}`);
  };

  return (
    <div className="p-5 flex flex-col gap-6">
      {testerGames && testerGames.length > 0 ? (
        testerGames.map((game) => (
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
        ))
      ) : (
        <p className="text-center text-gray-500">لا توجد ألعاب متاحة حالياً</p>
      )}
    </div>
  );
}

export default TesterList;
