"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  // Logic for the "Accept" button
  const handleAccept = () => {
    setAccepted(true);
  };

  // Logic for the "Reject" button
  const handleReject = () => {
    alert("System Error: Pie cannot be rejected. You will now BOOOOOOM.");
  };

  const handleClaim = () => {
    router.push("/calculating-prize");
  };

  // --- GOOGLE CALENDAR LINK ---
  const handleGoogleCalendar = () => {
    const eventTitle = encodeURIComponent("Pie Date & Yip at Yipland");
    const eventDetails = encodeURIComponent("Please report for a pie date followed by a yip.");
    const eventLocation = encodeURIComponent("Yipland");
    const eventDates = "20260213T190000/20260213T230000";
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDates}&details=${eventDetails}&location=${eventLocation}`;
    window.open(url, "_blank");
  };

  // --- APPLE / IOS CALENDAR FILE (.ics) ---
  const handleAppleCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20260213T190000",
      "DTEND:20260213T230000",
      "SUMMARY:Pie Date & Yip at Yipland",
      "DESCRIPTION:Please report for a pie date followed by a yip.",
      "LOCATION:Yipland",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "yip-date.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4 transition-colors duration-500">
      
      {/* SUCCESS STATE (Modal) */}
      {accepted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 transform animate-in zoom-in duration-300">
            <div className="text-6xl mb-4">🎉🥧❤️</div>
            
            <h2 className="text-xl font-bold text-pink-600 mb-2 leading-snug">
              Please report for a pie date on <span className="underline decoration-wavy">13 Feb 1900</span> followed by a yip at yipland.
            </h2>
            
            <p className="text-gray-600 text-sm mb-6">
              Your Pielentine has been notified. 
              <br/>(Pizza Party Included)
            </p>
            
            <div className="flex flex-col gap-3">
              {/* Claim Prize - UPDATED TO BABY PINK GRADIENT */}
              <button 
                onClick={handleClaim}
                className="w-full px-8 py-3 bg-gradient-to-r from-pink-300 to-pink-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Claim your Prize 🎁
              </button>

              {/* CALENDAR BUTTONS GRID */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleGoogleCalendar}
                  className="px-4 py-2 bg-white text-blue-600 border border-blue-200 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm"
                >
                  Google Cal
                </button>
                
                <button 
                  onClick={handleAppleCalendar}
                  className="px-4 py-2 bg-black text-white border border-gray-800 font-bold rounded-xl hover:bg-gray-800 transition-all text-sm flex items-center justify-center gap-1"
                >
                   Apple Cal
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white">
        <div className="bg-pink-100 py-4 text-center">
          <h1 className="text-2xl font-bold text-pink-600 uppercase tracking-widest">
            Your Pie Match
          </h1>
        </div>
        <div className="relative aspect-[3/4] w-full bg-gray-200">
          <img 
            src="/me.jpg" 
            alt="Your Pie Match" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 text-center space-y-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">20 years aged Pie, 180 pie metres</h2>
            <p className="text-xl text-amber-600 font-medium">Chocolate covered strawberry Letao Cheesecake Pie</p>
          </div>
          <hr className="border-pink-100" />
          <div className="py-2">
            <p className="text-2xl font-handwriting font-bold text-pink-500 animate-pulse">
              "Will you be his Pielentine?"
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleReject}
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 py-3 px-4 bg-pink-500 text-white font-bold rounded-xl shadow-lg hover:bg-pink-600 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Accept ❤️
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}