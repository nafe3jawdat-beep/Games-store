import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";

export default function TesterNotesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state;

  const testRecordId = game?.game_versions?.[0]?.test_record?.id;

  const [form, setForm] = useState({
    final_main_story_hours: "",
    final_category_type: "",
    final_notes: "",
  });

  const [tasks, setTasks] = useState(
    game.tasks?.map((task) => ({
    id: parseInt(task.id) || 0,
      status: (task.status), 
      name: task.name,
    })) || []
  );

 const handleSubmit = async () => {
  const formattedTasks = tasks.map((task) => ({
    id: task.id,
    status: task.status ? "accepted" : "rejected",
  }));

  const Notes = {
    ...form,
    tasks: formattedTasks,
  };

  const res = await fetch(
    `${BaseUrl}/api/tester/testrecord/${testRecordId}/`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Notes),
    }
  );

  console.log("Response Status:", res.status);
  const text = await res.text();
  console.log("Response Body:", text);

  if (res.ok) {
    navigate(-1);
  } else {
    alert("Error saving notes");
  }
};


  return (
    <div className="text-white p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Final Tester Notes</h2>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Main Story Hours"
          className="bg-gray-800 p-3 w-full rounded"
          value={form.final_main_story_hours}
          onChange={(e) =>
            setForm({ ...form, final_main_story_hours: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Category Type"
          className="bg-gray-800 p-3 w-full rounded"
          value={form.final_category_type}
          onChange={(e) =>
            setForm({ ...form, final_category_type: e.target.value })
          }
        />

        <textarea
          placeholder="Final Notes"
          className="bg-gray-800 p-3 w-full rounded h-28"
          value={form.final_notes}
          onChange={(e) =>
            setForm({ ...form, final_notes: e.target.value })
          }
        />
      </div>

      <ul className="space-y-3 mb-6">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="flex justify-between p-3 bg-gray-700 rounded"
          >
            <span>{task.name}</span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-green-400"
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

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-500 p-3 rounded font-bold"
      >
        Save Notes
      </button>
    </div>
  );
}
