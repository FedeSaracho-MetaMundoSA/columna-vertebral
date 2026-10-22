import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Activity, Zap, CheckCircle2, AlertCircle, Bone, Dna, ArrowRight, X } from 'lucide-react';

const encyclopedicData = {
  pathologies: [
    {
      category: "Afecciones del Disco Discal",
      icon: Target,
      color: "text-atlas-teal",
      bg: "bg-atlas-teal/10",
      description: "El disco intervertebral actúa como amortiguador. Su deterioro causa dolor agudo y crónico profundo.",
      conditions: [
        { name: "Hernia de Disco (Cervical/Lumbar)", detail: "Ruptura del anillo fibroso con extrusión del núcleo pulposo que comprime la raíz nerviosa." },
        { name: "Protrusión Discal", detail: "Abombamiento del disco sin ruptura contenida, paso previo a la hernia." },
        { name: "Discoartrosis (Enfermedad Degenerativa)", detail: "Deshidratación y pérdida de altura del disco con la edad o esfuerzo sostenido." }
      ]
    },
    {
      category: "Trastornos Biomecánicos / Curvatura",
      icon: Activity,
      color: "text-atlas-violet",
      bg: "bg-atlas-violet/10",
      description: "La pérdida de la alineación fisiológica altera el centro de gravedad y sobrecarga las articulaciones.",
      conditions: [
        { name: "Escoliosis", detail: "Curvatura lateral y rotacional tridimensional de la columna." },
        { name: "Rectificación Cervical", detail: "Pérdida de lordosis natural del cuello, frecuentemente por 'tech neck', latigazo o estrés postural." },
        { name: "Hipercifosis (Joroba Postural)", detail: "Curvatura excesiva hacia adelante en la zona dorsal/torácica superior." },
        { name: "Hiperlordosis", detail: "Curvatura lumbar excesiva o hundimiento en la espalda baja que afecta la marcha." },
        { name: "Pies Planos (Defectos de Pisada)", detail: "Pérdida total o parcial del arco longitudinal interno del pie, provocando pronación del retropié y desalineación ascendente." },
        { name: "Pies Cavos / Cabos (Apoyo Reducido)", detail: "Elevación anormal del arco plantar longitudinal, reduciendo drásticamente la superficie de descarga y sobrecargando el talón y metatarso." },
        { name: "Espolón Calcáneo y Fascitis", detail: "Excrecencia ósea puntiaguda en el talón generada por la tracción repetitiva y crónica de la fascia plantar tensa." }
      ]
    },
    {
      category: "Síndromes Radiculares y Neurales",
      icon: Zap,
      color: "text-atlas-orange",
      bg: "bg-atlas-orange/10",
      description: "Compresión, estiramiento o irritación de la red neural debido a subluxaciones vertebrales.",
      conditions: [
        { name: "Ciatalgia y Falsa Ciática", detail: "Dolor irradiado por toda la pierna desde el glúteo a causa de irritación del nervio ciático." },
        { name: "Cervicobraquialgia", detail: "Dolor, hormigueo continuo o pérdida profunda de fuerza que viaja del cuello a la mano." },
        { name: "Síndrome Piramidal", detail: "El músculo piriforme ahoga el nervio ciático creando falsos diagnósticos discales." },
        { name: "Parestesias Extremas", detail: "Adormecimiento frecuente prolongado y falta de sensibilidad en extremidades." }
      ]
    },
    {
      category: "Cuadros Crónicos Genéricos",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-200/10",
      description: "Afecciones generalizadas originadas por compensaciones corporales de larga duración.",
      conditions: [
        { name: "Lumbalgia y Lumbago Severo", detail: "Dolor local invalidante en espalda baja limitando movimientos habituales y simples." },
        { name: "Cervicalgia y Tortícolis a Repetición", detail: "Tensión aguda del cuello, limitando seriamente todo rango giratorio normal." },
        { name: "Mareos, Vértigos y Tinnitus", detail: "Zumbidos originados o catalizados por subluxaciones cervicales altas (Articulación Atlas-Axis)." },
        { name: "Cefaleas Tensionales y Migrañas", detail: "Dolor punzante de origen neuro-musculoesquelético de los músculos pericraneales." },
        { name: "Osteofitosis (Picos de Loro)", detail: "Formación adaptativa de puentes óseos ante inestabilidad vertebral detectada por el cuerpo." },
        { name: "Molestias Post-Trauma (Secuelas de Caídas / Choques)", detail: "Dolor persistente, rigidez y rango anormal de movilidad articular secundario a latigazos cervicales, traumatismos deportivos o impactos directos mal rehabilitados." }
      ]
    }
  ],
  procedures: [
    {
      title: "Ajuste Quiropráctico de Alta Velocidad (HVLA)",
      desc: "Maniobra manual indolora, focalizada en una vértebra bloqueada, aplicada con gran rapidez y mínima amplitud para resetear sensores neurológicos y abrir los discos intervertebrales momentáneamente."
    },
    {
      title: "Descompresión Mecánica Axial",
      desc: "Tracción en línea recta que aumenta el espacio intervertebral de forma cíclica. Promueve un vacío intracapsular (presión negativa) que 'succiona' el núcleo del disco hacia el centro aliviando pinzamientos."
    },
    {
      title: "Liberación Miofascial Profunda",
      desc: "El trabajo óseo no perdura si la fascia está restringida; por ello, tratamos las tensiones fasciales y desarmamos los puntos gatillo (trigger points) de los tejidos blandos profundos anclados a la columna."
    },
    {
      title: "Análisis Neurológico Funcional",
      desc: "Pruebas de marcha, test de Tensión Neural Activa, y evaluación directa de asimetrías y reflejos neurológicos y miotendinosos antes, durante y de forma posterior al tratamiento implementado."
    }
  ]
};

export default function Pathologies() {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  return (
    <section className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 relative overflow-hidden bg-black min-h-screen" id="enciclopedia">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-atlas-teal/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-atlas-orange/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="mb-10 sm:mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-white/10 pb-8 sm:pb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-atlas-white/80 text-[9.5px] sm:text-[10px] font-black uppercase tracking-[2.5px] sm:tracking-[3px] mb-4 sm:mb-6">
                <Dna className="w-3 h-3 text-atlas-teal" />
                <span>Enciclopedia Clínica Atlas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white uppercase italic mb-4 sm:mb-6">
                Condiciones & Tratamientos <br/>
                <span className="text-atlas-teal">Avanzados.</span>
              </h2>
              <p className="text-atlas-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Un compendio profesional exhaustivo sobre las patologías, abordajes terapéuticos preventivos y protocolos correctivos implementados por el Lic. Villalba, orientados a brindar alternativas fiables y contundentes a cirugías o bloqueos inyectables.
              </p>
            </div>
          </div>
        </div>

        {/* Procedures Grid */}
        <div className="mb-14 sm:mb-20 md:mb-24">
          <h3 className="text-lg sm:text-2xl font-black uppercase text-white tracking-wider sm:tracking-widest italic mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
            <Bone className="text-atlas-teal w-5 h-5 sm:w-6 sm:h-6" /> Protocolos de Tratamiento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {encyclopedicData.procedures.map((proc, i) => (
              <div key={i} className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5 hover:border-atlas-teal/30 transition-colors bg-gradient-to-b from-white/5 to-transparent flex flex-col justify-between">
                <div>
                   <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2.5 sm:mb-4 leading-normal">{proc.title}</h4>
                   <p className="text-xs text-atlas-white/50 leading-relaxed font-medium">{proc.desc}</p>
                </div>
                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/5 flex w-full justify-between items-center text-[9.5px] sm:text-[10px] text-atlas-teal font-black uppercase tracking-[2px]">
                   MÉTODO ATLAS <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pathologies Section */}
        <h3 className="text-lg sm:text-2xl font-black uppercase text-white tracking-wider sm:tracking-widest italic mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
          <Activity className="text-atlas-orange w-5 h-5 sm:w-6 sm:h-6" /> Índice de Patologías
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {encyclopedicData.pathologies.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[36px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                 <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl ${group.bg} border border-white/5 flex flex-shrink-0 items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                   <group.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${group.color}`} />
                 </div>
                 <div>
                   <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase italic drop-shadow-md mb-1 sm:mb-2">{group.category}</h3>
                   <p className="text-xs sm:text-sm text-atlas-white/60 font-medium leading-relaxed">{group.description}</p>
                 </div>
              </div>
              
              <ul className="space-y-2.5 sm:space-y-3 relative z-10">
                {group.conditions.map((item, idj) => (
                  <li 
                    key={idj} 
                    className="flex flex-col p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 hover:bg-white/5 transition-colors cursor-pointer group/item"
                    onClick={() => setSelectedCondition(selectedCondition === item.name ? null : item.name)}
                  >
                    <div className="flex items-center justify-between w-full">
                       <div className="flex items-center gap-2.5 sm:gap-3">
                         <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${group.bg} group-hover/item:scale-110 transition-transform shrink-0`}>
                           <CheckCircle2 className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${group.color}`} />
                         </div>
                         <span className="text-xs sm:text-sm text-white font-bold tracking-wide">{item.name}</span>
                       </div>
                       <motion.div 
                         initial={false}
                         animate={{ rotate: selectedCondition === item.name ? 135 : 0 }}
                         className="text-atlas-white/40 group-hover/item:text-white transition-colors"
                       >
                         <ArrowRight className="w-4 h-4" />
                       </motion.div>
                    </div>
                    
                    <AnimatePresence>
                       {selectedCondition === item.name && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0, marginTop: 0 }}
                           animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                           exit={{ height: 0, opacity: 0, marginTop: 0 }}
                           className="overflow-hidden"
                         >
                           <p className="text-xs text-atlas-white/60 leading-relaxed font-medium pl-9 border-l-2 border-white/10 ml-3">
                             {item.detail}
                           </p>
                         </motion.div>
                       )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
