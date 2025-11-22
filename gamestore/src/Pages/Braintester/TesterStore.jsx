import React, {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TesterStore = () => {
  const [testers, setTesters] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://10.52.19.133:8000/api/braintester/testers")
      .then((res) => res.json())
      .then((data) => {
        setTesters(data.games);
      })
      .catch((err) => console.error("Error fetching games:", err));
      
  }, []);

  const handleDetails = (tester) => {
    navigate(`/TesterList/${tester.id}`);
  };

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {testers.map((tester) => (
        <div
          key={tester.id}
          onClick={() => handleDetails(tester)}
          className="border rounded-lg p-4 shadow-md hover:shadow-xl cursor-pointer transition"
        >
          <img
  src={tester.image}
  alt={tester.name}
  className="w-32 h-32 object-cover mt-2 rounded-full mx-auto"
/>

          <h3 className="text-lg font-bold">{tester.name}</h3>
          <p>Email: {tester.email}</p>
          <p>Phone: {tester.phone}</p>

       
        </div>
      ))}
    </div>
  );
};

export default TesterStore;
