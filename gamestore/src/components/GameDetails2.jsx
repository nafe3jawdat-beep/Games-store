import React from "react";
import { useParams } from "react-router-dom";
import GameInfo from "../components/GamesDetails/GameInfo";

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
];

export default function GamesDetails2() {
  const { id } = useParams();
  const game = games.find((g) => g.id === Number(id));

  if (!game)
    return (
      <div className="text-center text-red-500 py-10 text-xl">
        Game not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src={game.img}
          alt={game.title}
          onError={(e) => (e.currentTarget.src = "/src/imges/placeholder.jpg")}
          className="w-full h-full object-cover opacity-70 scale-105 slowZoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a88] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <GameInfo game={game} />
        </div>

        {/* Sidebar */}
        <div className=  "bg-gradient-to-b from-[#60718a] to-[#475569] rounded-xl p-4 md:p-5 flex flex-col justify-between shadow-md shadow-blue-900/20 border border-transparent scale-95 md:scale-90 hover:scale-95 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400/30 hover:from-[#71839c] hover:to-[#4b5e7a] transition-all duration-300 ease-in-out">
          <div>
            <p className="text-gray-400 text-sm mb-1">Main Store</p>
            <p className="text-white font-semibold mb-4">{game.mainstore}</p>

            <p className="text-gray-400 text-sm mb-1">Price</p>
            <p className="text-green-400 text-2xl font-bold mb-4">${game.price}</p>

            <p className="text-gray-400 text-sm mb-1">Category</p>
            <p className="text-indigo-300 font-semibold">{game.category}</p>
          </div>

          <a
            href={game.gameurl}
            download
            className="mt-6 text-center py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
          >
            Download Now
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slowzoom {
          0% { transform: scale(1.05) translateY(0); }
          50% { transform: scale(1.1) translateY(-5px); }
          100% { transform: scale(1.05) translateY(0); }
        }
        .slowZoom {
          animation: slowzoom 15s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
