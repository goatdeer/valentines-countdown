"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showTick, setShowTick] = useState(false);
  const [tickLeaving, setTickLeaving] = useState(false);

  // Configuration for the text cycle
  const steps = [
    { text: "Checking your pie number...", duration: 1000 },
    { text: "Validating your pie...", duration: 2000 },
    { text: "Stealing your pie information...", duration: 3000 },
    { text: "Pairing you with a pie...", duration: 3000 },
    { text: "Mr fluffy scratches you...", duration: 1000 },
    { text: "Pie paired!", duration: 1000 },
  ];

  useEffect(() => {
    // If we have finished all steps, show the tick
    if (step >= steps.length) {
      setShowTick(true);

      // After 1 second of showing tick, shoot it up
      setTimeout(() => {
        setTickLeaving(true);
        
        // After animation finishes (another 0.5s), redirect
        setTimeout(() => {
          router.push("/success");
        }, 500);
      }, 1000);
      
      return;
    }

    // Move to next step after current duration
    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, steps[step].duration);

    return () => clearTimeout(timer);
  }, [step, router, steps.length]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white font-sans overflow-hidden relative">
      
      {!showTick ? (
        // --- LOADING STATE ---
        <div className="flex flex-col items-center animate-in fade-in duration-500">
          {/* Spinner Container */}
          <div className="relative w-24 h-24 mb-8">
            {/* Spinning Ring */}
            <div className="absolute inset-0 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            
            {/* Centered Pie Emoji */}
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              🥧
            </div>
          </div>

          {/* Cycling Text */}
          <h2 className="text-xl font-medium text-gray-700 animate-pulse">
            {steps[step]?.text || "Processing..."}
          </h2>
        </div>
      ) : (
        // --- SUCCESS STATE (TICK) ---
        <div 
          className={`transform transition-all duration-700 ease-in-out ${
            tickLeaving ? "-translate-y-[150vh] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="text-[120px] leading-none select-none filter drop-shadow-xl animate-bounce">
            ✅
          </div>
        </div>
      )}
    </main>
  );
}