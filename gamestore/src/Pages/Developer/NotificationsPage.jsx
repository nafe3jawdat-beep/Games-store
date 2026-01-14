import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Bell, Info } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/developer/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data.developerNotifications || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const getStatusStyles = (status) => {
    if (status === "rejected") {
      return {
        border: "border-red-500/50",
        bg: "bg-red-500/10",
        text: "text-red-400",
      };
    }
    if (status === "accepted") {
      return {
        border: "border-green-500/50",
        bg: "bg-green-500/10",
        text: "text-green-400",
      };
    }
    return {
      border: "border-slate-700",
      bg: "bg-slate-800/60",
      text: "text-slate-400",
    };
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-cyan-500/20 pb-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
            <Bell className="w-6 h-6 animate-pulse" />
            Notifications
          </h2>
          <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20">
            {notifications.length}
          </span>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              const styles = getStatusStyles(notif.status);

              return (
                <div
                  key={notif.id}
                  className={`p-5 rounded-xl border transition ${styles.border} ${styles.bg}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}
                    >
                      <Info size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-slate-100 font-medium text-sm">
                        Game:{" "}
                        <span className="text-cyan-400">
                          {notif.game_name}
                        </span>
                      </p>

                      <p className={`text-sm mt-1 ${styles.text}`}>
                        Status: {notif.status}
                      </p>

                      <p className="text-slate-500 text-xs mt-2">
                        {new Date(notif.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
              <Bell className="w-12 h-12 text-slate-700 mx-auto mb-4 opacity-20" />
              <p className="text-slate-500 font-medium">No notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
