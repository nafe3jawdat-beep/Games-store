import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BaseUrl}/api/login`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Body:", data);
      if (!response.ok) {
        throw new Error(data.message );
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const userRole = data.user.roles[0];
      if (userRole === "player") {
        navigate("/Games");
      } else if (userRole === "brain_tester") {
        navigate("/Brainlist");
      } else if (userRole === "tester") {
        navigate("/TesterList");
      } else if (userRole === "developer") {
        navigate("/AddGame");
      }else if (userRole === "admin") {
        navigate("/Brain_List");
      }
    } catch (error) {
      setError(error.message );
    } finally {
      setLoading(false);
    }
  };

  const bgImage = "/images/images.jpg";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative font-sans overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-[420px] mx-4">
        <div className="relative bg-[#111827]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-black tracking-tighter italic uppercase">
              <span className="text-white">LEVEL</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
                {" "}
                UP
              </span>
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[11px] p-3 rounded-xl mb-6 text-center font-bold tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Secure Email
              </label>
              <input
                required
                type="email"
                placeholder="EMAIL "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#030712]/60 border border-white/5 px-6 py-4 rounded-xl text-white focus:outline-none focus:border-[#22d3ee]/50 transition-all placeholder:text-slate-700 font-bold text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  required
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#030712]/60 border border-white/5 px-6 py-4 rounded-xl text-white focus:outline-none focus:border-[#22d3ee]/50 transition-all placeholder:text-slate-700"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 text-[10px] font-bold text-slate-400 cursor-pointer select-none hover:text-white"
                >
                  {show ? "HIDE" : "SHOW"}
                </span>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="relative w-full overflow-hidden group bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
            >
              {loading ? "Synchronizing..." : "Initialize Mission"}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
           New Recruit?{" "}
            <Link
              to="/Register"
              className="text-slate-500 text-[10px] font-bold uppercase hover:text-[#22d3ee]"
            >
             
              <span className="text-[#22d3ee]">Join the Squad</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
