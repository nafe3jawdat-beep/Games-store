import React,{useEffect,useState} from "react";
import { BaseUrl } from "../BaseUrl";
import { Bell } from "lucide-react";

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
    }
    , []);
   return (
    <div className="p-6 max-w-3xl mx-auto" dir="rtl">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">قائمة الإشعارات</h2>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {!notif.read_at && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                )}
                
                <div>
                  <p className="text-gray-800 text-sm">
                    {notif.data?.message || notif.message || "إشعار جديد للمطور"}
                  </p>
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    {new Date(notif.created_at).toLocaleString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            لا توجد إشعارات لعرضها حالياً.
          </div>
        )}
      </div>
    </div>
  );
}