import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/CARDS/Card";
import { BaseUrl } from "../BaseUrl";

export default function BTesterList() {
  const { id } = useParams();
  const [testerGames, setTesterGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${BaseUrl}/api/games/braintester/testing?tester_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("البيانات:", data);
        setTesterGames(data.games ?? data);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
      });
  }, [id]);

  return (
    <div className="min-h-screen  bg-[#0f172a] p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 border-b border-cyan-700 pb-3">
        Tester Games List
      </h1>
      <div className="flex flex-col gap-5">
        {testerGames.length > 0 ? (
          testerGames.map((game) => (
            <Card
              key={game.id}
              image={game.image_url}
              title={game.title}
              fields={[
                { label: "Category", value: game.category?.name },
                { label: "Tester", value: game.tester?.name },
              ]}
              onClick={() =>
                navigate(`/details/${game.id}`, {
                  state: {
                    status: game.status,
                    tester_id: game.game_versions?.[0]?.test_record?.tester_id,
                  },
                })
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            لا توجد ألعاب متاحة حالياً
          </p>
        )}
      </div>
    </div>
  );
}
