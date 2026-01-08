import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";

const token = localStorage.getItem("token");

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    discount_percentage: "",
    price: "",
    valid_until: "",
  });

  const loadCoupons = async () => {
    const res = await fetch(`${BaseUrl}/api/coupons/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCoupons(data.coupons || data || []);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await fetch(
      editId
        ? `${BaseUrl}/api/coupons/${editId}`
        : `${BaseUrl}/api/coupons`,
      {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          valid_until: form.valid_until || null,
        }),
      }
    );

    setShow(false);
    setEditId(null);
    setForm({ name: "", discount_percentage: "", price: "", valid_until: "" });
    loadCoupons();
  };

  const edit = (c) => {
    setEditId(c.id);
    setForm({
      name: c.name,
      discount_percentage: c.discount_percentage,
      price: c.price,
      valid_until: c.valid_until || "",
    });
    setShow(true);
  };

  const remove = async (id) => {
    if (!confirm("Delete this coupon?")) return;

    await fetch(`${BaseUrl}/api/coupons/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-slate-200 min-h-screen">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white italic">ADMIN STORE</h2>
          <p className="text-slate-400 text-sm">Manage your coupons</p>
        </div>

        <button
          onClick={() => setShow(true)}
          className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl flex items-center gap-2 font-bold"
        >
          <Plus size={18} /> Add New
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map(c => (
          <div
            key={c.id}
            className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-white">{c.name}</h3>
              <p className="text-cyan-400 font-bold">
                {c.discount_percentage}% — ${c.price}
              </p>
              {c.valid_until && (
                <p className="text-xs text-slate-500">
                  Until: {c.valid_until}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(c)}
                className="p-2 bg-slate-800 text-cyan-400 rounded-lg hover:bg-slate-700"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => remove(c.id)}
                className="p-2 bg-slate-800 text-red-400 rounded-lg hover:bg-slate-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>

            <h3 className="text-2xl font-black text-white mb-6">
              {editId ? "Edit Coupon" : "Create Coupon"}
            </h3>

            <form onSubmit={submit} className="space-y-4">
              <input
                placeholder="Name"
                className="w-full input"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="number"
                placeholder="Discount %"
                className="w-full input"
                value={form.discount_percentage}
                onChange={e =>
                  setForm({ ...form, discount_percentage: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="w-full input"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />

              <input
                type="date"
                className="w-full input"
                value={form.valid_until}
                onChange={e =>
                  setForm({ ...form, valid_until: e.target.value })
                }
              />

              <button className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-bold flex justify-center gap-2">
                <Save /> Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
