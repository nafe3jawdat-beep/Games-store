import React from "react";

export default function BrainNotes({ versions }) {
  if (!versions) return null;

  const triage = versions;

  return (
    <div className="max-w-md w-full mt-6 ml-auto group">
      <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/50">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            <h3 className="font-bold text-gray-100 uppercase tracking-widest text-xs">
              Brain Tester Notes
            </h3>
          </div>
          {/* <span className="text-xl grayscale group-hover:grayscale-0 transition-all duration-500">🧠</span> */}
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Is Game</p>
            <div className="flex items-center gap-2">
               <span className={`h-2 w-2 rounded-full animate-pulse ${triage.is_game ? "bg-green-500" : "bg-red-500"}`}></span>
               <p className={`text-sm font-semibold ${triage.is_game ? "text-gray-200" : "text-red-400"}`}>
                {triage.is_game ? "Confirmed" : "No"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Category</p>
            <p className={`text-sm font-semibold ${triage.category_valid ? "text-green-400" : "text-red-400"}`}>
              {triage.category_valid ? "✓ Valid" : "✕ Invalid"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Main Story</p>
            <p className="text-sm font-bold text-white">
              {triage.main_story_estimate_hours ?? "--"} <span className="text-[10px] font-normal text-gray-500 uppercase">Hours</span>
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Confidence</p>
            <p className="text-sm font-bold text-indigo-400">
              {triage.main_story_confidence ?? "N/A"}
            </p>
          </div>
        </div>

        {triage.notes && (
          <div className="mt-8 pt-5 border-t border-gray-700/50">
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-3 tracking-[0.2em]">Reviewer Notes</p>
            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-gray-800 group-hover:border-gray-700 transition-colors">
              <p className="text-gray-400 text-xs leading-relaxed italic font-light">
                "{triage.notes}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}