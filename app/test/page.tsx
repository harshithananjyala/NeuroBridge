"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function TestPage() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    api
      .get("/")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Backend Connection Test</h1>
      <div className="text-lg text-gray-700">{message}</div>
    </main>
  );
}
