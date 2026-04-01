import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Zap, CreditCard } from "lucide-react";
import { Sendtolibrare } from "../../components/GamesDetails/ActionButtons";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(""); 

  const { gameId, price, couponId, gameName } = location.state || {};

  const handlePay = async () => {
    if (!gameId) return;
    setIsProcessing(true);
    setMessage(""); 

    try {
      const res = await Sendtolibrare(gameId, couponId);
      
      setMessage(res?.message);

      setTimeout(() => {
        navigate("/MyLibrary");
      }, 2000);
    } catch (err) {
      setMessage(err.message );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!gameId) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden text-white">
      
      {message && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[320px] px-4">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-2xl text-xs font-bold text-center shadow-[0_0_30px_rgba(34,211,238,0.2)] animate-in fade-in slide-in-from-top-5 duration-300">
            {message}
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[380px] z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            Back to Store
          </span>
        </button>

        <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-400/20 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-black/50">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="text-cyan-400 w-6 h-6 fill-cyan-400/20" />
              </div>
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold text-white truncate tracking-tight leading-none mb-1.5">
                  {gameName || "Product Name"}
                </h1>
                <p className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest">
                  Digital License
                </p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-cyan-400/10 rounded-2xl p-6 mb-8 text-center group hover:border-cyan-400/30 transition-all">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                Total Amount
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-xl font-medium text-cyan-400/50 leading-none">
                  $
                </span>
                <span className="text-5xl font-black text-white tracking-tighter leading-none">
                  {price}
                </span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest
                ${
                  isProcessing
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                    : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-[0.97]"
                }`}
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-600 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
          The game will be added to your <br /> library instantly after purchase.
        </p>
      </div>
    </div>
  );
};

export default Payment