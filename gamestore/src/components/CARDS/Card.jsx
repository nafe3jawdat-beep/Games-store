import React from "react";

export default function Card({ image, title, fields = [], onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1e293b] text-white rounded-xl shadow-md p-4 cursor-pointer
                 border border-cyan-500/30 hover:shadow-cyan-400/20 transition-all
                 flex flex-row items-center gap-4 "
    >
      <img
        src={image}
        alt={title}
        className="w-58 h-28 object-cover rounded-md border border-cyan-400"
      />

      <div className="flex flex-col space-y-2">
        <h3 className="text-cyan-400 font-bold text-lg">{title}</h3>

        {fields.map((field, index) => (
          <p key={index} className="text-gray-300 text-sm">
            {field.label}: {field.value}
          </p>
        ))}
      </div>
    </div>
  );
}
