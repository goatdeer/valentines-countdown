"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["800"], 
});

const MESSAGES = [
  "Calculating Pie Goodness",
  "Checking Doneness",
  "Analyzing Crust Integrity",
  "Stealing Pie Recipes",
  "Matching Prize Algorithm",
  "Calibrating Sweetness",
  "Verifying Fluffiness",
  "Compiling Love Metrics",
  "Allocating Hug Resources",
  "Optimizing Cuteness",
  "Encrypting Pie Data",
  "Synchronizing Hearts",
];

export default function CalculatingPrize() {
  const router = useRouter();
  const [text, setText] = useState(MESSAGES[0]);
  const [phase, setPhase] = useState<"cycling" | "exploding" | "result">("cycling");
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(2); 

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let iteration = 0;
    
    // CONFIGURATION
    const TOTAL_ITERATIONS = 25; 
    let currentSpeed = 1100; 

    const runCycle = () => {
      const nextMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setText(nextMsg);
      setCount((c) => c + 1);
      iteration++;

      // Progress Logic
      const rawProgress = (iteration / TOTAL_ITERATIONS) * 100;
      const newProgress = Math.min(98, rawProgress);
      setProgress(newProgress);

      // Speed Logic
      if (currentSpeed > 200) {
        currentSpeed -= 40; 
      } else {
        currentSpeed = 200; 
      }

      // Trigger Finish
      if (iteration >= TOTAL_ITERATIONS) {
        setProgress(100); 
        setPhase("exploding");
        setTimeout(() => {
          setPhase("result");
          setTimeout(() => router.push("/prize"), 3500);
        }, 2000); // Wait 2s for full explosion effect
        return;
      }
      
      timeoutId = setTimeout(runCycle, currentSpeed);
    };

    runCycle();
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-zinc-950 overflow-hidden relative px-8 ${inter.className}`}>
      
      {/* PHASE 1: TEXT & LARGE PROGRESS BAR */}
      <AnimatePresence mode="wait">
        {phase === "cycling" && (
          <div className="w-full max-w-4xl z-10 flex flex-col gap-8">
            
            {/* LAYOUT FIX: 
                Added a fixed height (h-32) and flex-end alignment.
                This ensures the container size never changes, preventing the progress bar from jumping.
            */}
            <div className="h-32 flex flex-col justify-end">
              <motion.div
                key={count}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-left"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-none">
                  {text}...
                </h1>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
               <div className="flex justify-between text-zinc-500 font-mono text-xs mb-2 tracking-widest uppercase">
                  <span>System Processing</span>
                  <span>{Math.round(progress)}%</span>
               </div>
               
               <div className="h-6 md:h-8 w-full bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-lime-400 origin-left"
                    initial={{ width: "2%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.8 }}
                  />
               </div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* PHASE 2: REALISTIC EXPLOSION */}
      {phase === "exploding" && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          
          {/* 1. The Flashbang (Instant White Screen) */}
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute inset-0 bg-white z-[60]"
          />

          {/* 2. Primary Shockwave (Fast) */}
          <motion.div
            initial={{ scale: 0, opacity: 1, borderWidth: "150px" }}
            animate={{ scale: 3, opacity: 0, borderWidth: "0px" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute w-[80vw] h-[80vw] rounded-full border-lime-300 border-solid z-40 mix-blend-screen"
          />
          
          {/* 3. Secondary Shockwave (Slight Delay) */}
          <motion.div
            initial={{ scale: 0, opacity: 0.8, borderWidth: "100px" }}
            animate={{ scale: 2.5, opacity: 0, borderWidth: "0px" }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.1 }}
            className="absolute w-[60vw] h-[60vw] rounded-full border-white border-solid z-30 opacity-50"
          />

          {/* 4. High Velocity Debris (Streaks) */}
          {[...Array(60)].map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
      )}

      {/* PHASE 3: RESULT */}
      {phase === "result" && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative z-10 text-center"
        >
          <div className="text-9xl mb-4">✅</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2 uppercase">
            baked!
          </h1>
          <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase animate-pulse">
            redirecting to yipland
          </p>
        </motion.div>
      )}
    </main>
  );
}

// --- PARTICLE PHYSICS SYSTEM ---
function Particle({ index }: { index: number }) {
  const randomAngle = Math.random() * 360;
  // Increase distance significantly (800-1500px) so they fly OFF screen
  const randomDistance = 800 + Math.random() * 800;
  const randomDelay = Math.random() * 0.2;
  
  return (
    <motion.div
      initial={{ 
        x: 0, 
        y: 0, 
        scale: 0.5, 
        opacity: 1,
        rotate: randomAngle // Start rotated to match direction
      }}
      animate={{ 
        x: Math.cos(randomAngle * (Math.PI / 180)) * randomDistance,
        y: Math.sin(randomAngle * (Math.PI / 180)) * randomDistance,
        scale: [1, 2, 0], // Grow then shrink
        opacity: 0,
        // Stretch the particle as it flies to create a "streak" blur effect
        width: ["4px", "50px", "10px"], 
      }}
      transition={{ 
        duration: 1.2, 
        ease: "circOut",
        delay: randomDelay 
      }}
      className="absolute h-1 bg-gradient-to-r from-white via-lime-300 to-transparent rounded-full z-50 origin-left"
    />
  );
}