"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";

type Appointment = {
  id: number;
  name: string;
  role: string;
  mode: string;
  date: string;
  time: string;
  note: string;
};

const demoConsultants = [
  { name: "Dr. Aarya Rao", role: "Neurodiversity-affirming psychologist" },
  { name: "Sam Lee", role: "Peer mentor – late-diagnosed ADHD" },
  { name: "Campus Coach", role: "Academic skills & executive function" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [form, setForm] = useState({
    consultant: demoConsultants[0].name,
    mode: "online",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.time) return;

    const consultantMeta = demoConsultants.find((c) => c.name === form.consultant);
    const next: Appointment = {
      id: Date.now(),
      name: form.consultant,
      role: consultantMeta?.role || "",
      mode: form.mode,
      date: form.date,
      time: form.time,
      note: form.note,
    };

    setAppointments((prev) => [next, ...prev]);
    setForm((prev) => ({ ...prev, date: "", time: "", note: "" }));
  };

  return (
    <AuthGuard>
      <div className="space-y-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-sky-900">Appointments</h1>
          <p className="text-sm text-slate-600 max-w-xl">
            This is a front-end demo of how you could book or log appointments with real humans
            (therapists, coaches, mentors). It does not send anything yet.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.3fr,1.2fr] gap-4">
          <section className="rounded-3xl border border-sky-100 bg-white/80 p-4 space-y-4">
            <h2 className="text-sm font-semibold text-sky-900">New appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Consultant</label>
                  <select
                    name="consultant"
                    value={form.consultant}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    {demoConsultants.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} — {c.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Mode</label>
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="online">Online</option>
                    <option value="in-person">In person</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">What do you want from this session?</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-sky-100 bg-sky-50/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="e.g., planning exams around energy levels, figuring out routines, etc."
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full md:w-auto px-4 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-medium"
              >
                Save appointment locally
              </button>
            </form>

            <p className="text-[10px] text-slate-500">
              In a real build, this would call your backend to create an appointment and sync with
              calendar tooling.
            </p>
          </section>

          <section className="rounded-3xl border border-sky-100 bg-sky-50/70 p-4 space-y-3 text-xs">
            <h2 className="text-sm font-semibold text-sky-900">Upcoming & logged appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-slate-600">
                Nothing saved yet. Once you add an appointment, it will show up here with date, time,
                and notes so you don&apos;t have to hold it all in your head.
              </p>
            ) : (
              <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
                {appointments.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-2xl bg-white border border-sky-100 px-3 py-2 space-y-1"
                  >
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sky-900 text-xs">{a.name}</p>
                        <p className="text-[10px] text-slate-600">{a.role}</p>
                      </div>
                      <div className="text-right text-[10px] text-slate-500">
                        <p>{a.date}</p>
                        <p>{a.time}</p>
                        <p className="capitalize">{a.mode}</p>
                      </div>
                    </div>
                    {a.note && (
                      <p className="text-[11px] text-slate-700 mt-1">
                        {a.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </AuthGuard>
  );
}

