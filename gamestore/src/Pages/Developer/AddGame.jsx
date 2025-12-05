import { useState } from "react";
import React from "react";
import {BaseUrl} from "../BaseUrl";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [version_string, setversion_string] = useState("");
  const [image, setImage] = useState(null);
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
      if (tasks.length <= 9) {

    setTasks([...tasks, { name: "", description: "", reward: "" }]);
  }};
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd= new FormData();
    fd.append("title", title);
    fd.append("short_description", shortDesc);
    fd.append("long_description", longDesc);
    fd.append("version_string", version_string);
    fd.append("category_id", category_id);
    fd.append("image", image);

    tasks.forEach((task, i) => {
      fd.append(`tasks[${i}][name]`, task.name);
      fd.append(`tasks[${i}][description]`, task.description);
      fd.append(`tasks[${i}][reward]`, task.reward);
    });

    fetch(`${BaseUrl}/api/developer/games?developer_id=1`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => console.log("Uploaded:", data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 text-white w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Upload New Game
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-slate-800 p-6 rounded-xl"
      >
        <input
          type="text"
          placeholder="Game Title"
          className="p-2 rounded bg-slate-700 w-full"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Short Description"
          className="p-2 rounded bg-slate-700 w-full"
          onChange={(e) => setShortDesc(e.target.value)}
        />

        <textarea
          placeholder="Long Description"
          className="p-2 rounded bg-slate-700 w-full"
          onChange={(e) => setversion_string(e.target.value)}
        />
               <textarea
          placeholder="version"
          className="p-2 rounded bg-slate-700 w-full"
          onChange={(e) => setLongDesc(e.target.value)}
        />
         <input
                type="number"
                required
                placeholder="category_id"
                className="p-2 w-full rounded bg-slate-700 col-span-1 sm:col-span-1"
                onChange={(e) => setcategory_id( e.target.value)}
              />
        <input
          type="file"
          className="p-2 rounded bg-slate-700 w-full"

          onChange={(e) => setImage(e.target.files[0])}
        />

        <div>
          <h2 className="font-semibold mb-3 text-lg">Tasks</h2>

          {tasks.map((task, index) => (
            
            <div
              key={index}
              className="bg-[#0f172a] p-3 rounded-lg mb-3 grid gap-3 sm:grid-cols-3 sm:gap-4"
            >
              <input
                type="text"
                placeholder="Task Name"
                className="p-2 w-full rounded bg-slate-700 col-span-1 sm:col-span-1"
                onChange={(e) => updateTask(index, "name", e.target.value)}
              />

              <textarea
                placeholder="Task Description"
                className="p-2 w-full rounded bg-slate-700 col-span-1 sm:col-span-1"
                onChange={(e) =>
                  updateTask(index, "description", e.target.value)
                }
              />

              <input
                type="number"
                required
                placeholder="Reward"
                className="p-2 w-full rounded bg-slate-700 col-span-1 sm:col-span-1"
                onChange={(e) => updateTask(index, "reward", e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 mt-2"
          >
            + Add Task
          </button>
            <button
            type="button"
            onClick={removeTask}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 m-2"
          >
            - Delet Task
          </button>
        </div>

        <button
          type="submit"
          className="py-2 rounded-lg bg-green-600 hover:bg-green-500 mt-4"
        >
          Upload Game
        </button>
      </form>
    </div>
  );
}
