import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { BaseUrl } from "../BaseUrl";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [price, setprice] = useState("");
  const [main_story, setmain_story] = useState("");
  const [version_string, setversion_string] = useState("");
  const [Website_token, setWebsite_token] = useState("");
  const [image, setImage] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setmsg] = useState("");
  const navgigate = useNavigate();
  const token = localStorage.getItem("token");

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
    fd.append("price", price);
    fd.append("main_story", main_story);
    fd.append("image", image);
    fd.append("file_path", filePath);

    if (Website_token) {
      fd.append("Website_token", Website_token);
    }

    tasks.forEach((task, i) => {
      fd.append(`tasks[${i}][name]`, task.name);
      fd.append(`tasks[${i}][description]`, task.description);
      fd.append(`tasks[${i}][reward]`, task.reward);
    });

    try {
      const res = await fetch(`${BaseUrl}/api/games`, {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setmsg(data.message );

      setTimeout(() => {
        navgigate("/Developer/MyGames");
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      setmsg("Something went wrong!");
      setTimeout(() => setmsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 text-white w-full max-w-5xl mx-auto">
      {msg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-cyan-600 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-pulse">
          {msg}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-center">Upload New Game</h1>

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

        <select
          required
          className="p-2 rounded bg-slate-700 text-white"
          onChange={(e) => setcategory_id(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="1">Action</option>
          <option value="2">Adventure</option>
          <option value="3">RPG</option>
          <option value="4">Puzzle</option>
          <option value="5">Simulation</option>
          <option value="6">Strategy</option>
          <option value="7">Sports</option>
          <option value="8">Casual</option>
        </select>

        <input
          required
          type="number"
          placeholder="main_story"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setmain_story(e.target.value)}
        />
        <input
          required
          type="number"
          placeholder=" price"
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setprice(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 ml-1">
              Game Cover Image
            </span>
            <input
              required
              type="file"
              className="p-2 rounded bg-slate-700 text-sm text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 ml-1">
              Game File (Path)
            </span>
            <input
              type="file"
              className="p-2 rounded bg-slate-700 text-sm text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
              onChange={(e) => setFilePath(e.target.files[0])}
            />
          </div>
        </div>

        {tasks.length > 0 && (
          <input
            type="text"
            placeholder="Developer Website (optional)"
            className="p-2 rounded bg-slate-700"
            onChange={(e) => setWebsite_token(e.target.value)}
          />
        )}

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
            "upload Game"
          )}
        </button>
      </form>
    </div>
  );
}
