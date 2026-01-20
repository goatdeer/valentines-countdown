"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  // --- STATE FOR LOADING SCREEN ---
  const [introFinished, setIntroFinished] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Fresh from the oven...";

  // --- STATE FOR COUNTDOWN ---
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 1. Handle the Typewriter Effect
  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setDisplayText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait 1 second after typing finishes, then show the real page
        setTimeout(() => {
          setIntroFinished(true);
        }, 1000);
      }
    }, 100); // Speed of typing (100ms per letter)

    return () => clearInterval(typingInterval);
  }, []);

  // 2. Handle the Countdown Timer
  useEffect(() => {
    const getTargetDate = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const valentines = new Date(currentYear, 1, 14); // Feb 14

      if (now.getTime() > valentines.getTime()) {
        valentines.setFullYear(currentYear + 1);
      }
      return valentines;
    };

    const targetDate = getTargetDate();

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- RENDER LOGIC ---

  // If the intro isn't finished, show the Loading Screen
  if (!introFinished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50">
        <h1 className="text-3xl md:text-5xl font-mono text-pink-600 font-bold">
          {displayText}
          <span className="animate-pulse">|</span> {/* Blinking Cursor */}
        </h1>
      </div>
    );
  }

  // Once finished, show the Main Countdown Content
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 text-red-900 p-4 animate-in fade-in duration-700">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-pink-600">
        Pay to bake the crust before it's too late!
      </h1>

      {/* Countdown Display */}
      <div className="grid grid-cols-4 gap-4 mb-12 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="flex flex-col p-4 bg-white rounded-lg shadow-md min-w-[80px]"
          >
            <span className="text-3xl font-mono font-bold text-red-500">
              {value.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-500">
              {unit}
            </span>
          </div>
        ))}
      </div>

      {/* Redirection Button */}
      {/* CHANGE THIS LINK FROM "/bake-crust" TO "/preheating" */}
      <Link href="/preheating"> 
        <button className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Bake the crust
        </button>
      </Link>
    </main>
  );
}