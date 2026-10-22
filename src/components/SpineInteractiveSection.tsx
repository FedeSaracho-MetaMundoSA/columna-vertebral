import React, { useState } from 'react';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  RotateCw, 
  Sliders, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Calendar,
  Compass
} from 'lucide-react';
import SpineCanvas3D from './SpineCanvas3D';

export default function SpineInteractiveSection() {
  const [selectedRegion, setSelectedRegion] = useState<'full' | 'cervical' | 'thoracic' | 'lumbar'>('full');
  const [selectedVertebraText, setSelectedVertebraText] = useState<{ name: string; desc: string }>({
    name: 'Atlas (C1) - 1ª Cervical',
    desc: 'La vértebra más importante de la biomecánica humana. Sostiene los 5 kg del cráneo.'
  });

  return (
    <section id="simulador-3d" className="py-12 sm:py-16 lg:py-24 bg-slate-950 relative overflow-hidden border-t border-cyan-900/30">
      {/* Background ambient medical glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-600/40 text-cyan-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Biomecánica Computarizada en Tiempo Real</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Simulador 3D de Columna Vertebral & Método Atlas
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Manipulá la estructura ósea en 360°, simulá la descompresión de discos intervertebrales y descubrí cómo el <strong className="text-white font-semibold">Lic. Juan Antonio Villalba</strong> (M.P. 542) corrige subluxaciones y hernias de disco sin cirugía.
          </p>
        </div>

        {/* 3D Visualizer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Main 3D Canvas Box (8 Cols on Desktop) */}
          <div className="lg:col-span-8 w-full">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-800/50 p-3 sm:p-4 shadow-2xl">
              <SpineCanvas3D 
                interactive={true}
                initialFocus={selectedRegion}
                heightClass="h-[480px] sm:h-[600px] lg:h-[650px]"
                showDockControls={true}
                onSelectVertebra={(name, desc) => setSelectedVertebraText({ name, desc })}
              />
            </div>
            
            {/* Clinical Notice below canvas */}
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 px-2 gap-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Modelo anatómico 3D de 24 vértebras presacras y discos intervertebrales.</span>
              </span>
              <span className="text-cyan-400 font-medium">
                Desarrollado para consulta de pacientes en Salta
              </span>
            </div>
          </div>

          {/* Right Column: Diagnostic & Biomechanical Metrics (4 Cols on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Card 1: Key Biomechanical Markers */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Parámetros Biomecánicos</span>
                </h3>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700/50 font-mono">
                  M.P. 542
                </span>
              </div>

              {/* Metric 1: Atlas Orthogonality */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Alineación Atlas C1</span>
                  <span className="text-cyan-300 font-bold font-mono">0.0° (Ortogonal)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full w-full" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Desviaciones de solo 2º causan tensión asimétrica en la arteria vertebral y duramadre.
                </p>
              </div>

              {/* Metric 2: Disc Decompression Pressure */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Presión Intradiscal L4-L5</span>
                  <span className="text-emerald-400 font-bold font-mono">-100 mmHg (Vacío)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-5/6" />
                </div>
                <p className="text-[11px] text-slate-400">
                  El vacío negativo retrae el material herniado hacia el centro del anillo fibroso.
                </p>
              </div>

              {/* Metric 3: Sciatic Foraminal Space */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Espacio Foraminal Neural</span>
                  <span className="text-cyan-300 font-bold font-mono">+38% Descomprimido</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-1.5 rounded-full w-4/5" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Libera el paso del nervio ciático hacia glúteos y miembros inferiores.
                </p>
              </div>
            </div>

            {/* Card 2: Clinical Method Summary by Lic. Juan Antonio Villalba */}
            <div className="rounded-2xl bg-gradient-to-b from-cyan-950/30 to-slate-900 border border-cyan-800/40 p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  ¿Cómo funciona el Método Atlas?
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                A diferencia de manipulaciones bruscas o masajes superficiales, el tratamiento en nuestro consultorio de Salta aplica un estímulo mecánico de alta precisión que devuelve la primera vértebra (Atlas) a su posición natural, provocando que toda la columna vertebral se auto-alinee en cadena.
              </p>

              <div className="pt-2">
                <a
                  href="#turnos"
                  className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Solicitar Evaluación en Salta</span>
                </a>
              </div>
            </div>

            {/* Card 3: Direct Link to YouTube Video */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">¿Querés ver el video en vivo?</p>
                <p className="text-[11px] text-slate-400">Demostración en pacientes reales</p>
              </div>
              <a
                href="#servicios"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
              >
                <span>Ver video</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
