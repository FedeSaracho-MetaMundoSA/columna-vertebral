import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, FileText, Stethoscope, Sparkles, ShieldCheck, Heart, AlertCircle, ClipboardList, Activity, Home } from 'lucide-react';

export default function Services() {
  return (
    <div className="flex flex-col gap-8 sm:gap-12 w-full">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-atlas-violet/10 border border-atlas-violet/30 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-atlas-violet animate-pulse" />
          <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-[2.5px] sm:tracking-[3px] text-atlas-violet">Abordaje Especializado</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white italic uppercase tracking-[1px] drop-shadow-md">
          Nuestros <span className="text-atlas-violet text-glow-violet">Servicios</span>
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
          Protocolo integral de cuidado y recuperación diseñado meticulosamente para diagnosticar con total exactitud, neutralizar el dolor de raíz, y reestablecer la armonía biomecánica de tu columna de forma no invasiva.
        </p>
      </div>

      {/* PROTOCOLO CLÍNICO INTEGRAL: PRESENCIAL Y ONLINE */}
      <div className="relative p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[30px] bg-gradient-to-b from-black/60 to-black/30 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-atlas-violet/5 via-transparent to-[#FF9900]/5 pointer-events-none" />
        
        <div className="text-center max-w-xl mx-auto space-y-2.5 sm:space-y-3 mb-6 sm:mb-10 px-2">
          <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-[3px] sm:tracking-[4px] text-atlas-violet bg-atlas-violet/10 border border-atlas-violet/20 px-3 py-1 rounded-full inline-block">
            Garantía de Excelencia Atlas
          </span>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white uppercase italic">
            ¿Qué incluye cada consulta?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
            Nuestro protocolo de atención está minuciosamente diseñado tanto para la modalidad <strong className="text-white">Presencial</strong> como para la <strong className="text-white">Online</strong> (con adaptaciones de técnicas específicas).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 relative z-10">
          {/* Item 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-atlas-violet/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-atlas-violet/15 flex items-center justify-center text-atlas-violet shrink-0 group-hover:scale-110 transition-transform">
              <ClipboardList className="w-5 h-5 text-glow-violet" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">1. Anamnesis Verbal</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Análisis mediante cuestionarios de vida postural, hábitos de trabajo y antecedentes sintomáticos detallados.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF9900]/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#FF9900]/15 flex items-center justify-center text-[#FF9900] shrink-0 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-glow-orange" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">2. Evaluación Quiropráctica</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Examen dinámico morfo-estructural para localizar interferencias del sistema nervioso y subluxaciones en la columna.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-atlas-violet/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-atlas-violet/15 flex items-center justify-center text-atlas-violet shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-glow-violet" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">3. Análisis de Estudios</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Revisión e interpretación clínica de radiografías, resonancias (RMN), tomografías y análisis de la medicación actual.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF9900]/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#FF9900]/15 flex items-center justify-center text-[#FF9900] shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 text-glow-orange" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">4. Ajustes Quiroprácticos</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Aplicación de técnicas manuales no invasivas de altísima precisión. En la <strong className="text-atlas-violet">consulta online</strong>, se realiza una adaptación remota guiada.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-atlas-violet/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-atlas-violet/15 flex items-center justify-center text-atlas-violet shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-glow-violet" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">5. Plan de Recuperación</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Sesión educativa pormenorizada diseñada en pos de que <strong className="text-white">comprendas tu situación actual</strong> y origen exacto del malestar.
              </p>
            </div>
          </div>

          {/* Item 6 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF9900]/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#FF9900]/15 flex items-center justify-center text-[#FF9900] shrink-0 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-glow-orange" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">6. Tratamiento Propuesto</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Definición y entrega del protocolo de tratamiento estructurado para revertir el daño a corto, mediano y largo plazo.
              </p>
            </div>
          </div>

          {/* Item 7 - Spans 3 columns */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-atlas-violet/20 transition-all group md:col-span-2 lg:col-span-3">
            <div className="w-10 h-10 rounded-xl bg-atlas-violet/15 flex items-center justify-center text-atlas-violet shrink-0 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5 text-glow-violet" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-black text-white uppercase tracking-wider">7. Tareas para el Hogar</h4>
                <span className="text-[9px] bg-atlas-violet/20 text-atlas-violet border border-atlas-violet/30 px-2 py-0.5 rounded font-black uppercase tracking-widest leading-none select-none">Seguimiento</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Prescripción de rutinas de estiramiento específicas, corrección ergonómica e indicaciones diarias para <strong className="text-white">llevar adecuadamente un seguimiento personalizado</strong> y mantener la columna descomprimida.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN IMPORTANTE SENSACIONAL CON 3D CANVAS ABAJO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full gap-6 md:gap-8 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[30px] glass border border-atlas-violet/20 shadow-[0_0_40px_rgba(168,85,247,0.05)] flex flex-col xl:flex-row items-stretch"
      >
        
        {/* Important Info Card text */}
        <div className="flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 text-atlas-violet font-black text-xs uppercase tracking-[2.5px] sm:tracking-[3px]">
              <AlertCircle className="w-4 h-4 text-glow-violet shrink-0" />
              <span>Información Esencial</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight">
              ¿Por qué nuestro examen es integral?
            </h3>
            
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-semibold italic border-l-2 border-atlas-violet/40 pl-3 sm:pl-4 py-1">
              "EL EXAMEN ES INTEGRAL. NO SE SEPARA POR ZONAS CORPORALES, EVITANDO EL ERROR DE ABORDAR EL CUERPO FRAGMENTADO. SE EVALÚA LA PRIORIDAD DE LA DOLENCIA ASÍ COMO SE RESPONDEN TODAS LAS DUDAS DURANTE LA SESIÓN."
            </p>

            {/* Practical info badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4 text-xs font-medium">
              <div className="bg-white/5 border border-white/5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col gap-1">
                <span className="text-[#FF9900] font-black uppercase tracking-wider text-[10px]">Tiempo Asignado</span>
                <span className="text-white text-sm sm:text-base font-extrabold">30 a 45 Minutos</span>
                <span className="text-zinc-500 text-[10px]">Según la complejidad ósea y nerviosa de cada caso particular.</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col gap-1">
                <span className="text-atlas-violet font-black uppercase tracking-wider text-[10px]">Diagnóstico Integral</span>
                <span className="text-white text-sm sm:text-base font-extrabold">Examen Global Completo</span>
                <span className="text-zinc-500 text-[10px]">Cada vértebra, compresión nerviosa y asimetría ósea analizada clínicamente.</span>
              </div>
            </div>
          </div>

          <div className="text-zinc-500 text-[10px] sm:text-[11px] font-mono leading-relaxed border-t border-white/5 pt-3 sm:pt-4">
            * Consulta sujeta a priorización del diagnóstico clínico. Lic. Juan Antonio Villalba (M.P. 542).
          </div>
        </div>

        {/* Video de Juan Atlas - YouTube Channel */}
        <div className="flex-1 min-h-[220px] sm:min-h-[300px] xl:min-h-0 flex flex-col">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[9.5px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-wider sm:tracking-widest">VIDEO DE NUESTRO CANAL</span>
            <span className="inline-flex items-center gap-1 text-[9px] text-[#FF9900] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              EN VIVO
            </span>
          </div>
          <div className="flex-1 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video xl:aspect-auto xl:h-full min-h-[200px] sm:min-h-[250px] bg-black group">
            <iframe
              src="https://www.youtube.com/embed/G5EDsdT9RLc?autoplay=0&rel=0&modestbranding=1"
              title="Quiropraxia de Alta Precisión y Descompresión Vertebral - Lic. Juan Antonio Villalba"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
