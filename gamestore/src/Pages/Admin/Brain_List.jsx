import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CARDS/Card";
import { BaseUrl } from "../BaseUrl";
import { Plus, Trash2, Edit, X } from "lucide-react";

export default function Brain_List() {
  const [brainTesters, setBrainTesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

 const fetchBrainTesters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BaseUrl}/api/users/roles/braintesters`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response Status:", res.status);

      const data = await res.json();

      setBrainTesters(data.BrainTesters || []);
    } catch (err) {
      console.error("حدث خطأ أثناء الجلب:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrainTesters();
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
        fetchBrainTesters();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] lg:pl-[260px] p-5">
      <header className="flex justify-between items-center border-b border-cyan-700 pb-5 mb-5">
        <h1 className="text-3xl font-bold text-cyan-400">
          Brain Testers Manager
        </h1>

        <button
          onClick={() => navigate("/Edit")}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <Plus size={20} /> Add New Brain Tester
        </button>
      </header>
      <div className="flex flex-col gap-5">
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          brainTesters.map((brain) => (
            <div key={brain.id} className="relative group">
              <Card
                image={brain.image}
                title={brain.name}
                fields={[
                  { label: "Email", value: brain.email },
                ]}
                onClick={() => {}}
              />

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/Edit/${brain.id}`, {
                      state: {user: brain },
                    });
                  }}
                  className="p-2 bg-blue-600/80 rounded-full"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(brain.id);
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
