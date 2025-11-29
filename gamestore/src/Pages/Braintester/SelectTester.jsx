import React, { useState, useEffect } from "react";
import { BaseUrl } from "../BaseUrl";

function SelectTester({ gameId }) {
  const [testers, setTester] = useState([]);
  const [selectTester, setSelectTester] = useState("");

  useEffect(() => {
    fetch(`${BaseUrl}/api/braintester/testers`)
      .then((res) => res.json())
      .then((data) => {
        setTester(data.tester);
      })
      .catch(() => setTester([]));
  }, []);

  const assignToTester = async () => {
    if (!selectTester) return alert("Please select a tester");
    await fetch(
      `${BaseUrl}/api/braintester/games/${gameId}/assign`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tester_id: selectTester }),
      }
    );
    alert("Game assigned to tester successfully!");
  };

  const sendToQeue = async () => {
    await fetch(
      `http://10.31.42.133:8000/api/braintester/games/${gameId}/send-to-storage`,
      {
        method: "PUT",
      }
    );
    alert("تم وضع اللعبة في المخزن لحين توفر Tester");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-slate-800 rounded-2xl shadow-lg text-white">
      <h3 className="text-2xl font-bold mb-4 text-center">Assign Tester</h3>

      {testers.length === 0 ? (
        <div className="space-y-4 text-center">
          <p className="text-gray-300">No Testers Available</p>
          <button
            onClick={sendToQeue}
            className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-all duration-300"
          >
            Send to Storage
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <select
            value={selectTester}
            onChange={(e) => setSelectTester(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Select Tester</option>
            {testers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <button
            onClick={assignToTester}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all duration-300"
          >
            Send to Tester
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectTester;
