"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google"; // Import Inter

// Configure Inter (Modern / Swiss Look)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Optional: allows CSS variable usage
});

export default function PrizePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // TARGET DATE: Feb 14, 2026 at 00:00:00
    // Note: Month is 0-indexed (0=Jan, 1=Feb)
    const targetDate = new Date(2026, 1, 14, 0, 0, 0);

    const checkTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
        // Calculate days/hours/mins for display
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    // Check immediately and then every second
    checkTime();
    const timer = setInterval(checkTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-white text-center ${inter.className}`}>
      
      {isUnlocked ? (
        // --- UNLOCKED STATE (Visible after Feb 14, 00:00) ---
        <div className="animate-in zoom-in duration-700 space-y-8 max-w-2xl">
          <div className="text-9xl animate-bounce">🎁</div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-yellow-400 uppercase">
            Prize Unlocked
          </h1>
          
          <div className="p-10 bg-zinc-900 rounded-3xl border-2 border-zinc-800 shadow-2xl">
            <h2 className="text-xl font-bold tracking-widest text-zinc-500 uppercase mb-6">
              Official Pie Assignment
            </h2>
            
            <div className="space-y-6">
              <p className="text-3xl md:text-5xl font-extrabold text-pink-400 leading-tight">
                Infinite Hugs Coupon
              </p>
              <div className="text-2xl text-zinc-600 font-bold">+</div>
              <p className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                A Mrs Fluffy!
              </p>
            </div>

            <p className="mt-8 text-xs font-mono text-zinc-600 uppercase tracking-widest">
              ID: PIE-VAL-2026 • Non-refundable • Valid Immediately
            </p>
          </div>
        </div>
      ) : (
        // --- LOCKED STATE (Visible NOW) ---
        <div className="space-y-8 max-w-lg">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <span className="text-8xl animate-pulse grayscale opacity-50">🔒</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              Top Secret Pieze
            </h1>
            <p className="text-zinc-500 font-medium">
              Secured by Yipquarters Protocol v2.0
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-4">
              Time until access
            </p>
            <p className="text-3xl md:text-5xl font-mono font-bold text-lime-400 tabular-nums tracking-tight">
              {timeLeft}
            </p>
          </div>

          <div className="text-xs text-zinc-700 font-mono uppercase tracking-widest mt-12">
            Status: Locked • Clearance: Pielentine Only
          </div>
        </div>
      )}
    </main>
  );
}