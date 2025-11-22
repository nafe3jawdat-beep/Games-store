import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { BaseUrl } from "../BaseUrl";

export default function TesterStore() {
  const [testers, setTesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BaseUrl}/api/braintester/testers`)
      .then((res) => res.json())
      .then((data) => {
        setTesters(data.testers || []);
      })
      .catch((err) => console.error("Error fetching testers:", err));
  }, []);


  return (
    <div className="min-h-screen w-full bg-[#0f172a] p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 border-b border-cyan-700 pb-3">
        Testers List
      </h1>

      <div className="flex flex-col gap-5">
        {testers.map((tester) => (
          <Card
            key={tester.id}
            image={tester.image}
            title={tester.name}
            fields={[
              { label: "Email", value: tester.email },
              { label: "Phone", value: tester.phone },
            ]}
            onClick={() => navigate(`/TesterList/${tester.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

















