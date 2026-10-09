import { motion } from 'motion/react';
import { Clock, Zap } from 'lucide-react';

const scheduleData = [
  { day: "Lunes", hours: "07:00 - 13:00 | 14:00 - 18:00", active: true },
  { day: "Martes", hours: "07:00 - 13:00 | 14:00 - 18:00", active: true },
  { day: "Miércoles", hours: "07:00 - 13:00 | 14:00 - 18:00", active: true },
  { day: "Jueves", hours: "07:00 - 13:00 | 14:00 - 18:00", active: true },
  { day: "Viernes", hours: "07:00 - 13:00 | 14:00 - 18:00", active: true },
  { day: "Sábado", hours: "07:00 - 15:00", active: true },
  { day: "Domingo", hours: "Cerrado", active: false },
];

export default function ResonanceSchedule() {
  return (
    <section className="py-24 bg-atlas-dark relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-atlas-teal) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-atlas-teal/30 text-atlas-teal text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Zap className="w-3 h-3 animate-pulse" />
            Disponibilidad Operativa
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
            Cronograma de <span className="text-atlas-teal">Resonancia</span>
          </h2>
          <p className="text-atlas-white/50 max-w-xl mx-auto">
            Nuestros horarios de atención están sincronizados para brindarte la mejor cobertura médica en Salta.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          {/* Scanning Line Animation */}
          <motion.div 
            className="absolute left-0 right-0 h-[2px] bg-atlas-teal shadow-[0_0_20px_rgba(0,242,254,0.8)] z-20 pointer-events-none"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <div className="glass rounded-3xl border-white/5 overflow-hidden divide-y divide-white/5">
            {scheduleData.map((item, index) => (
              <motion.div 
                key={index}
                className="relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 transition-colors hover:bg-atlas-teal/5 group/row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Resonance Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-atlas-teal/10 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-atlas-teal animate-pulse' : 'bg-white/20'}`} />
                  <span className={`text-xl font-bold ${item.active ? 'text-white' : 'text-white/30'}`}>
                    {item.day}
                  </span>
                </div>

                <div className="relative z-10 mt-2 md:mt-0">
                  <div className="flex items-center gap-3">
                    <Clock className={`w-4 h-4 ${item.active ? 'text-atlas-teal' : 'text-white/20'}`} />
                    <span className={`font-mono text-lg tracking-tight ${item.active ? 'text-atlas-teal/80' : 'text-white/20'}`}>
                      {item.hours}
                    </span>
                  </div>
                </div>

                {/* Scanning "X-Ray" Highlight */}
                <motion.div 
                  className="absolute inset-0 bg-atlas-teal/5 pointer-events-none mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-atlas-teal/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-atlas-teal/10 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
}
