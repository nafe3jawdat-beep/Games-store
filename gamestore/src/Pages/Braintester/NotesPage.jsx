import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SelectTester from "./SelectTester";

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
      const res = await fetch(
        `http://10.31.42.133:8000/api/braintester/games/${id}/triage-record`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to save notes");

      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error saving notes");
    }
  };
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-[#1e293b] p-8 rounded-2xl shadow-xl space-y-8">
        <h1 className="text-3xl font-bold text-cyan-400 text-center">
          Game Notes
        </h1>

        <label className="flex items-center gap-3 text-lg">
          <input
            type="checkbox"
            checked={form.is_game}
            onChange={(e) => setForm({ ...form, is_game: e.target.checked })}
          />
          <span>Is Game</span>
        </label>

        <label className="flex items-center gap-3 text-lg">
          <input
            type="checkbox"
            checked={form.category_valid}
            onChange={(e) =>
              setForm({ ...form, category_valid: e.target.checked })
            }
          />
          <span>Category</span>
        </label>

        <div className="space-y-2">
          <p className="text-cyan-300 font-semibold">Main Story (Hours)</p>
          <input
            type="number"
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-500 focus:border-cyan-400 outline-none"
            value={form.main_story_approximate_hours}
            onChange={(e) =>
              setForm({ ...form, main_story_approximate_hours: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="text-cyan-300 font-semibold">
            Main Story Confidence (%)
          </p>
          <input
            type="number"
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-500 focus:border-cyan-400 outline-none"
            value={form.main_story_confidence}
            onChange={(e) =>
              setForm({ ...form, main_story_confidence: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="text-cyan-300 font-semibold">Notes</p>
          <textarea
            className="w-full p-3 h-32 rounded-lg bg-[#0f172a] border border-gray-500 focus:border-cyan-400 outline-none"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition"
        >
          Save Notes
        </button>
        <SelectTester />
      </div>
    </div>
  );
}
