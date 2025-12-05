import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Box, Users } from "lucide-react";

export default function SideBar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-cyan-600 text-white p-2 rounded-xl shadow-md 
                   transition-all duration-300 lg:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900/95 backdrop-blur-md 
          border-r border-cyan-400/30 text-white p-6 flex flex-col gap-6
          shadow-xl z-40 transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-cyan-400 tracking-wide mt-10">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-4 mt-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg
                       hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-200"
          >
            <Home size={20} />
            <span className="text-lg font-medium">Brain List</span>
          </Link>

          <Link
            to="/Gamestotest"
            className="flex items-center gap-3 px-3 py-2 rounded-lg
                       hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-200"
          >
            <Box size={20} />
            <span className="text-lg font-medium">Storage</span>
          </Link>

          <Link
            to="/TesterStore"
            className="flex items-center gap-3 px-3 py-2 rounded-lg
                       hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-200"
          >
            <Users size={20} />
            <span className="text-lg font-medium">Tester List</span>
          </Link>
            <Link
            to="/AddGame"
            className="flex items-center gap-3 px-3 py-2 rounded-lg
                       hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-200"
          >
        
            <span className="text-lg font-medium">Add Game</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
