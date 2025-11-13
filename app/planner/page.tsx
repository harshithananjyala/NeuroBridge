"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function PlannerPage() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("general");

  const addTask = () => {
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        category,
        done: false,
      },
    ]);

    setText("");
  };

  const toggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <AuthGuard>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-sky-900">Planner</h1>
        <p className="text-slate-600 text-sm max-w-xl">
          A simple, calm task planner that adapts to your day.
        </p>

        {/* Inputs */}
        <div className="flex flex-col md:flex-row gap-3 bg-white border border-sky-100 p-4 rounded-2xl">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-3 py-2 border border-sky-200 rounded-xl"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-sky-200 rounded-xl"
          >
            <option value="general">General</option>
            <option value="study">Study</option>
            <option value="health">Health</option>
            <option value="focus">Focus</option>
            <option value="life">Life</option>
          </select>

          <button
            onClick={addTask}
            className="px-4 py-2 bg-sky-700 text-white rounded-xl hover:bg-sky-800"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-slate-600 text-sm">
              No tasks yet. Add your first one!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggle(task.id)}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  task.done
                    ? "bg-sky-100 border-sky-200 line-through text-slate-500"
                    : "bg-white border-sky-100 hover:bg-sky-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{task.text}</span>
                  <span className="text-xs text-sky-700 capitalize">
                    {task.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

