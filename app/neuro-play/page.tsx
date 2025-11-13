"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";

type FocusCard = {
  id: number;
  label: string;
  picked: boolean | null;
};

const initialFocusCards: FocusCard[] = [
  { id: 1, label: "BLUE circle vs BLUE circle", picked: null },
  { id: 2, label: "GREEN square vs GREEN square", picked: null },
  { id: 3, label: "YELLOW triangle vs ORANGE triangle", picked: null },
];

export default function NeuroPlayPage() {
  const [focusScore, setFocusScore] = useState(0);
  const [cards, setCards] = useState<FocusCard[]>(initialFocusCards);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [round, setRound] = useState(1);
  const [status, setStatus] = useState<string>("Tap “New pattern” to start.");

  const markCard = (id: number, isDifferent: boolean) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, picked: isDifferent } : c
      )
    );
    if (id === 3 && isDifferent) {
      setFocusScore((s) => s + 10);
    }
  };

  const newPattern = () => {
    const nextSeq = Array.from({ length: round + 1 }, () =>
      Math.floor(Math.random() * 4)
    );
    setSequence(nextSeq);
    setUserSequence([]);
    setStatus("Watch the pattern, then repeat it.");
  };

  const handleSequenceClick = (index: number) => {
    if (sequence.length === 0) return;
    const updated = [...userSequence, index];
    setUserSequence(updated);

    const correctSoFar = updated.every((v, i) => v === sequence[i]);
    if (!correctSoFar) {
      setStatus("Close! Pattern broke there. Try a new pattern.");
      setRound(1);
      setSequence([]);
      setUserSequence([]);
      return;
    }

    if (updated.length === sequence.length) {
      setFocusScore((s) => s + 15);
      setRound((r) => r + 1);
      setStatus("Nice recall. Ready for a harder pattern?");
      setSequence([]);
      setUserSequence([]);
    }
  };

  const resetAll = () => {
    setFocusScore(0);
    setCards(initialFocusCards);
    setSequence([]);
    setUserSequence([]);
    setRound(1);
    setStatus("Tap “New pattern” to start.");
  };

  return (
    <AuthGuard>
      <div className="space-y-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-sky-900">Neuro-Play</h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Short, quiet mini-games designed for focus and working memory. No noise, no scores on display for others.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Spot-the-difference logic game */}
          <section className="space-y-3 rounded-3xl border border-sky-100 bg-white/80 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-sky-900">
                1. Spot what&apos;s actually different
              </h2>
              <span className="text-xs text-slate-500">Focus score: {focusScore}</span>
            </div>
            <p className="text-xs text-slate-600">
              Three pairs, one real difference. Only tap &quot;Different&quot; on the pair that truly changes.
            </p>

            <div className="space-y-2 mt-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 px-3 py-2 text-xs"
                >
                  <span className="font-medium text-slate-800">{card.label}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => markCard(card.id, false)}
                      className={`px-2 py-1 rounded-xl border text-[11px] ${
                        card.picked === false
                          ? "bg-sky-700 text-white border-sky-700"
                          : "border-sky-200 text-sky-700 hover:bg-sky-50"
                      }`}
                    >
                      Same
                    </button>
                    <button
                      onClick={() => markCard(card.id, true)}
                      className={`px-2 py-1 rounded-xl border text-[11px] ${
                        card.picked === true
                          ? "bg-sky-700 text-white border-sky-700"
                          : "border-sky-200 text-sky-700 hover:bg-sky-50"
                      }`}
                    >
                      Different
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pattern / working-memory game */}
          <section className="space-y-3 rounded-3xl border border-sky-100 bg-white/80 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-sky-900">
                2. Quiet pattern recall
              </h2>
              <span className="text-xs text-slate-500">Round {round}</span>
            </div>
            <p className="text-xs text-slate-600">
              Click &quot;New pattern&quot;, watch the order light up (top-left = 0, then clockwise),
              then tap the tiles back in the same order.
            </p>

            <div className="grid grid-cols-2 gap-2 my-2">
              {Array.from({ length: 4 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleSequenceClick(i)}
                  className="h-16 rounded-2xl border border-sky-100 bg-sky-50/70 text-xs text-slate-700 hover:bg-sky-100 active:scale-[0.98] transition"
                >
                  Tile {i + 1}
                </button>
              ))}
            </div>

            <div className="flex gap-2 text-xs">
              <button
                onClick={newPattern}
                className="px-3 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-medium"
              >
                New pattern
              </button>
              <button
                onClick={resetAll}
                className="px-3 py-1.5 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50"
              >
                Reset all
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-2">{status}</p>
          </section>
        </div>
      </div>
    </AuthGuard>
  );
}

