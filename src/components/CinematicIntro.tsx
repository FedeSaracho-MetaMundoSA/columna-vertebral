import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'pain' | 'adjustment' | 'relief' | 'complete'>('pain');

  useEffect(() => {
    console.log('CinematicIntro mounted');
    const timers = [
      setTimeout(() => { console.log('Phase: adjustment'); setPhase('adjustment') }, 2500),
      setTimeout(() => { console.log('Phase: relief'); setPhase('relief') }, 3500),
      setTimeout(() => { console.log('Phase: complete'); setPhase('complete') }, 5500),
      setTimeout(() => { console.log('Intro complete calling onComplete'); onComplete() }, 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden perspective-[1000px]"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center [transform-style:preserve-3d]">
        {/* Skeleton Spine Visual */}
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-1 [transform:rotateX(20deg)]">
          {[...Array(24)].map((_, i) => {
            // Anatomical variations
            const isLumbar = i > 16;
            const isThoracic = i > 7 && i <= 16;
            const isCervical = i <= 7;
            
            // Width variation: Lumbar is widest, Cervical is narrowest
            const baseWidth = isLumbar ? 60 : isThoracic ? 50 : 35;
            // S-Curve calculation
            const curveOffset = Math.sin(i * 0.3) * 15;

            return (
              <motion.div
                key={i}
                className="relative flex items-center justify-center"
                style={{ height: isLumbar ? '14px' : '10px' }}
                initial={{ opacity: 0, x: curveOffset }}
                animate={{ 
                  x: curveOffset,
                  opacity: phase === 'pain' ? [0.4, 0.8, 0.4] : 1,
                }}
                transition={{ delay: i * 0.03 }}
              >
                {/* Transverse Processes (Side Wings) */}
                <motion.div 
                  className="absolute h-1 bg-white/10 rounded-full"
                  animate={{ 
                    width: baseWidth + 40,
                    backgroundColor: phase === 'pain' && i > 14 && i < 20 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.1)'
                  }}
                />
                
                {/* Vertebral Body */}
                <motion.div
                  className="rounded-[4px] border border-white/10 relative z-10"
                  animate={{ 
                    width: baseWidth,
                    height: isLumbar ? '10px' : '7px',
                    backgroundColor: phase === 'pain' && i > 14 && i < 20
                      ? 'rgba(239, 68, 68, 0.9)' // Intense red in pain zone
                      : phase === 'relief' || phase === 'complete'
                      ? 'rgba(34, 197, 94, 0.8)' // Green
                      : 'rgba(255, 255, 255, 0.4)',
                    boxShadow: phase === 'pain' && i > 14 && i < 20
                      ? '0 0 25px rgba(239, 68, 68, 0.8)'
                      : phase === 'relief' || phase === 'complete'
                      ? '0 0 30px rgba(34, 197, 94, 0.6)'
                      : 'none',
                  }}
                  transition={{ 
                    duration: phase === 'pain' ? 1 : 0.5,
                    repeat: phase === 'pain' && i > 14 && i < 20 ? Infinity : 0
                  }}
                />

                {/* Spinous Process (Center Detail) */}
                <div className="absolute w-2 h-2 bg-white/20 rounded-full z-20" />
              </motion.div>
            );
          })}

          {/* Hands Animation - Silhouettes */}
          <AnimatePresence>
            {phase === 'adjustment' && (
              <>
                <motion.div 
                  initial={{ x: -150, opacity: 0, rotate: -30 }}
                  animate={{ x: -40, opacity: 0.6, rotate: -10 }}
                  exit={{ x: -150, opacity: 0 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 text-atlas-teal pointer-events-none"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-20">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                </motion.div>
                <motion.div 
                  initial={{ x: 150, opacity: 0, rotate: 30 }}
                  animate={{ x: 40, opacity: 0.6, rotate: 10 }}
                  exit={{ x: 150, opacity: 0 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 text-atlas-teal pointer-events-none scale-x-[-1]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-20">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Green Wave Effect - Spreading from center */}
          <AnimatePresence>
            {phase === 'relief' && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 3], opacity: [0, 0.8, 0] }}
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-[80px] z-20"
                transition={{ duration: 2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Text Overlays */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <AnimatePresence mode="wait">
            {phase === 'pain' && (
              <motion.p 
                key="pain-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 font-bold tracking-[4px] uppercase text-sm"
              >
                Detectando Tensión Crónica
              </motion.p>
            )}
            {phase === 'adjustment' && (
              <motion.p 
                key="adj-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-atlas-teal font-bold tracking-[4px] uppercase text-sm"
              >
                Realizando Ajuste de Precisión
              </motion.p>
            )}
            {(phase === 'relief' || phase === 'complete') && (
              <motion.p 
                key="relief-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-500 font-bold tracking-[4px] uppercase text-sm"
              >
                Función Restaurada • Alivio ATLAS
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-atlas-teal/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-full bg-gradient-to-t from-red-500/5 to-transparent blur-[120px] opacity-30" />
      </div>
    </motion.div>
  );
}
