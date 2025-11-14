import React, { useEffect, useState } from "react";

const TesterStorage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://10.31.42.133:8000/api/braintester/games/uploaded")
      .then(res => res.json())
      .then(data => {
        setGames(data.games); 
      })
      .catch(err => console.error("Error fetching games:", err));
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🧩 ألعاب مخزن التستر
      </h2>

      {games.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          لا توجد ألعاب في مخزن التستر حاليًا 🎮
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-700 mb-1">السعر: ${game.price}</p>
                <p className="text-gray-700 mb-1">التصنيف: {game.category.name}</p>
                <p className="text-gray-500 text-sm mb-2">
                  الحالة الحالية: {game.triage_status}
                </p>

                <button
                  onClick={() => handleReturnToTester(game.id)}
                  className="w-full py-2 mt-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  إعادة إلى التستر
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// مثال لدالة ترجع اللعبة إلى حالة مختلفة
const handleReturnToTester = async (id) => {
  try {
    const res = await fetch(`http://192.168.1.4:8000/api/triage/games/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ triage_status: "testing_initial" }),
    });

    if (res.ok) {
      console.log("✅ تمت إعادة اللعبة للـ tester");
    } else {
      console.error("❌ فشل التحديث");
    }
  } catch (err) {
    console.error("⚠️ خطأ بالشبكة:", err);
  }
};

export default TesterStorage;
