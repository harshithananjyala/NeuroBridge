"use client";

import { useEffect, useRef, useState } from "react";

interface ProfilePopupProps {
  user: any;
  points: number;
  onLogout: () => void;
  onClose: () => void;
}

export default function ProfilePopup({
  user,
  points,
  onLogout,
  onClose,
}: ProfilePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("");

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Personalized AI greeting 💬
  useEffect(() => {
    const hour = new Date().getHours();
    let greet = "";

    if (hour < 12) greet = "Good morning 🌞";
    else if (hour < 18) greet = "Good afternoon 🌸";
    else greet = "Good evening 🌙";

    const nicknames = [
      "sweetie",
      "starshine",
      "wondermind",
      "cutie",
      "braveheart",
      "sunbeam",
    ];

    const randomNick = nicknames[Math.floor(Math.random() * nicknames.length)];
    const positive = [
      "I'm proud of your progress today 💖",
      "Keep taking deep breaths — you're doing amazing 🌼",
      "Your mind shines bright today ✨",
      "You're growing in the most beautiful ways 🌷",
      "Thanks for showing up, even when it's hard 💕",
    ];
    const randomMsg = positive[Math.floor(Math.random() * positive.length)];

    setGreeting(`${greet}, ${randomNick}! ${randomMsg}`);
  }, []);

  return (
    <div
      ref={popupRef}
      className="absolute top-16 right-6 bg-gradient-to-b from-pink-50 to-rose-100 border border-pink-200 shadow-lg rounded-2xl p-5 w-72 z-50 animate-fadeIn"
    >
      {/* Greeting section */}
      <div className="text-center mb-3">
        <p className="text-rose-700 text-sm italic font-medium">{greeting}</p>
      </div>

      {/* User info */}
      <div className="text-center border-t border-rose-200 pt-3">
        <div className="text-xl font-semibold text-rose-800 mb-1">
          {user?.name || "Sweetie 💕"}
        </div>
        <p className="text-sm text-gray-600 mb-1">
          🎓 {user?.university || "University not set"}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          🧠 Age Group: {user?.ageGroup || "—"}
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <p className="text-sm text-rose-800 mb-1">Progress</p>
          <div className="w-full h-2 bg-rose-200 rounded-full">
            <div
              className="h-2 bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(points / 2, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{points} pts</p>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-rose-400 hover:bg-rose-500 text-white py-2 rounded-full text-sm font-semibold transition shadow-md"
        >
          Logout 🚪
        </button>
      </div>
    </div>
  );
}
