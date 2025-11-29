import React from "react";

export default function BrainNotes({ versions }) {
  if (!versions || !versions.triage_record) return null;

  const triage = versions.triage_record;

  return (
    <div className="max-w-xl mx-auto mt-6 px-2">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 break-words">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Brain Tester Notes
        </h3>

        <div className="space-y-3 text-gray-700 dark:text-gray-300 break-words">
          <p>
            <span className="font-semibold">Is Game:</span>{" "}
            {triage.is_game ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">Category Valid:</span>{" "}
            {triage.category_valid ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">Main Story Hours:</span>{" "}
            {triage.main_story_estimate_hours ?? "Not Provided"}
          </p>

          <p>
            <span className="font-semibold">Confidence:</span>{" "}
            {triage.main_story_confidence ?? "Not Provided"}
          </p>

          <p>
            <span className="font-semibold">Notes:</span>{" "}
            {triage.notes || "No additional notes"}
          </p>
        </div>
      </div>
    </div>
  );
}
