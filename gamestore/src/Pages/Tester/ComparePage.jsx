// import React, { useState, useEffect } from "react";
import React from "react";
// import Gamelist from "../../components/CARDS/Gameslist";
// import { useParams } from "react-router-dom";
// import { BaseUrl } from "../BaseUrl";

function ComparePage() {
  // const [game, setGame] = useState(null);
  // const [testerRecord, setTesterRecord] = useState(null);
  // const { id } = useParams();

  // useEffect(() => {
  //   fetch(`${BaseUrl}/api/braintester/games/${id}/compare`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGame(data.game);
  //       setTesterRecord(data.tester_record);
  //     })
  //     .catch((err) => console.error("Error fetching compare data:", err));
  // }, [id]);

 const game = {
game: {
id: 1,
developer_id: 1,
title: "PUBG",
slug: "pubg",
image: "games/pubg.jpg",
short_description: "Shooter game with battle royale.",
long_description: "PUBG is a battle royale game where players fight until only one remains.",
category_id: 6,
category: { id: 6, name: "Strategy", slug: "strategy" },
status: "ACCEPT",
created_at: "2025-11-11T18:04:38.000000Z",
updated_at: "2025-11-22T11:58:52.000000Z"
},
tester_record: {
id: 12,
game_id: 1,
tester_id: 3,
accepted: 1,
final_main_story_hours: 12,
final_category_type: "Action / Strategy Mix",
final_notes: "اللعبة ممتازة ولكن تحتاج تحسين في أداء السيرفر. نظام التصويب جيد.",
claimed_at: "2025-11-20 12:04:10",
created_at: "2025-11-20T12:00:00.000000Z",
updated_at: "2025-11-21T14:30:00"
}
};



  return (
    
    <div className="text-white p-10 ">
      <h1 className="text-3xl font-bold mb-6 ml-auto text-emerald-800 ">{game.game.status}</h1>

      <div className="bg-slate-900 p-5 rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-3">معلومات اللعبة</h2>
        <p><strong>اسم اللعبة:</strong> {game.game.title}</p>
        <p><strong>الوصف المختصر:</strong> {game.game.short_description}</p>
        <p><strong>الوصف الطويل:</strong> {game.game.long_description}</p>
        <p><strong>التصنيف:</strong> {game.game.category?.name}</p>
      </div>

      <div className="bg-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-bold mb-3">معلومات التستر</h2>

        
          
            <p><strong>Tester notes:</strong> {game.tester_record.final_notes}</p>
            <p><strong>main_story:</strong> {game.tester_record.final_main_story_hours}</p>
            <p><strong>category:</strong> {game.tester_record.final_category_type}</p>

        
        
      </div>

    </div>
  );
}

export default ComparePage;
