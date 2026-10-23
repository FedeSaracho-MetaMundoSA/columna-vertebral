import { motion } from 'motion/react';
import { MapPin, Video, Building2, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import MarketingBanner from './MarketingBanner';

export default function Hero() {
  const clinicPhoto = "/facade-3.jpeg";

  return (
    <section className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-between overflow-x-hidden pt-14 sm:pt-20 bg-[#09090b]">
      {/* Background Layer with Dark Gradient Overlay for Maximum Legibility */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={clinicPhoto}
          alt="Clínica Columna Vertebral Salta - Quiropraxia ATLAS"
          className="absolute inset-0 w-full h-full object-cover scale-105 brightness-[0.35] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/95 via-[#09090b]/80 to-[#09090b]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 pt-4 sm:pt-6 pb-6 flex-1 flex flex-col justify-center">
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-center w-full flex flex-col items-center"
          >
            {/* UNC Professional Credentials Card - Responsive Mobile & Desktop Layout */}
            <div className="w-full max-w-xl mb-4 sm:mb-6">
              <div className="bg-black/85 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 text-center sm:text-left">
                {/* UNC Logo */}
                <div className="bg-white h-10 sm:h-14 w-28 sm:w-40 px-2 py-1 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                  <img 
                    src="/unc-logo-v2.png" 
                    alt="Universidad Nacional de Córdoba" 
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Doctor Credentials */}
                <div className="flex flex-col justify-center w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
                    <span className="text-sm sm:text-lg font-black uppercase tracking-wider text-teal-400">
                      Lic. Juan Antonio Villalba
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-neutral-200 uppercase tracking-tight">
                    Kinesiólogo - Fisioterapeuta <span className="text-teal-500 font-normal">|</span> M.P. 542
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-0.5 mt-1 text-[10px] sm:text-[11px] font-extrabold uppercase">
                    <span className="text-amber-400">Especialidad Quiropraxia</span>
                    <span className="text-neutral-500 hidden sm:inline">•</span>
                    <span className="text-teal-300">Técnico Ortopédico del Pie <span className="text-neutral-400 font-normal">| M.P. 152</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Section Heading - Dynamic Viewport Clamp */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mb-2 text-white italic uppercase drop-shadow-md">
              Columna <span className="text-atlas-violet text-glow-violet">Vertebral</span>
            </h1>

            <h2 className="text-xs sm:text-base md:text-xl font-extrabold text-atlas-teal uppercase tracking-[2px] sm:tracking-[4px] mb-3 sm:mb-5">
              Quiropraxia ATLAS • Salta Capital
            </h2>

            {/* Clear, High-Contrast Mission Statement */}
            <p className="text-xs sm:text-base leading-relaxed text-neutral-200 font-medium max-w-2xl mx-auto mb-5 sm:mb-7 px-2">
              Brindamos claridad diagnóstica para promover el bienestar general y{' '}
              <strong className="text-white font-black underline decoration-atlas-teal decoration-2 underline-offset-4">
                prevenir intervenciones quirúrgicas innecesarias
              </strong>
              . Aplicamos quiropraxia y técnicas no invasivas para una recuperación natural.
            </p>

            {/* 3 Main Action Cards - Full 100% Mobile Scale with Thumb Hitboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-3xl mb-5 sm:mb-6">
              {/* Turno Presencial */}
              <button
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20presencial%20en%20Salta', '_blank')}
                className="group relative bg-neutral-900/90 hover:bg-neutral-900 backdrop-blur-md border border-amber-500/30 hover:border-amber-500/70 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-left transition-all shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400 block">Presencial</span>
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide">Atención en Salta</h3>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-400">Turno en consultorio</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* Consulta Virtual */}
              <button
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20virtual', '_blank')}
                className="group relative bg-neutral-900/90 hover:bg-neutral-900 backdrop-blur-md border border-atlas-violet/30 hover:border-atlas-violet/70 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-left transition-all shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-atlas-violet/10 border border-atlas-violet/20 flex items-center justify-center shrink-0 text-atlas-violet">
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-atlas-violet block">A Distancia</span>
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide">Consulta Virtual</h3>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-400">Para todo el país</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-atlas-violet group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* Plan Corporativo */}
              <button
                onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Me%20interesa%20solicitar%20un%20Plan%20Corporativo%20para%20una%20instituci%C3%B3n.', '_blank')}
                className="group relative bg-neutral-900/90 hover:bg-neutral-900 backdrop-blur-md border border-teal-500/30 hover:border-teal-500/70 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-left transition-all shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 text-teal-400">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-teal-400 block">Institucional</span>
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide">Plan Empresas</h3>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-400">Ergonomía laboral</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>

            {/* Quality Seal Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 text-neutral-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Servicio, Prevención y Educación desde el 2011</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ticker Banner */}
      <div className="w-full mt-auto relative z-20">
        <MarketingBanner />
      </div>
    </section>
  );
}
