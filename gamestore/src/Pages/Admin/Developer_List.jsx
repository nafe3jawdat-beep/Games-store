import React, { useEffect, useState } from "react";
import Card from "../../components/CARDS/Card";
import { BaseUrl } from "../BaseUrl";
import { Trash2 } from "lucide-react";

export default function Developer_List() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BaseUrl}/api/developers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDevelopers(data.developers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this developer?"))
      return;
    try {
      const res = await fetch(`${BaseUrl}/api/developers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Developer deleted");
        fetchDevelopers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] lg:pl-[260px] p-5">
      <header className="border-b border-cyan-700 pb-5 mb-5">
        <h1 className="text-3xl font-bold text-cyan-400">Players Management</h1>
        <p className="text-slate-400 text-sm mt-2">
          View and manage game players
        </p>
      </header>

      <div className="flex flex-col gap-5">
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : developers.length > 0 ? (
          developers.map((developer) => (
            <div key={developer.id} className="relative group">
              <Card
                image={developer.image}
                title={developer.name}
                fields={[
                  { label: "Email", value: developer.email },
                  {
                    label: "Joined At",
                    value: new Date(developer.created_at).toLocaleDateString(),
                  },
                ]}
                onClick={() => {}}
              />

              <div className="absolute top-4 left-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(developer.id);
                  }}
                  className="p-3 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all border border-red-600/30 shadow-lg shadow-red-900/20"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 mt-10">
            No developers found.
          </p>
        )}
      </div>
    </div>
  );
}
