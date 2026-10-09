import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageCircle, X, Phone, UserCheck, Sparkles, Stethoscope } from 'lucide-react';

export default function AIAvatarWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[320px] bg-atlas-dark/95 backdrop-blur-xl border border-atlas-violet/30 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative pointer-events-auto mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-atlas-violet/10 via-transparent to-atlas-teal/5 pointer-events-none" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-atlas-violet/50 bg-black relative shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <img src="/logo-atlas.jpeg" alt="Lic. Villalba" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-atlas-violet/10 mix-blend-overlay" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-white uppercase tracking-[1px] italic">Asistente Atlas</h4>
                  <p className="text-[9px] text-atlas-teal flex items-center gap-1 uppercase tracking-widest font-black">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Gemini AI Activa
                  </p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[13px] text-white/90 leading-relaxed font-bold italic">
                  "Hola, soy el asistente especializado del Lic. Villalba. Mi base de conocimientos está optimizada para orientarte sobre salud espinal y el método Atlas. ¿Qué consulta tienes hoy?"
                </p>
              </div>
              
              <button 
                className="w-full py-3 bg-atlas-violet text-white rounded-xl text-[11px] uppercase tracking-[2px] font-black shadow-[0_5px_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-transform"
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20hablar%20con%20un%20asesor%20humano%20sobre%20mi%20caso', '_blank')}
              >
                Hablar con un Humano
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 pointer-events-auto">
        {/* Floating WhatsApp Quick Action */}
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20o%20hacer%20una%20consulta', '_blank')}
          className="w-14 h-14 rounded-2xl bg-green-600 shadow-[0_0_20px_rgba(22,163,74,0.4)] flex items-center justify-center text-white border border-white/10"
        >
          <Phone className="w-6 h-6" />
        </motion.button>

        {/* AI Doctor Avatar Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-3xl bg-atlas-dark border-2 border-atlas-violet shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-atlas-violet/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {isOpen ? (
            <X className="w-8 h-8 text-white relative z-10" />
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <UserCheck className="w-8 h-8 text-atlas-violet group-hover:text-white transition-colors" />
              <Stethoscope className="absolute -top-3 -right-3 w-4 h-4 text-atlas-teal group-hover:text-white" />
              <Sparkles className="absolute -top-1 -left-3 w-3 h-3 text-atlas-gold animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
