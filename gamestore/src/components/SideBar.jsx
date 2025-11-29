import React from "react";
import { Link } from "react-router-dom";

export default function SideBar({ open, setOpen }) {
  return (
    <>
      {/* Button to toggle sidebar visibility */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-cyan-600 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-300 lg:hidden"
      >
        {open ? "✖" : "☰"}
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-800 text-white p-6 flex flex-col gap-6 z-10
        transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Sidebar title */}
        <h2 className="text-2xl font-semibold text-cyan-400 tracking-wide mb-8">Dashboard</h2>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-6">
          <Link
            className="text-lg font-semibold hover:text-cyan-300 transition-colors duration-200"
            to="/"
          >
            Brain List
          </Link>

          <Link
            className="text-lg font-semibold hover:text-cyan-300 transition-colors duration-200"
            to="/Gamestotest"
          >
            Storage
          </Link>

          <Link
            className="text-lg font-semibold hover:text-cyan-300 transition-colors duration-200"
            to="/TesterStore"
          >
            Tester List
          </Link>
        </div>

 
        </div>
    </>
  );
}
