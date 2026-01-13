import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    account_type: "player",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const bgImage = "/images/images1.jpg";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.password.length < 8) newErrors.password = "Min 8npm install @stripe/stripe-js @stripe/react-stripe-js characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${BaseUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          account_type: formData.account_type,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const userRole = data.user.roles && data.user.roles[0];

      if (userRole === "player") navigate("/Games");
      else if (userRole === "developer") navigate("/AddGame");
      else navigate("/");
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative font-sans"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#070b14]/80 backdrop-blur-sm"></div>

      <div className="z-10 bg-[#121a29]/90 border border-[#1e293b] p-8 rounded-[2rem] shadow-2xl w-full max-w-[420px] mx-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic text-white">
            LEVEL <span className="text-[#4dabf7]">UP</span>
          </h2>
          <p className="text-[10px] text-blue-300/40 uppercase tracking-widest mt-2">
            Create New Account
          </p>
        </div>

        {errors.api && (
          <p className="text-red-500 text-center text-xs mb-4 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
            {errors.api}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-blue-400/60 font-bold ml-1">Identity</label>
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={formData.username}
              onChange={handleChange}
              className={`w-full bg-[#0a101e] border ${errors.username ? 'border-red-500' : 'border-[#1e293b]'} p-3 rounded-xl text-sm focus:border-blue-500/50 outline-none text-white transition-colors`}
            />
            {errors.username && <p className="text-red-500 text-[10px] ml-1">{errors.username}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-blue-400/60 font-bold ml-1">Account Type</label>
            <select
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              className="w-full bg-[#0a101e] border border-[#1e293b] p-3 rounded-xl text-sm focus:border-blue-500/50 outline-none text-white appearance-none cursor-pointer"
            >
              <option value="player">Player</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-blue-400/60 font-bold ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-[#0a101e] border ${errors.email ? 'border-red-500' : 'border-[#1e293b]'} p-3 rounded-xl text-sm focus:border-blue-500/50 outline-none text-white transition-colors`}
            />
            {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-blue-400/60 font-bold ml-1">Password</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-[#0a101e] border ${errors.password ? 'border-red-500' : 'border-[#1e293b]'} p-3 rounded-xl text-sm outline-none text-white transition-colors`}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="CONFIRM"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-[#0a101e] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#1e293b]'} p-3 rounded-xl text-sm outline-none text-white transition-colors`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-[10px] ml-1">{errors.password}</p>}
            {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4477f3] to-[#9156e5] py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 text-white mt-4"
          >
            {loading ? "Processing..." : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;