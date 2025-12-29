import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://gamestoreapi.azurewebsites.net/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) throw new Error("بيانات الدخول غير صحيحة");
      navigate("/");
    } catch (error) {
      setError("فشل تسجيل الدخول.. تأكد من بياناتك");
    } finally {
      setLoading(false);
    }
  };

  const bgImage = "/imges/download.jpg";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative font-sans overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-[420px] mx-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#22d3ee] via-[#3b82f6] to-[#8b5cf6] rounded-[2rem] blur-xl opacity-20 animate-pulse"></div>

        <div className="relative bg-[#111827]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <h2 className="text-5xl font-black tracking-tighter italic uppercase">
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                LEVEL{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                UP
              </span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-4 opacity-70">
              Authentication Required
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[11px] p-3 rounded-xl mb-6 text-center font-bold tracking-wide animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/*حقل المستخدم  */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Identity
              </label>
              <input
                required
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#030712]/60 border border-white/5 px-6 py-4 rounded-xl text-white focus:outline-none focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/20 transition-all duration-300 placeholder:text-slate-700 font-bold tracking-widest text-sm"
              />
            </div>

            {/* حقل كلمة المرور */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Access Key
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#030712]/60 border border-white/5 px-6 py-4 rounded-xl text-white focus:outline-none focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/20 transition-all
                duration-300 placeholder:text-slate-700"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="relative w-full overflow-hidden group bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#22d3ee] hover:to-[#3b82f6] text-white font-black py-4 rounded-xl transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
            >
              <span className="relative z-10">
                {loading ? "Synchronizing..." : "Initialize Mission"}
              </span>

              <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000"></div>
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <Link
              to="/register"
              className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-[#22d3ee] transition-colors duration-300"
            >
              New Recruit?{" "}
              <span className="text-[#22d3ee] underline underline-offset-4 decoration-[#22d3ee]/30">
                Join the Squad
              </span>
            </Link>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center px-4 opacity-20">
          <div className="h-[1px] w-12 bg-white"></div>
          <div className="text-[8px] text-white font-mono tracking-widest uppercase">
            Encrypted Connection
          </div>
          <div className="h-[1px] w-12 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
