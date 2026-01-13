import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Ticket, Clock  } from "lucide-react"; 

function MyCoupon() {
  const [myCoupons, setMyCoupons] = useState([]);

useEffect(() => {
  const fetchCoupons = async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    try {
      const res = await fetch(`${BaseUrl}/api/coupons/user`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (!res.ok) throw new Error(res.status === 401 ? "Expired" : "Error");

      const data = await res.json();
      setMyCoupons(data.games ?? data.coupons ?? data);
      
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  fetchCoupons();
}, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-slate-200 min-h-screen">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-black text-white flex justify-center items-center gap-2">
          <Ticket className="text-cyan-500" /> My Inventory
        </h2>
        <p className="text-slate-400 text-sm mt-2">View and manage your purchased coupons</p>
      </header>

      <div className="space-y-4">
        {myCoupons.length === 0 ? (
          <div className="text-center p-10 border border-dashed border-slate-700 rounded-2xl">
            <p className="text-slate-500">You haven't purchased any coupons yet.</p>
          </div>
        ) : (
          myCoupons.map(cp => (
            <div key={cp.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 transition-all duration-300 hover:border-slate-700">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-white">{cp.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <Clock size={14} />
                      <span>Expires: {cp.valid_until || "No Expiry"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex justify-between items-center group">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">discount_percentage </p>
                    <code className="text-lg font-mono text-cyan-400">{cp.discount_percentage}</code>
                  </div>
                    
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyCoupon;