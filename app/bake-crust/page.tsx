"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation"; // Import the router

export default function BakeTheCrust() {
  const router = useRouter(); // Initialize router
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState<"visa" | "mastercard" | null>(null);
  const [expDate, setExpDate] = useState("");

  // --- CARD NUMBER LOGIC ---
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCardNumber(val);

    if (val.startsWith("4")) {
      setCardType("visa");
    } else if (val.startsWith("5")) {
      setCardType("mastercard");
    } else {
      setCardType(null);
    }
  };

  // --- EXPIRATION DATE LOGIC ---
  const handleExpDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");

    if (val.length > 4) val = val.slice(0, 4);

    if (val.length >= 1 && parseInt(val[0]) > 1) return;
    if (val.length >= 2) {
      const month = parseInt(val.slice(0, 2));
      if (month === 0 || month > 12) val = val.slice(0, 1);
    }
    if (val.length >= 3) {
      const y1 = parseInt(val[2]);
      if (![2, 3, 4].includes(y1)) return;
    }
    if (val.length === 4) {
      const year = parseInt(val.slice(2, 4));
      if (year < 26 || year > 40) return;
    }

    if (val.length > 2) {
      setExpDate(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setExpDate(val);
    }
  };

  const handleExpKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && expDate.endsWith("/")) {
      e.preventDefault();
      setExpDate(expDate.slice(0, -2));
    }
  };

  // --- REDIRECT FUNCTION ---
  const handleBakeNow = () => {
    router.push("/processing"); // Redirects to the new animation page
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-900 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">Payment Details</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={16}
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
                {cardType && (
                  <span className="text-2xl leading-none animate-in fade-in zoom-in duration-200 select-none">
                    🥧
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Exp. Date
              </label>
              <input
                type="text"
                value={expDate}
                onChange={handleExpDateChange}
                onKeyDown={handleExpKeyDown}
                placeholder="MM / YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
            <div className="w-1/2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                CVV
              </label>
              <input
                type="text"
                maxLength={3}
                placeholder="123"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Pieholder Name
            </label>
            <input
              type="text"
              placeholder="Pizza Party"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* UPDATED BUTTON WITH ONCLICK */}
          <button
            onClick={handleBakeNow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            Bake Now (S$67.67)
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4">
            Secured by the protection order of Yipland and Yipquarters
          </p>
        </div>
      </div>
    </main>
  );
}