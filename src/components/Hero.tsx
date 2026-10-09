import { motion } from 'motion/react';
import MarketingBanner from './MarketingBanner';

export default function Hero() {
  const clinicPhoto = "/facade-3.jpeg";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={clinicPhoto}
          alt="Clínica Columna Vertebral Salta - Quiropraxia ATLAS - Lic. Juan Antonio Villalba"
          className="absolute inset-0 w-full h-full object-cover scale-105 brightness-[1.05] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-atlas-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-32 pb-4">
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[900px] text-center"
          >
            <div className="flex flex-col items-center justify-center mb-6 relative z-10 w-full max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-11 bg-black/70 backdrop-blur-md border border-white/10 p-4 sm:pl-5 sm:pr-12 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)] w-full justify-center lg:ml-12 lg:scale-110 origin-center">
                <div className="bg-white h-16 sm:h-22 md:h-24 w-48 sm:w-64 md:w-72 px-6 py-3 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <img 
                    src="/unc-logo-v2.png" 
                    alt="UNC Logo" 
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center sm:text-left flex flex-col justify-center pb-2 sm:pb-0">
                  <span className="text-[18px] sm:text-[24px] md:text-[30px] font-black uppercase tracking-[3px] sm:tracking-[5px] text-atlas-teal leading-tight drop-shadow-xl mb-1.5">
                    Lic. J.A. Villalba
                  </span>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <span className="text-[11px] sm:text-[13px] md:text-[15px] font-bold text-atlas-white uppercase tracking-[0.05em] sm:tracking-[0.1em] leading-normal">
                      Kinesiólogo-Fisioterapeuta <span className="text-atlas-teal/50 px-1 sm:px-2">|</span> M.P 542
                    </span>
                    <span className="text-[10px] sm:text-[12px] md:text-[13.5px] text-atlas-teal font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-none">
                      Especialidad <span className="text-[#FF9900]">Quiropraxia</span>
                    </span>
                    <span className="text-[9px] sm:text-[11px] md:text-[12.5px] text-[#FF9900] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-none">
                      Técnico ortopédico del pie <span className="text-[#FF9900]/50 px-1 sm:px-2">|</span> M.P 152
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-[55px] md:text-[110px] font-black leading-[0.85] tracking-tighter mb-4 text-atlas-violet text-glow-violet italic uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Columna <br />
              Vertebral
            </h1>

            <h2 className="text-2xl md:text-5xl font-black text-white mb-8 tracking-[6px] md:tracking-[15px] uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)]">
              Quiropraxia <span className="text-atlas-violet drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] text-glow-violet select-none">ATLAS</span>
            </h2>
            
            <p className="text-lg md:text-[22px] leading-relaxed mb-12 mx-auto max-w-[855px] font-bold drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
              <span className="text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">Brindamos claridad diagnóstica, promoviendo el bienestar general y/o </span>
              <motion.span 
                animate={{ 
                  color: ["rgb(255, 0, 0)", "rgb(255, 80, 80)", "rgb(255, 0, 0)"],
                  textShadow: [
                    "0 0 10px rgba(255, 0, 0, 0.7)",
                    "0 0 25px rgba(255, 0, 0, 0.95)",
                    "0 0 10px rgba(255, 0, 0, 0.7)"
                  ]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-[#FF0000] font-black inline tracking-tight"
                style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
              >
                previniendo intervenciones quirúrgicas innecesarias.
              </motion.span> <br className="hidden md:inline" />
              <span className="text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">Aplicando </span>
              <span className="text-atlas-violet font-extrabold uppercase tracking-wider text-glow-violet drop-shadow-[0_2px_12px_rgba(168,85,247,0.7)]">quiropraxia y técnicas no invasivas</span>
              <span className="text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]"> para una recuperación natural.</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto px-4 w-full">
              {/* Turno Presencial en Salta */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 4, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative cursor-pointer group w-full"
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20presencial%20en%20Salta', '_blank')}
              >
                <div className="absolute inset-0 bg-[#FF9900]/15 blur-2xl rounded-full group-hover:bg-[#FF9900]/30 transition-colors" />
                <div className="relative bg-atlas-dark/80 backdrop-blur-md border border-[#FF9900]/40 px-6 py-6 rounded-[24px_40px_24px_40px] shadow-[0_0_30px_rgba(255,153,0,0.15)] flex flex-col items-center gap-1 group-hover:border-[#FF9900]/70 transition-all overflow-hidden h-full min-h-[140px] justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9900]/10 via-transparent to-white/5" />
                  <div className="absolute -top-3 -left-2 w-10 h-10 bg-[#FF9900]/10 rounded-full border border-[#FF9900]/10" />
                  <div className="absolute -bottom-2 -right-3 w-12 h-12 bg-[#FF9900]/10 rounded-full border border-[#FF9900]/10" />
                  
                  <div className="flex flex-col items-center mb-2 relative z-10">
                    <span className="text-[12px] md:text-[13px] font-extrabold text-[#FF9900] uppercase tracking-[4px] text-glow-orange select-none">Agende una Cita</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10 text-center px-2">
                    <span className="text-white font-black text-[16px] sm:text-[17px] md:text-[18px] leading-tight uppercase tracking-wider">
                      ATENCIÓN PRESENCIAL
                    </span>
                    <span className="text-[#FF9900] font-bold text-[11px] uppercase tracking-[3px] mt-1">
                      Salta, Argentina
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Turno Virtual */}
              <motion.div
                animate={{ 
                  y: [-6, 4, -6],
                  x: [0, -3, 0]
                }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative cursor-pointer group w-full"
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20virtual', '_blank')}
              >
                <div className="absolute inset-0 bg-atlas-violet/15 blur-2xl rounded-full group-hover:bg-atlas-violet/35 transition-colors" />
                <div className="relative bg-atlas-dark/80 backdrop-blur-md border border-atlas-violet/40 px-6 py-6 rounded-[40px_24px_40px_24px] shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col items-center gap-1 group-hover:border-atlas-violet/70 transition-all overflow-hidden h-full min-h-[140px] justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-atlas-violet/10 via-transparent to-white/5" />
                  <div className="absolute -top-3 -left-2 w-10 h-10 bg-atlas-violet/10 rounded-full border border-atlas-violet/10" />
                  <div className="absolute -bottom-2 -right-3 w-12 h-12 bg-atlas-violet/10 rounded-full border border-atlas-violet/10" />
                  
                  <div className="flex flex-col items-center mb-2 relative z-10">
                    <span className="text-[12px] md:text-[13px] font-extrabold text-[#A855F7] uppercase tracking-[4px] text-glow-violet select-none">Agende una Cita</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10 text-center px-2">
                    <span className="text-white font-black text-[16px] sm:text-[17px] md:text-[18px] leading-tight uppercase tracking-wider">
                      CONSULTA VIRTUAL
                    </span>
                    <span className="text-atlas-violet font-bold text-[11px] uppercase tracking-[3px] mt-1 text-glow-violet">
                      Consulta Online
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Plan Corporativo VIP */}
              <motion.div
                animate={{ 
                  y: [4, -4, 4],
                  x: [0, 2, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative cursor-pointer group w-full"
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Me%20interesa%20solicitar%20un%20Abordaje%20de%20An%C3%A1lisis%20Postural%2c%20Quiropr%C3%A1ctico%2c%20Ergon%C3%B3mico%20y%20Postural%20para%20una%20instituci%C3%B3n.', '_blank')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-atlas-violet/25 via-transparent to-[#FF9900]/25 blur-2xl rounded-full group-hover:from-atlas-violet/40 group-hover:to-[#FF9900]/40 transition-all pointer-events-none" />
                <div className="relative bg-black/85 backdrop-blur-md border-2 border-atlas-violet/60 px-6 py-6 rounded-[24px_24px_50px_24px] shadow-[0_0_40px_rgba(168,85,247,0.35)] flex flex-col items-center gap-1 group-hover:border-atlas-gold transition-all overflow-hidden h-full min-h-[140px] justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-atlas-violet/15 via-transparent to-[#FF9900]/15" />
                  <div className="absolute -top-3 -left-2 w-10 h-10 bg-atlas-violet/20 rounded-full border border-atlas-violet/30" />
                  <div className="absolute -bottom-2 -right-3 w-12 h-12 bg-[#FF9900]/20 rounded-full border border-[#FF9900]/30" />
                  
                  <div className="flex flex-col items-center mb-2 relative z-10">
                    <span className="text-[12px] md:text-[13px] font-black text-atlas-violet uppercase tracking-[3px] text-glow-violet select-none">SERVICIO ESPECIAL</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10 text-center px-1">
                    <span className="text-white font-black text-[16px] sm:text-[17px] md:text-[18px] leading-tight uppercase tracking-wider">
                      PLAN CORPORATIVO
                    </span>
                    <span className="text-atlas-teal font-extrabold text-[11px] uppercase tracking-[2.5px] mt-1 text-glow-teal">
                      Instituciones
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="inline-block px-8 py-3 glass border-atlas-teal/30 rounded-full mb-8">
              <p className="text-[11px] md:text-[13px] text-atlas-teal font-black uppercase tracking-[3px]">
                Servicio, Prevención y Educación desde el 2011
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Marketing Footer */}
      <div className="w-full mt-auto relative z-20">
        <MarketingBanner />
      </div>
    </section>
  );
}
