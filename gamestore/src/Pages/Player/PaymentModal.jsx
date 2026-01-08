import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldCheck, Zap, CreditCard } from "lucide-react";
import { Sendtolibrare } from "../../components/GamesDetails/ActionButtons"; 

const SimplePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { gameId, price, couponId, gameName } = location.state || {};

  const handlePay = async () => {
    if (!gameId) return;
    setIsProcessing(true);
    try {
      await Sendtolibrare(gameId, couponId);
      navigate("/MyLibrary");
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!gameId) return null;

  return (
    // الخلفية العامة مقتبسة من طابع الـ Sidebar
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden text-white">
      
      {/* تأثير توهج خلفي (Cyan Glow) ليتناسب مع حدود السيان */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[380px] z-10">
        
        {/* زر العودة بتصميم يتناسب مع الـ Sidebar */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Store</span>
        </button>

        {/* البطاقة: تم استخدام Slate-900/95 و Backdrop-blur و Border-cyan */}
        <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-400/20 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-black/50">
          
          <div className="p-8">
            {/* أيقونة اللعبة والمعلومات مع لمسة سيان */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="text-cyan-400 w-6 h-6 fill-cyan-400/20" />
              </div>
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold text-white truncate tracking-tight leading-none mb-1.5">
                  {gameName || "Product Name"}
                </h1>
                <p className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest">Digital License</p>
              </div>
            </div>

            {/* صندوق السعر: أغمق قليلاً ليعطي تباين (Contrast) */}
            <div className="bg-slate-950/50 border border-cyan-400/10 rounded-2xl p-6 mb-8 text-center group hover:border-cyan-400/30 transition-all">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Total Amount</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-xl font-medium text-cyan-400/50 leading-none">$</span>
                <span className="text-5xl font-black text-white tracking-tighter leading-none">{price}</span>
              </div>
            </div>

            {/* زر الدفع: سيان صريح ليتناسب مع الهوية البصرية */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest
                ${isProcessing 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-[0.97]'
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

            {/* حماية الأمان */}
            <div className="mt-8 flex items-center justify-center gap-2 opacity-40 group hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Secure Encryption</span>
            </div>
          </div>

        </div>

        {/* نص سفلي بسيط */}
        <p className="text-center mt-6 text-slate-600 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
          The game will be added to your <br /> library instantly after purchase.
        </p>
      </div>
    </div>
  );
};

export default SimplePayment;