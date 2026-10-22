import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageCircle, X, Phone, UserCheck, Sparkles, Stethoscope } from 'lucide-react';

export default function AIAvatarWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 sm:gap-4 items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[calc(100vw-1.5rem)] max-w-[320px] bg-atlas-dark/95 backdrop-blur-xl border border-atlas-violet/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative pointer-events-auto mb-2 sm:mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-atlas-violet/10 via-transparent to-atlas-teal/5 pointer-events-none" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/40 hover:text-white transition-colors z-10 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4 border-b border-white/5 pb-3 sm:pb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-atlas-violet/50 bg-black relative shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                  <img src="/logo-atlas.jpeg" alt="Lic. Villalba" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-atlas-violet/10 mix-blend-overlay" />
                </div>
                <div>
                  <h4 className="text-[13px] sm:text-[14px] font-black text-white uppercase tracking-[1px] italic">Asistente Atlas</h4>
                  <p className="text-[8.5px] sm:text-[9px] text-atlas-teal flex items-center gap-1 uppercase tracking-widest font-black">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Gemini AI Activa
                  </p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/10">
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-bold italic">
                  "Hola, soy el asistente especializado del Lic. Villalba. Mi base de conocimientos está optimizada para orientarte sobre salud espinal y el método Atlas. ¿Qué consulta tienes hoy?"
                </p>
              </div>
              
              <button 
                className="w-full py-2.5 sm:py-3 bg-atlas-violet text-white rounded-xl text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] font-black shadow-[0_5px_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20hablar%20con%20un%20asesor%20humano%20sobre%20mi%20caso', '_blank')}
              >
                Hablar con un Humano
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 sm:gap-4 pointer-events-auto items-center">
        {/* Floating WhatsApp Quick Action */}
        <motion.button
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20o%20hacer%20una%20consulta', '_blank')}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-600 shadow-[0_0_20px_rgba(22,163,74,0.4)] flex items-center justify-center text-white border border-white/10 cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* AI Doctor Avatar Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08, y: -3, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-atlas-dark border-2 border-atlas-violet shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center relative group overflow-hidden cursor-pointer"
          aria-label="Abrir Asistente Atlas"
        >
          <div className="absolute inset-0 bg-atlas-violet/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {isOpen ? (
            <X className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-atlas-violet group-hover:text-white transition-colors" />
              <Stethoscope className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 w-3 h-3 sm:w-4 sm:h-4 text-atlas-teal group-hover:text-white" />
              <Sparkles className="absolute -top-1 -left-2.5 sm:-left-3 w-2.5 h-2.5 sm:w-3 sm:h-3 text-atlas-gold animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
