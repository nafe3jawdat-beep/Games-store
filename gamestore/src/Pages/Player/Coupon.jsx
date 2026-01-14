import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { X, Check, Loader2 } from "lucide-react";

const getUser = () => JSON.parse(localStorage.getItem("user") || "{}");
const getToken = () => localStorage.getItem("token");

function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [points, setPoints] = useState(() => Number(getUser().points || 0));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     const token = localStorage.getItem("token");
    fetch(`${BaseUrl}/api/coupons`, {
      headers: {
      "Authorization": `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())

      .then((data) =>
        setCoupons(data?.coupons || [])
      )
      .catch(() => setCoupons([]));
  }, []);

const syncBalance = (newBalance) => {
    setPoints(newBalance); 
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.points = newBalance;
    localStorage.setItem("user", JSON.stringify(user));
};
const buyCoupon = async (id) => {
    setLoading(true);
    // setMsg({ text: "", type: "" });

    try {
      const res = await fetch(`${BaseUrl}/api/coupons/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ coupon_id: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "حدث خطأ ما"); 
      }

      syncBalance(data.points);
      setMsg({ text: data.message, type: "success" });
      setSelectedId(null);

    } catch (err) {
      setMsg({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMsg({ text: "", type: "" }), 5000);
    }
  };
  return (
    <div className="p-6 max-w-xl mx-auto text-slate-200 min-h-screen">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-black text-white">Coupon Store</h2>
        <p className="text-slate-400 text-sm">
          Select a coupon to boost your balance
        </p>
      </header>

      <div className="space-y-4">
        {coupons.map((cp) => {
          const isSelected = selectedId === cp.id;

          return (
            <div
              key={cp.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? "border-cyan-500 bg-slate-800 shadow-xl"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl text-white">{cp.name}</h3>
                  <p className="text-sm text-slate-400">
                    Price:{" "}
                    <span className="text-cyan-400 font-bold">${cp.price}</span>
                  </p>
                  <p className="text-sm text-slate-400">
                    valid_until:{" "}
                    <span className="text-cyan-400 font-bold">
                      {cp?.valid_until}
                    </span>
                  </p>
                </div>
                <button
                  disabled={loading}
                  onClick={() => setSelectedId(isSelected ? null : cp.id)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    isSelected
                      ? "bg-slate-700"
                      : "bg-cyan-600 hover:bg-cyan-500 text-white"
                  }`}
                >
                  {isSelected ? "Close" : "Buy Now"}
                </button>
              </div>

              {isSelected && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2">
                  <div className="pt-4 border-t border-slate-700 flex flex-col gap-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Your Wallet: {points}
                      </span>
                      <span className="text-white">Payable: ${cp.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={loading}
                        onClick={() => buyCoupon(cp.id)}
                        className="flex-1 bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />{" "}
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check size={20} /> Confirm
                          </>
                        )}
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => setSelectedId(null)}
                        className="bg-slate-700 px-5 rounded-xl disabled:opacity-50"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

  {msg.text && (
  <div className={`fixed top-10 left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-pulse ${
    msg.type === "success" ? "bg-green-600" : "bg-red-600"
  }`}>
    {msg.text} 
  </div>
)}
    </div>
  );
}

export default Coupon;
