import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu, X,Home,Box,
  Users,PlusCircle, Gamepad2,Library,
  LogOut,Bell,Brain,Ticket,Swords,
} from "lucide-react";
import { BaseUrl } from "../Pages/BaseUrl";

export default function SideBar({ open, setOpen }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [points, setpoints] = useState(user.points || 0);
  const [hasUnread, setHasUnread] = useState(true);
  const [notifCount, setNotifCount] = useState(0);
  const currentRole = user?.roles?.[0];
  const token = localStorage.getItem("token");

  const checkNotifications = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${BaseUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const notifications = await res.json();

      const count = notifications.length;
      const lastSeen = Number(localStorage.getItem("last_notif_count") || 0);

      setNotifCount(count);
      setHasUnread(count > lastSeen);
    } catch (err) {
      // console.log("Notif error", err);
    }
  };

  const syncBalance = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${BaseUrl}/api/points`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const points = await res.json();

      setpoints(points);
      localStorage.setItem("user", JSON.stringify({ ...user, points }));
    } catch (err) {
      console.log("Sync error", err);
    }
  };

  useEffect(() => {
    syncBalance();
    checkNotifications();

    const updateSidebar = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setpoints(user?.points || 0);
    };
    window.addEventListener("click", updateSidebar);
    const interval = setInterval(checkNotifications, 50000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", updateSidebar);
    };
  }, []);

  const linkStyle =
    "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cyan-500/20 transition-all group";
  const iconStyle =
    "group-hover:text-cyan-400 text-slate-400 transition-colors";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-cyan-600 text-white p-2 rounded-xl shadow-lg lg:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900/95 backdrop-blur-md border-r border-cyan-400/20 text-white p-6 flex flex-col gap-6 shadow-2xl z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-5 mb-2 px-3">
          <h2 className="text-2xl font-bold text-cyan-400 truncate">
            {user?.name || "User"}
          </h2>
          {currentRole === "player" && (
            <div className="mt-3 py-2 border-l-2 border-cyan-500 bg-slate-800/40 rounded-r-lg px-3">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                Balance
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-white">
                  {Number(points?.points || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">
                  points
                </span>
              </div>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1">
          {currentRole === "brain_tester" && (
            <div className="mb-4">
              <p className="text-[11px] font-black text-slate-500 uppercase px-3 mb-2 tracking-tighter">
                Brain Tester Tools
              </p>
              <Link
                to="/Brainlist"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Home size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">Brain List</span>
              </Link>
              <Link
                to="/Gamestotest"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Box size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">Storage</span>
              </Link>
              <Link
                to="/TesterStore"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Users size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">Tester List</span>
              </Link>
            </div>
          )}

          {currentRole === "developer" && (
          <div className="mb-4">
            <p className="text-[11px] font-black text-slate-500 uppercase px-3 mb-2 tracking-tighter">
              Developer Panel
            </p>
            <Link
              to="/AddGame"
              onClick={() => setOpen(false)}
              className={linkStyle}
            >
              <PlusCircle size={20} className={iconStyle} />{" "}
              <span className="text-lg font-medium">Add Game</span>
            </Link>
            <Link
              to="/MyGames"
              onClick={() => setOpen(false)}
              className={linkStyle}
            >
              <Library size={20} className={iconStyle} />{" "}
              <span className="text-lg font-medium">My Games</span>
            </Link>

            <Link
              to="/NotificationsPage"
              onClick={() => {
                setOpen(false);
                setHasUnread(false);
                localStorage.setItem("last_notif_count", notifCount);
              }}
              className={`${linkStyle} relative`}
            >
              <Bell size={20} className={iconStyle} />
              <span className="text-lg font-medium">Notifications</span>

              {hasUnread && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_red]"></span>
                </span>
              )}
            </Link>
          
          </div>
          )}
          {currentRole === "admin" && (
            <div className="mb-4">
              <p className="text-[11px] font-black text-slate-500 uppercase px-3 mb-2 tracking-tighter">
                Admin Panel
              </p>
              <Link
                to="/Brainlist"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Brain size={20} className={iconStyle} />
                <span className="text-lg font-medium">Brain List</span>
              </Link>
              <Link
                to="/Tester_List"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Users size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">Tester List</span>
              </Link>
              <Link
                to="/AdminCoupons"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Ticket size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium"> Coupons</span>
              </Link>
              <Link
                to="/Player_List"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Swords size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium"> Player_List</span>
              </Link>
              <Link
                to="/Player_List"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Swords size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium"> Player_List</span>
              </Link>
            </div>
          )}

          {currentRole === "player" && (
            <div className="mb-4">
              <p className="text-[11px] font-black text-slate-500 uppercase px-3 mb-2 tracking-tighter">
                Player Area
              </p>
              <Link
                to="/Games"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Gamepad2 size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">All Games</span>
              </Link>
              <Link
                to="/MyLibrary"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Library size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">My Library</span>
              </Link>
              <Link
                to="/Coupon"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Box size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">Store Coupons</span>
              </Link>
              <Link
                to="/MyCoupon"
                onClick={() => setOpen(false)}
                className={linkStyle}
              >
                <Box size={20} className={iconStyle} />{" "}
                <span className="text-lg font-medium">MY Coupons</span>
              </Link>
            </div>
          )}
        </nav>

        <div className="mt-auto border-t border-slate-800 pt-4">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span className="text-lg font-bold">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
