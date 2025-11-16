// import React, { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Gamelist from "../../components/Gameslist";

const Brainlist = () => {
  // const [games, setGames] = useState([]); // ✅ array فارغة كبداية
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://10.31.42.133:8000/api/braintester/games/uploaded")
  //     .then(res => res.json())
  //     .then(data => {
  //       setGames(data.games); 
  //     })
  //     .catch(err => console.error("Error fetching games:", err));
  // }, []);
  const games = [
  {
    id: 1,
    developer_id: 1,
    title: "PUBG",
    slug: "pubg",
    image: "../imges/download.jpg",
    category: {
      id: 6,
      name: "Strategy",
      slug: "strategy",
      created_at: "2025-11-11T18:04:38.000000Z"
    },
    short_description: "Shooter game with battle royale.",
    long_description: "Fly, fight, and collect in the Star Rift – an indie space shooter.",
    status: "uploaded",
    created_at: "2025-11-11T18:04:38.000000Z",
    updated_at: "2025-11-11T18:04:38.000000Z",
    versions: []
  },
   {
    id: 2,
    developer_id: 1,
    title: "PUBG",
    slug: "pubg",
    image: "../imges/download.jpg",
    category: {
      id: 6,
      name: "Strategy",
      slug: "strategy",
      created_at: "2025-11-11T18:04:38.000000Z"
    },
    short_description: "Shooter game with battle royale.",
    long_description: "Fly, fight, and collect in the Star Rift – an indie space shooter.",
    status: "testing",
    created_at: "2025-11-11T18:04:38.000000Z",
    updated_at: "2025-11-11T18:04:38.000000Z",
    versions: []
  },
  // {
  //   id: 2,
  //   developer_id: 1,
  //   title: "FIFA",
  //   slug: "fifa",
  //   image: "games/Fifa.jpg"
  // },
  // {
  //   id: 3,
  //   developer_id: 1,
  //   title: "FORTNITE",
  //   slug: "fortnite",
  //   image: "games/fortnite.jpg"
  // },
  // {
  //   id: 4,
  //   developer_id: 1,
  //   title: "CUPHEAD",
  //   slug: "cuphead",
  //   image: "games/cuphead.jpg"
  // }
];



  const handleDetails = (game) => {
    console.log(game)
    navigate(`/details/${game.id}`);
    
  };

  return (
    <div className="p-5">
      { <Gamelist games={games} onDetails={handleDetails} />}
    </div>
  );
};

export default Brainlist;
