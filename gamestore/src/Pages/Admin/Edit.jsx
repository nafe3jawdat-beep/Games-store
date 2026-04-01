import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    account_type: "brain_tester",
  });

  useEffect(() => {
    if (id && state?.user) {
      setForm({
        name: state.user.name || "",
        email: state.user.email || "",
        password: "",
        account_type: state.user.account_type || "brain_tester",
      });
    }
  }, [id, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = id ? "PUT" : "POST";
    const url = id ? `${BaseUrl}/api/testers/${id}` : `${BaseUrl}/api/testers`;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          account_type: form.account_type,
        }),
      });

      if (res.ok) {
        alert("Success!");
        navigate(-1);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 lg:pl-[280px]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 mb-6"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="max-w-xl bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          {id ? "Edit Tester" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!id && (
            <div>
              <label className="block text-[10px] uppercase text-blue-400/60 font-bold mb-2">
                Account Type
              </label>
              <select
                className="w-full bg-[#0a101e] border border-[#1e293b] p-3 rounded-xl text-sm outline-none text-white cursor-pointer"
                value={form.account_type}
                onChange={(e) =>
                  setForm({ ...form, account_type: e.target.value })
                }
              >
                <option value="brain_tester">Brain Tester</option>
                <option value="tester"> Tester</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase text-blue-400/60 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-[#0a101e] border border-[#1e293b] p-3 rounded-xl text-sm outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase text-blue-400/60 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-[#0a101e] border border-[#1e293b] p-3 rounded-xl text-sm outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase text-blue-400/60 font-bold mb-2">
              Password {id && "(Empty to keep current)"}
            </label>
            <input
              type="password"
              required={!id}
              className="w-full bg-[#0a101e] border border-[#1e293b] p-3 rounded-xl text-sm outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4477f3] to-[#9156e5] py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" />}
            {id ? "Update User" : "Register User"}
          </button>
        </form>
      </div>
    </div>
  );
}
