import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";

export default function TesterNotesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state;
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const testRecordId = game?.game_versions?.[0]?.test_record?.id;

  const [form, setForm] = useState({
    final_main_story_hours: "",
    final_category_type: "",
    final_notes: "",
  });

  const [tasks, setTasks] = useState(
    game.tasks?.map((task) => ({
      id: parseInt(task.id) || 0,
      status: task.status,
      name: task.name,
    })) || []
  );

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);

    const formattedTasks = tasks.map((task) => ({
      id: task.id,
      status: task.status ? "accepted" : "rejected",
    }));

    const Notes = {
      ...form,
      tasks: formattedTasks,
    };
  const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${BaseUrl}/api/testrecord/${testRecordId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` 
 },
          body: JSON.stringify(Notes),
        }
      );
   console.log("res",res.status)
    const text =await res.text();
        console.log("Response Body:", text);
      const data = await res.json();

      if (res.ok) {
        setMsg(data.message || "Saved successfully!");
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        setMsg(data.message || "Error saving notes");
        setTimeout(() => setMsg(""), 3000);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMsg("Network error. Please try again.");
      setTimeout(() => setMsg(""), 3000);
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="text-white p-6 max-w-2xl mx-auto min-h-screen"
    >
      {msg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full shadow-lg transition-opacity duration-300">
          {msg}
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">Final Tester Notes</h2>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm text-gray-400 mb-1 ml-1">Main Story Hours</label>
          <input
            required
            type="number"
            placeholder="e.g. 25"
            className="bg-gray-800 p-3 w-full rounded border border-gray-700 focus:border-cyan-500 outline-none transition-all"
            value={form.final_main_story_hours}
            onChange={(e) =>
              setForm({ ...form, final_main_story_hours: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1 ml-1">Category Type</label>
          <input
            required
            type="number"
            placeholder="e.g. 1"
            className="bg-gray-800 p-3 w-full rounded border border-gray-700 focus:border-cyan-500 outline-none transition-all"
            value={form.final_category_type}
            onChange={(e) =>
              setForm({ ...form, final_category_type: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1 ml-1">Final Notes</label>
          <textarea
            placeholder="Enter your final observations..."
            className="bg-gray-800 p-3 w-full rounded h-28 border border-gray-700 focus:border-cyan-500 outline-none transition-all resize-none"
            value={form.final_notes}
            onChange={(e) =>
              setForm({ ...form, final_notes: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Tasks Checklist</h3>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <span className="font-medium">{task.name}</span>
              <input
                type="checkbox"
                className="w-6 h-6 accent-cyan-400 cursor-pointer"
                checked={task.status}
                onChange={(e) => {
                  const newTasks = [...tasks];
                  newTasks[index].status = e.target.checked;
                  setTasks(newTasks);
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-lg text-black transition-all duration-300 shadow-lg
                   ${loading 
                     ? "opacity-50 cursor-not-allowed bg-gray-400" 
                     : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-cyan-500/20 active:scale-95"}`}
      >
        {loading ? "Saving Records..." : "Save Final Notes"}
      </button>
    </form>
  );
}