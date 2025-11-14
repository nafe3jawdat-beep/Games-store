// import { useState, useEffect } from "react";
// import React from 'react';
// import Gameslist from "../components/Gameslist";

// function Home() {
//     const [game, setgame] = useState([]);


//     useEffect(() => {
//         fetch("http://192.168.1.107:8000/api/triage/games")
//             .then((res) => {
//                 if (!res.ok) throw new Error("Network response was not ok");
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log("Fetched games:", data); 
//                 setgame(data); 
//             })
//             .catch((error) => console.error("Error fetching games:", error));
//     }, []);

//     return (
//         <div className="home">
//             {game && <Gameslist game={game} />}
//         </div>
//     );
// }

// export default Home;
