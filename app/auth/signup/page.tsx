"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
    ageGroup: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
        const res = await fetch("http://localhost:5050/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Sign up failed");
      }

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 px-4">
      <div className="w-full max-w-lg bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-sky-900">Create your NeuroBridge space</h1>
          <p className="text-sm text-slate-600">
            A neutral, supportive space built for every kind of thinker.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1 md:col-span-2">
            <label className="block text-slate-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-700">University / Organization</label>
            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="e.g., Arizona State University"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-slate-700">Age group</label>
            <select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">Select one</option>
              <option value="18-24">18–24</option>
              <option value="25-34">25–34</option>
              <option value="35-44">35–44</option>
              <option value="45+">45+</option>
            </select>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-2 w-full py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-medium transition"
          >
            Create account
          </button>
        </form>

        <p className="text-xs text-slate-600 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-sky-700 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

