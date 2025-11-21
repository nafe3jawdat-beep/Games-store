// import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Gamelist from "../../components/Gameslist";

const Brainlist = () => {
  // const [games, setGames] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://10.52.19.133:8000/api/braintester/games/uploaded")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGames(data.games);
  //     })
  //     .catch((err) => console.error("Error fetching games:", err));
      
  // }, []);
    const games = [
  {
    id: 1,
    title: "FIFA 25",
    price: 59.99,
    description:
      "ابدأ ببناء فريقك الخاص وتحدّ لاعبين من حول العالم وحقق المجد الكروي بأسلوب جديد ومثير!",
    category: "Sports",
    mainstore: "EA Sports",
    img: "../imges/download.jpg",
    tasks: [
      { id: 1, title: "Ultimate Team", description: "كوّن فريق الأحلام وتحدّ العالم." },
      { id: 2, title: "Career Mode", description: "ابدأ مسيرتك التدريبية وقُد ناديك إلى القمة." },
      { id: 3, title: "Skill Challenge", description: "اختبر مهاراتك في التدريب والمراوغة والتسديد." },
    ],
  },
  {
    id: 2,
    title: "Call of Duty: Modern Warfare 3",
    price: 69.99,
    category: "Action",
    mainstore: "Activision",
    description:
      "انغمس في معارك ملحمية وحروب تكتيكية في واحدة من أقوى ألعاب التصويب الواقعية على الإطلاق.",
    img: "../imges/download.jpg",
    tasks: [
        { id: 1, title: "Ultimate Team", description: "كوّن فريق الأحلام وتحدّ العالم." },
        { id: 2, title: "Career Mode", description: "ابدأ مسيرتك التدريبية وقُد ناديك إلى القمة." },
        { id: 3, title: "Skill Challenge", description: "اختبر مهاراتك في التدريب والمراوغة والتسديد." },
      ],
  },
  ]

  const handleDetails = (game) => {
    console.log(game);
    navigate(`/details/${game.id}`);
  };

  return (
    <div className="p-5">
      {<Gamelist games={games} onDetails={handleDetails} />}
    </div>
  );
};

export default Brainlist;
