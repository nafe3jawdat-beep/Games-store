import React from "react";

export default function BrainNotes({ game }) {
  if (!game) return null;

  const triage = game.triage_record;

  return (
    <div className="max-w-xl mx-auto mt-6 px-2">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 break-words">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Brain Tester
        </h3>

        {game.status === "triage" ? (
          <p className="text-gray-600 dark:text-gray-300 break-words">
            لا توجد ملاحظات متوفرة.
          </p>
        ) : (
          <div className="space-y-3 text-gray-700 dark:text-gray-300 break-words">
            <p>
              <span className="font-semibold">Is Game:</span>
              {triage.is_game ? "نعم" : "لا"}
            </p>

            <p>
              <span className="font-semibold">Category Valid:</span>
              {triage.category_valid ? "نعم" : "لا"}
            </p>

            <p>
              <span className="font-semibold">Main Story Approx Hours:</span>
              {triage.main_story_approximate_hours ?? "غير محدد"}
            </p>

            <p>
              <span className="font-semibold">Main Story Confidence:</span>
              {triage.main_story_confidence ?? "غير محدد"}
            </p>

            <p>
              <span className="font-semibold">Notes:</span>
              <span className="break-words">
                {triage.notes || "لا توجد ملاحظات إضافية"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
