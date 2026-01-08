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
//  {from === "library" ? (
//                 <ul className="space-y-2">
//                   {game.tasks.map((task) => (
//                     <li
//                       key={task.id}
//                       className="p-3 bg-gray-700 rounded flex justify-between"
//                     >
//                       <div>
//                         <p className="font-semibold">{task.name}</p>
//                         <p className="text-sm text-gray-300">
//                           {task.description}
//                         </p>
//                         <input
//                           type="checkbox"
//                           checked={task.achieved === 1}
//                           readOnly
//                           className="w-5 h-5 accent-green-400"
//                         />
//                       </div>
//                       <span className="text-green-400 font-bold">
//                         {task.reward}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <ul className="space-y-3">
//                   {game.tasks.map((task) => (
//                     <li
//                       key={task.id}
//                       className="bg-[#1e293b] hover:bg-[#334155] transition rounded-lg p-4 shadow-lg"
//                     >
//                       <h4 className="font-bold text-indigo-300 mb-1">
//                         {task.name}
//                       </h4>
//                       <p className="text-gray-400 text-sm">
//                         {task.description}
//                       </p>
//                       <p>reward: {task.reward}</p>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </>
//           )}