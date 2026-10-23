import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, UserCheck, Sparkles, Stethoscope } from 'lucide-react';

export default function AIAvatarWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="w-[calc(100vw-2rem)] max-w-[320px] bg-neutral-950/95 backdrop-blur-xl border border-atlas-violet/40 rounded-2xl p-4 shadow-2xl overflow-hidden relative pointer-events-auto mb-3"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-atlas-violet/50 bg-black relative shrink-0">
                  <img src="/logo-atlas.jpeg" alt="Lic. Villalba" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Asistente Atlas</h4>
                  <p className="text-[9px] text-teal-400 flex items-center gap-1 font-bold uppercase tracking-wider mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Gemini AI Activa
                  </p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-xs text-neutral-200 leading-relaxed font-medium italic">
                  "Hola, soy el asistente especializado del Lic. Villalba. Puedo orientarte sobre salud espinal y el Método Atlas. ¿En qué puedo ayudarte?"
                </p>
              </div>
              
              <button 
                className="w-full py-2 bg-atlas-violet hover:bg-violet-600 text-white rounded-xl text-xs uppercase tracking-wider font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20hablar%20con%20un%20asesor%20humano%20sobre%20mi%20caso', '_blank')}
              >
                Hablar con un Humano
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Floating WhatsApp Quick Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20o%20hacer%20una%20consulta', '_blank')}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 shadow-xl flex items-center justify-center text-white border border-emerald-400/40 cursor-pointer active:scale-90 transition-all"
          aria-label="Contactar por WhatsApp"
        >
          <Phone className="w-5 h-5" />
        </motion.button>

        {/* AI Doctor Avatar Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-900 border border-atlas-violet/60 shadow-xl flex items-center justify-center relative cursor-pointer active:scale-90 transition-all"
          aria-label="Abrir Asistente Atlas"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-atlas-violet" />
              <Stethoscope className="absolute -top-1 -right-1 w-2.5 h-2.5 text-teal-400" />
              <Sparkles className="absolute -top-1 -left-1 w-2 h-2 text-amber-400 animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
