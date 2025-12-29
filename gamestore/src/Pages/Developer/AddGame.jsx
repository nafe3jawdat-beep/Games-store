import { useState } from "react";
import React from "react";
import { BaseUrl } from "../BaseUrl";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [version_string, setversion_string] = useState("");
  // const [Website_token, setWebsite_token] = useState("");
  const [image, setImage] = useState(null);
  const [tasks, setTasks] = useState([]);11
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    if (tasks.length <= 9) {
      setTasks([...tasks, { name: "", description: "", reward: "" }]);
    }
  };

  const removeTask = () => {
    if (tasks.length > 0) {
      setTasks(tasks.slice(0, -1));
    }
  };

  const updateTask = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("short_description", shortDesc);
    fd.append("long_description", longDesc);
    fd.append("version_string", version_string);
    fd.append("category_id", category_id);
    fd.append("image", image);

    // if (Website_token) {
    //   fd.append("Website_token", Website_token);
    // }

    tasks.forEach((task, i) => {
      fd.append(`tasks[${i}][name]`, task.name);
      fd.append(`tasks[${i}][description]`, task.description);
      fd.append(`tasks[${i}][reward]`, task.reward);
    });

    try {
      const res = await fetch(`${BaseUrl}/api/developer/games?developer_id=1`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 text-white w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload New Game</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-slate-800 p-6 rounded-xl"
      >
        <input
          required
          type="text"
          placeholder="Game Title"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          required
          placeholder="Short Description"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setShortDesc(e.target.value)}
        />

        <textarea
          required
          placeholder="Long Description"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setLongDesc(e.target.value)}
        />

        <input
          required
          type="text"
          placeholder="Version"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setversion_string(e.target.value)}
        />

        <input
          required
          type="number"
          placeholder="Category ID"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setcategory_id(e.target.value)}
        />

        <input
          required
          type="file"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* {tasks.length > 0 && (
          <input
            type="text"
            placeholder="Developer Website (optional)"
            className="p-2 rounded bg-slate-700"
            onChange={(e) => setWebsite_token(e.target.value)}
          />
        )} */}

        <div>
          <h2 className="font-semibold mb-3 text-lg">Tasks</h2>

          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-[#0f172a] p-3 rounded-lg mb-3 grid gap-3 sm:grid-cols-3"
            >
              <input
                type="text"
                placeholder="Task Name"
                className="p-2 rounded bg-slate-700"
                onChange={(e) => updateTask(index, "name", e.target.value)}
              />

              <textarea
                placeholder="Task Description"
                className="p-2 rounded bg-slate-700"
                onChange={(e) =>
                  updateTask(index, "description", e.target.value)
                }
              />

              <input
                type="number"
                required
                placeholder="Reward"
                className="p-2 rounded bg-slate-700"
                onChange={(e) => updateTask(index, "reward", e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 rounded-lg mt-2"
          >
            + Add Task
          </button>

          <button
            type="button"
            onClick={removeTask}
            className="px-4 py-2 bg-red-600 rounded-lg m-2"
          >
            - Delete Task
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center h-10 rounded-lg bg-green-600 disabled:bg-gray-600"
        >
          
          {loading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "uploded"
          )}
        </button>
      </form>
    </div>
  );
}
