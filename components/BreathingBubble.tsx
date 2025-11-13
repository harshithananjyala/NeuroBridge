"use client";

import { useEffect, useState } from "react";

export function BreathingBubble() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [time, setTime] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        if (t > 1) return t - 1;

        setPhase((p) => {
          if (p === "inhale") return "hold";
          if (p === "hold") return "exhale";
          return "inhale";
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const size =
    phase === "inhale" ? "w-40 h-40" : phase === "hold" ? "w-44 h-44" : "w-32 h-32";

  return (
    <div className="flex flex-col items-center gap-2 text-xs text-slate-300">
      <div
        className={`transition-all duration-700 rounded-full border border-pink-400/70 bg-pink-500/10 flex items-center justify-center ${size}`}
      >
        <span className="text-pink-300 capitalize">{phase}</span>
      </div>
      <div>Count: {time}</div>
    </div>
  );
}
