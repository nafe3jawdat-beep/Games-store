import React, { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";

export default function NotesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    is_game: false,
    category_valid: false,
    main_story_estimate_hours: "",
    main_story_confidence: "",
    notes: "",
  });
useEffect(() => {
    const fetchCurrentData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BaseUrl}/api/triage/${id}`, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (res.ok) {
          const data = await res.json();
         
          setForm({
            is_game: data.is_game || false,
            category_valid: data.category_valid || false,
            main_story_estimate_hours: data.main_story_estimate_hours || "",
            main_story_confidence: data.main_story_confidence || "",
            notes: data.notes || "",
          });
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchCurrentData();
  }, [id]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const updatedForm = {
    ...form,
    main_story_estimate_hours: Number(form.main_story_estimate_hours) || 0,
    main_story_confidence: Number(form.main_story_confidence) || 0,
  };

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${BaseUrl}/api/triage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedForm),
    });

    const data = await res.json(); // ✅ قراءة واحدة فقط
    console.log("Response Data:", data);

    if (!res.ok) {
      setMsg(data.message || "Something went wrong");
      setTimeout(() => setMsg(""), 3000);
      setLoading(false);
      return;
    }

    setMsg(data.message || "Saved successfully!");
    setTimeout(() => navigate(-1), 1500);

  } catch (err) {
    console.error(err);
    setMsg("Connection error. Please try again.");
    setTimeout(() => setMsg(""), 3000);
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full flex justify-center items-start py-14 relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0a1a33] to-[#10254a]">
      
      {msg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full shadow-lg transition-opacity duration-300">
          {msg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/20 backdrop-blur-xl border border-white/20 p-8 rounded-2xl animate-fadeInGlass space-y-8"
      >
        <h1 className="text-4xl font-black text-center bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text drop-shadow tracking-wide">
          Game Notes
        </h1>

        <div className="grid gap-4">
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 hover:border-cyan-400 transition-all duration-300">
            <span className="text-m font-semibold text-gray-100 tracking-wide">Is Game</span>
            <input
            required
              type="checkbox"
              className="w-5 h-5 accent-blue-400"
              checked={form.is_game}
              onChange={(e) => setForm({ ...form, is_game: e.target.checked })}
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 hover:border-cyan-400 transition-all duration-300">
            <span className="text-m font-semibold text-gray-100 tracking-wide">Category Valid</span>
            <input
            required
              type="checkbox"
              className="w-5 h-5 accent-blue-400"
              checked={form.category_valid}
              onChange={(e) => setForm({ ...form, category_valid: e.target.checked })}
            />
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-cyan-200 mb-2 font-bold">Main Story (Hours)</p>
            <input
              required
              type="number"
              className="w-full p-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl focus:border-cyan-400 outline-none text-white transition-all duration-300"
              value={form.main_story_estimate_hours}
              onChange={(e) => setForm({ ...form, main_story_estimate_hours: e.target.value })}
            />
          </div>

          <div>
            <p className="text-cyan-200 mb-2 font-bold">Confidence (%)</p>
            <input
              required
              type="number"
              className="w-full p-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl focus:border-cyan-400 outline-none text-white transition-all duration-300"
              value={form.main_story_confidence}
              onChange={(e) => setForm({ ...form, main_story_confidence: e.target.value })}
            />
          </div>

          <div>
            <p className="text-cyan-200 mb-2 font-bold">Notes</p>
            <textarea
            required
              className="w-full p-3 h-32 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl focus:border-cyan-400 outline-none text-white transition-all duration-300 resize-none"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-lg text-black transition-all duration-300
                     ${loading ? "opacity-50 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-cyan-400 active:scale-95"}`}
        >
          {loading ? "Saving..." : "Save Notes"}
        </button>
      </form>
    </div>
  );
}