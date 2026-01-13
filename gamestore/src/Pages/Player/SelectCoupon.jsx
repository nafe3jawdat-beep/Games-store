import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";

function SelectCoupon({ onSelect }) {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BaseUrl}/api/user/coupons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data || []);
      })
      .catch((err) => {
        console.error("Error:", err);
        setCoupons([]);
      });
  }, [token]);

  const handleChange = (e) => {
    const couponId = e.target.value;
    setSelectedCoupon(couponId);
    if (onSelect) onSelect(couponId);
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-[1px] rounded-2xl shadow-xl transition-all hover:shadow-amber-500/10">
      <div className="bg-slate-900/90 p-5 rounded-[15px] backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Length: 15,15, 7.5 0 2.25 2.25 2.25-2.25 4.5 4.5V18a2 2 0 01-2 2h-14a2 2 0 01-2-2V7.5L4.5 12 12 4.5zM15 11l-3 3-3-3m3 3V10" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <label className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
            Discount Coupons
          </label>
        </div>

        {coupons.length === 0 ? (
          <div className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/30">
             <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">No coupons available</p>
          </div>
        ) : (
          <div className="relative group">
            <select
              value={selectedCoupon}
              onChange={handleChange}
              className="w-full appearance-none p-3 pl-4 pr-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all cursor-pointer hover:bg-slate-700/50 shadow-inner"
            >
              <option value="" className="bg-slate-900">Apply a coupon code...</option>
              {coupons.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 py-2">
                   {c.name}
                </option>
              ))}
            </select>
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500 group-hover:text-amber-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        
        {selectedCoupon && (
          <p className="mt-3 text-[11px] text-emerald-400 font-medium animate-fade-in">
             ✓ Coupon code selected successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default SelectCoupon;