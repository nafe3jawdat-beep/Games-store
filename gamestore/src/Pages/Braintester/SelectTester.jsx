import React, { useEffect, useState } from "react";
  function SelectTester({ gameId }) {
    const [testers, setTester] = useState([]);
    const [selectTester, setselectTester] = useState("");

  useEffect(() => {
    fetch("http://10.32.42.133:8000/api/")
      .then((res) => res.json())
      .then((data) => {
        setTester(data.tester);
      })
      .catch(() => setTester([]));
  }, []);

  const assignToTester = async () => {
    await fetch(
      `http://10.31.42.133:8000/api/braintester/games/${gameId}/assign`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tester_id: selectTester }),
      }
    );
  };

  const sendToStorage = async () => {
    await fetch(
      `http://10.31.42.133:8000/api/braintester/games/${gameId}/send-to-storage`,
      {
        method: "PUT",
      }
    );

    alert("تم وضع اللعبة في المخزن لحين توفر Tester");
  };
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Assign Tester</h3>

      {testers.length === 0 ? (
        <>
          <p>NO TESTER</p>
          <button
            onClick={sendToStorage}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl"
          >
            Send to Storage
          </button>
        </>
      ) : (
        <>
          <select
            value={selectTester}
            onChange={(e) => setselectTester(e.target.value)}
          >
            <option value="">SELECT TESTER</option>
            {testers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <button onClick={assignToTester}>Send to Tester</button>
        </>
      )}
    </div>
  );
}

export default SelectTester;
