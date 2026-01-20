"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["900"], // Extra Black for heavy hipster look
});

const STEPS = [
  "IGNITING BURNERS",
  "PREHEATING TO 180°C",
  "SIFTING FLOUR",
  "GREASING THE TIN",
  "OVEN READY"
];

export default function PreheatingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 1. Text Cycle Logic
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    // 2. Redirect Logic (Total time: 4 seconds)
    const timer = setTimeout(() => {
      router.push("/bake-crust");
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 ${inter.className}`}>
      
      {/* HEAT WAVE ANIMATION */}
      <div className="relative w-full max-w-lg h-64 flex items-center justify-center mb-12">
        {/* Three expanding heat rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
            className="absolute w-48 h-48 rounded-full border-4 border-orange-500/50 blur-sm"
          />
        ))}
        
        {/* Center Glow */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative w-32 h-32 bg-gradient-to-tr from-red-600 to-orange-400 rounded-full blur-md flex items-center justify-center shadow-[0_0_50px_rgba(255,100,0,0.6)]"
        >
           <span className="text-4xl">🔥</span>
        </motion.div>
      </div>

      {/* TEXT DISPLAY */}
      <div className="h-20 flex items-center justify-center overflow-hidden">
         <motion.h1
            key={currentStep}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 tracking-tighter uppercase text-center"
         >
           {STEPS[currentStep]}
         </motion.h1>
      </div>

      {/* TEMPERATURE BAR */}
      <div className="w-64 h-2 bg-zinc-800 rounded-full mt-8 overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full bg-orange-500"
        />
      </div>

    </main>
  );
}