import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const messages = [
  "EVITAR CIRUGÍAS INNECESARIAS",
  "TRATAMIENTOS NO INVASIVOS",
  "EVITAR MEDICACIONES EXCESIVAS",
  "ABORDAJE NO INVASIVO E NATURAL",
  "RECUPEAR TU MOVILIDAD HOY",
  "QUIROPRAXIA PROFESIONAL SALTA"
];

export default function MarketingBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Random interval between 1 and 4 seconds as requested
    const randomInterval = Math.floor(Math.random() * (4000 - 1000 + 1) + 1000);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500); // Keeping it fast and snappy
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="w-full py-3 sm:py-4 overflow-hidden relative border-y border-white/5 bg-atlas-dark/75 backdrop-blur-md">
      <div className="container mx-auto px-4 flex justify-center items-center min-h-[44px] h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center px-2"
          >
            <h3 className="text-white font-black text-xs sm:text-base md:text-2xl tracking-[1.5px] sm:tracking-[4px] md:tracking-[8px] text-center uppercase leading-snug">
              {messages[index]}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
