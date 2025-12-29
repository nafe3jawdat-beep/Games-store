import React, { useEffect,useState } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import Card from "../../components/CARDS/Card";
import { BaseUrl } from "../BaseUrl";

export default function TesterList() {
  const { id } = useParams();
  const [testerGames, setTesterGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BaseUrl}/api/braintester/games/testing?tester_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTesterGames(data.games || []);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, [id]);


  return (
    <div className="min-h-screen w-full bg-[#0f172a] p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 border-b border-cyan-700 pb-3">
        Tester Games List
      </h1>
      <div className="flex flex-col gap-5">
        {testerGames.length > 0 ? (
          testerGames.map((game) => (
            <Card
              key={game.id}
              image={game.image}
              title={game.title}
              fields={[
                { label: "Category", value: game.category?.name },
                { label: "Tester", value: game.tester?.name },
              ]}
              onClick={() => 
                navigate(`/details/${game.id}`, {
state: {
  status: game.status,
  tester_id: game.versions?.[0]?.test_record?.tester_id,
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
