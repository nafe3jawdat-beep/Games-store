import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CARDS/Card";
import { BaseUrl } from "../BaseUrl";
import { Plus, Trash2, Edit } from "lucide-react";

export default function Tester_List() {
  const [testers, setTesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTesters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BaseUrl}/api/testers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTesters(data.Testers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTesters();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${BaseUrl}/api/testers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Deleted successfully");
        fetchTesters();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] lg:pl-[260px] p-5">
      <header className="flex justify-between items-center border-b border-cyan-700 pb-5 mb-5">
        <h1 className="text-3xl font-bold text-cyan-400">
          Normal Testers Manager
        </h1>

        <button
          onClick={() => navigate("/Edit")}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <Plus size={20} /> Add New Tester
        </button>
      </header>

      <div className="flex flex-col gap-5">
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          testers.map((tester) => (
            <div key={tester.id} className="relative group">
              <Card
                image={tester.image}
                title={tester.name}
                fields={[
                  { label: "Email", value: tester.email },
                  { label: "Account Type", value: "Normal Tester" },
                ]}
                onClick={() => {}}
              />

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/Edit/${tester.id}`, {
                      state: { user: tester },
                    });
                  }}
                  className="p-2 bg-blue-600/80 rounded-full"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(tester.id);
                  }}
                  className="p-2 bg-red-600/80 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
