import React from 'react';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="relative py-24 bg-atlas-dark text-white overflow-hidden border-b border-white/5" id="filosofia">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-atlas-orange) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-12 relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full border border-atlas-orange/30 flex items-center justify-center bg-atlas-orange/5 mb-8">
              <Target className="w-8 h-8 text-atlas-orange" />
            </div>
            
            <h2 className="text-[12px] font-black uppercase tracking-[4px] text-atlas-gold mb-6">
              Nuestra Filosofía / El Método
            </h2>
            
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 leading-tight">
              Misión & <span className="text-transparent bg-clip-text bg-gradient-to-r from-atlas-gold to-atlas-orange">Experiencia</span>
            </h3>
            
            <div className="space-y-6 text-base md:text-lg text-atlas-white/80 leading-relaxed font-medium">
              <p>
                Nuestro abordaje es integral, adaptándose a tu edad, profesión y tu historia de vida.
              </p>
              <p>
                En nuestro consultorio, el Licenciado Villalba integra el diagnóstico quiropráctico, la kinesiología, terapia cráneo-sacra y abordaje ortopédico, respaldado por los testimonios y resultados obtenidos.
              </p>
              <p>
                Hoy, utilizamos este medio digital para cruzar fronteras, llevar conocimiento y dar alivio a quienes dudan sobre decisiones quirúrgicas, especialmente sobre su <strong className="text-atlas-violet font-black text-glow-violet uppercase tracking-wide">columna-vertebral</strong>. <strong className="text-atlas-gold">Estamos al servicio de la humanidad que nos requiere.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
