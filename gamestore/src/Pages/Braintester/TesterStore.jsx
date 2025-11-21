// import React, { u useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TesterStore = () => {
  // const [testers, setTesters] = useState([]);
  const navigate = useNavigate();

  // 🔹 مصفوفة التجربة
  const testers = [
    {
      id: 1,
      name: "Tester One",
      email: "tester1@example.com",
      phone: "0999888777",
      image: "tester1.jpg",
    },
    {
      id: 2,
      name: "Tester Two",
      email: "tester2@example.com",
      phone: "0999333222",
      image: "../../imges/download.jpg",
    },
    {
      id: 3,
      name: "Tester Three",
      email: "tester3@example.com",
      phone: "0999000111",
      image: "tester3.jpg",
    },
  ];



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
