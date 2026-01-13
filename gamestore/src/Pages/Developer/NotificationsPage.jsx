import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Bell, Clock, Info } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };
  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-cyan-500/20 pb-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
            <Bell className="w-6 h-6 animate-pulse" />
            Notifications Center
          </h2>
          <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20">
            {notifications.length} Total
          </span>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`group relative p-5 rounded-xl border transition-all duration-300 ${
                  !notif.read_at
                    ? "bg-slate-800/60 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "bg-slate-900/40 border-slate-700/50 opacity-80"
                } hover:border-cyan-400/50 hover:bg-slate-800/80`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      !notif.read_at
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-slate-700 text-slate-500"
                    }`}
                  >
                    <Info size={18} />
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm leading-relaxed ${
                        !notif.read_at
                          ? "text-slate-100 font-medium"
                          : "text-slate-400"
                      }`}
                    >
                      {notif.data?.message ||
                        notif.message ||
                        "New system notification"}
                    </p>
                  </div>
                  {!notif.read_at && (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
              <Bell className="w-12 h-12 text-slate-700 mx-auto mb-4 opacity-20" />
              <p className="text-slate-500 font-medium">
                No notifications at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
