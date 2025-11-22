import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {BaseUrl} from "../BaseUrl";

export default function NotesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    is_game: false,
    category_valid: false,
    main_story_approximate_hours: "",
    main_story_confidence: "",
    notes: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/braintester/games/${id}/triage-record`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
        
      );
            navigate(-1);

      if (!res.ok) throw new Error("Failed to save notes");
      
    } catch (err) {
            navigate(-1);

      console.error(err);
      alert("Error saving notes");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-start py-14  relative overflow-hidden 
                    bg-gradient-to-br from-[#020617] via-[#0a1a33] to-[#10254a]"
    >
      <div
        className="w-full max-w-xl 
                   bg-white/20 backdrop-blur-xl 
                   border border-white/20
                   p-8 rounded-2xl 
                   transition-all duration-500
                   animate-fadeInGlass space-y-8"
      >
        <h1 className="text-4xl font-black text-center bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text drop-shadow tracking-wide">
          Game Notes
        </h1>

        <div className="grid gap-4">
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 hover:border-cyan-400 transition-all duration-300">
            <span className="text-m font-semibold text-gray-100 tracking-wide">
              Is Game
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-400"
              checked={form.is_game}
              onChange={(e) => setForm({ ...form, is_game: e.target.checked })}
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 hover:border-cyan-400 transition-all duration-300">
            <span className="text-m font-semibold text-gray-100 tracking-wide">
              Category Valid
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-400"
              checked={form.category_valid}
              onChange={(e) =>
                setForm({ ...form, category_valid: e.target.checked })
              }
            />
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-cyan-200 mb-2 font-bold">Main Story (Hours)</p>
            <input
              type="number"
              className="w-full p-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl
                         focus:border-cyan-400 outline-none text-white transition-all duration-300"
              value={form.main_story_approximate_hours}
              onChange={(e) =>
                setForm({
                  ...form,
                  main_story_approximate_hours: e.target.value,
                })
              }
            />
          </div>

          <div>
            <p className="text-cyan-200 mb-2 font-bold">Confidence (%)</p>
            <input
              type="number"
              className="w-full p-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl
                         focus:border-cyan-400 outline-none text-white transition-all duration-300"
              value={form.main_story_confidence}
              onChange={(e) =>
                setForm({ ...form, main_story_confidence: e.target.value })
              }
            />
          </div>

          <div>
            <p className="text-cyan-200 mb-2 font-bold">Notes</p>
            <textarea
              className="w-full p-3 h-32 bg-white/20
              backdrop-blur-xl border border-white/20 rounded-xl
                         focus:border-cyan-400 outline-none text-white transition-all duration-300 resize-none"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-bold text-lg text-black
                     bg-gradient-to-r from-blue-500 to-cyan-400
                     hover:from-blue-600 hover:to-cyan-500
                     transition-all duration-300 active:scale-95"
        >
          Save Notes
        </button>
      </div>
    </div>
  );
}
