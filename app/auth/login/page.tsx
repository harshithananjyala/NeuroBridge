"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5050/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token || "dummy-token");
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please check your details and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 px-4">
      <div className="w-full max-w-md bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-sky-900">Welcome back</h1>
          <p className="text-sm text-slate-600">
            Log in to your NeuroBridge space to continue where you left off.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div className="space-y-1">
            <label className="block text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-medium transition"
          >
            Log in
          </button>
        </form>

        <p className="text-xs text-slate-600 text-center">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/signup" className="text-sky-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

