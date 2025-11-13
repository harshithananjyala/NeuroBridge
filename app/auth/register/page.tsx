"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    university: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("/api/auth/register", form);
      router.push("/auth/login");
    } catch (e: any) {
      setError(e.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <h1 className="text-2xl font-semibold">Join NeuroBridge ✨</h1>
      <p className="text-slate-300 text-sm">
        Soft place for your brain. No spam, no judgment.
      </p>
      <div className="space-y-3">
        <input
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm"
          placeholder="University (optional)"
          value={form.university}
          onChange={(e) => setForm({ ...form, university: e.target.value })}
        />
        {error && <div className="text-xs text-pink-400">{error}</div>}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-2 rounded-xl bg-pink-500 text-slate-950 text-sm hover:bg-pink-400 disabled:opacity-60"
        >
          {loading ? "Creating your cozy corner..." : "Sign up"}
        </button>
      </div>
    </div>
  );
}
