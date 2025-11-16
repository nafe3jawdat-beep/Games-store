// import React, { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/Gameslist";
const TesterStore = () => {
  // const [games, setGames] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://10.31.42.133:8000/api/braintester/games/uploaded")
  //     .then(res => res.json())
  //     .then(data => {
  //       setGames(data.games); 
  //     })
  //     .catch(err => console.error("Error fetching games:", err));
  // }, []);

const games=[
 {
  id: 1,
  developer_id: 1,
  title: "PUBG",
  slug: "pubg",
  image: "../imges/download.jpg",
  tester: {
    id: 101,
    name: "John Doe",
    email: "johndoe@example.com",
    role: "QA Tester",
    assigned_at: "2025-11-12T10:00:00.000000Z"
  },
  short_description: "Shooter game with battle royale.",
  long_description: "Fly, fight, and collect in the Star Rift – an indie space shooter.",
  status: "uploaded",
  created_at: "2025-11-11T18:04:38.000000Z",
  updated_at: "2025-11-11T18:04:38.000000Z",
  versions: []
},
]

  const handleDetails = (game) => {
    console.log(game)
    navigate(`/details${game.id}`);
    
  };
  return (
 <div className="p-5">
      { <Gamelist games={games} onDetails={handleDetails }/>}
    </div>
  )

};



export default TesterStore;
