// import React, { useEffect, useState } from "react";
// import Card from "../../components/CARDS/Card";
// import { BaseUrl } from "../BaseUrl";
// import { useNavigate } from "react-router-dom";

// function FinishedGames() {
//   const [games, setGames] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${BaseUrl}/api/games`)
//       .then((res) => res.json())
//       .then((data) => setGames(data.games));
//   }, []);

//   const filteredGames = games.filter(
//     (game) => game.status === "accept" || game.status === "reject"
//   );

//   return (
//     <div className="min-h-screen w-full bg-[#0f172a] p-6">
//       <div className="flex flex-col gap-5">
//         {filteredGames.map((game) => (
//           <Card
//             key={game.id}
//             image={game.image}
//             title={game.title}
//             fields={[{ label: "Category", value: game.category?.name }]}
//             onClick={() => navigate(`/ComparePage/${game.id}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FinishedGames;
