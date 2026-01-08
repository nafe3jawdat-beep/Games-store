import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CARDS/Card";
import { BaseUrl } from "../BaseUrl";

export default function TesterStore() {
  const [testers, setTesters] = useState([]);
  const navigate = useNavigate();


useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${BaseUrl}/api/testers`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setTesters(data.testers )) 
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0f172a] lg:pl-[260px]">
      <h1 className="text-3xl font-bold text-center text-cyan-400 border-b border-cyan-700 pb-3">
        Testers List
      </h1>

      <div className="flex flex-col gap-5 p-5">
        {testers?.map((tester) => (
          <Card
            key={tester.id}
            image={tester.image}
            title={tester.name } 
            fields={[
              { label: "Email", value: tester.email },
            ]}
            onClick={() => navigate(`/BTesterList/${tester.id}`)}
          />
        ))}
      </div>
    </div>
  );
}