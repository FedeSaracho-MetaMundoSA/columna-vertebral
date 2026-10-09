import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Brain, Activity, ShieldCheck, ArrowRight, Search, Tag, Sparkles, GraduationCap } from 'lucide-react';

const categories = [
  "Todos", 
  "Método Atlas", 
  "Biomecánica", 
  "Anatomía Espinal", 
  "Patologías", 
  "Tratamientos", 
  "Prevención", 
  "Mitos Médicos"
];

const articles = [
  {
    title: "El Origen del Método Atlas",
    category: "Método Atlas",
    excerpt: "Comprenda cómo la rectificación cervical afecta el bienestar general y el enfoque no invasivo para la recuperación.",
    image: "/interior-1.jpeg",
    readTime: "5 min"
  },
  {
    title: "Mitos de la Cirugía de Columna",
    category: "Mitos Médicos",
    excerpt: "¿Es siempre necesaria la intervención quirúrgica? Evaluamos las alternativas conservadoras comprobadas.",
    image: "/facade-2.jpeg",
    readTime: "8 min"
  },
  {
    title: "Higiene Postural Diaria",
    category: "Prevención",
    excerpt: "Hábitos fundamentales para prevenir la degeneración discal en ambientes de trabajo modernos.",
    image: "/facade-3.jpeg",
    readTime: "4 min"
  },
  {
    title: "La Inteligencia del Cuerpo",
    category: "Biomecánica",
    excerpt: "Por qué una columna alineada permite que el sistema nervioso se regule de manera automática.",
    image: "/facade-1.jpeg",
    readTime: "6 min"
  },
  {
    title: "Anatomía del Disco Intervertebral",
    category: "Anatomía Espinal",
    excerpt: "Estructura, función y el proceso degenerativo del amortiguador natural de nuestra columna.",
    image: "/interior-1.jpeg",
    readTime: "7 min"
  },
  {
    title: "Hernia de Disco: Diagnóstico y Abordaje",
    category: "Patologías",
    excerpt: "Diferenciación entre protusión, extrusión y secuestro discal, y sus implicancias neurológicas.",
    image: "/facade-2.jpeg",
    readTime: "10 min"
  },
  {
    title: "Ajuste Quiropráctico Específico",
    category: "Tratamientos",
    excerpt: "La ciencia detrás de la manipulación articular de alta velocidad y baja amplitud (HVLA).",
    image: "/facade-1.jpeg",
    readTime: "6 min"
  },
  {
    title: "Cervicalgia y Cefalea Tensional",
    category: "Patologías",
    excerpt: "La íntima relación entre la subluxación vertebral cervical y los dolores de cabeza crónicos.",
    image: "/facade-3.jpeg",
    readTime: "5 min"
  },
  {
    title: "Biomecánica de la Marcha",
    category: "Biomecánica",
    excerpt: "Cómo la posición de la pelvis y la columna lumbar dictan la eficiencia de nuestro movimiento.",
    image: "/interior-1.jpeg",
    readTime: "8 min"
  },
  {
    title: "Escoliosis: Evolución y Control",
    category: "Patologías",
    excerpt: "Tratamientos conservadores y seguimiento biomecánico de las desviaciones laterales de la columna.",
    image: "/facade-1.jpeg",
    readTime: "9 min"
  },
  {
    title: "Descompresión Espinal No Invasiva",
    category: "Tratamientos",
    excerpt: "Técnicas de tracción y elongación para aliviar la presión radicular sin necesidad de cirugía.",
    image: "/facade-2.jpeg",
    readTime: "7 min"
  },
  {
    title: "El Sistema Nervioso Autónomo",
    category: "Anatomía Espinal",
    excerpt: "Cómo la red neural que nace en la columna controla las funciones involuntarias del organismo.",
    image: "/facade-3.jpeg",
    readTime: "6 min"
  }
];

export default function EducationalSection() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "Todos" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pt-32 pb-24 relative overflow-hidden bg-[#050505] min-h-screen" id="educativa">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-atlas-teal/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-atlas-violet/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* The Gift and the Science - Lic. Villalba profile */}
        <div className="mb-24 flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-[40px] overflow-hidden glass border-white/10 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <img src="/logo-atlas.jpeg" alt="Lic. Villalba" className="w-full h-full object-cover grayscale opacity-90 mix-blend-lighten" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="bg-[#050505]/95 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/20 flex items-center gap-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] w-full">
                   <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden flex items-center justify-center p-1.5 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      <img src="/unc-logo.png" alt="Universidad Nacional de Córdoba" className="w-full h-full object-contain" />
                   </div>
                   <div>
                     <p className="text-[10px] text-atlas-teal font-black uppercase tracking-[3px] text-glow">Formación de Excelencia</p>
                     <p className="text-sm font-bold text-white drop-shadow-md">Universidad Nac. de Córdoba</p>
                     <p className="text-[10px] text-atlas-white/50 font-mono mt-1 font-bold">Matrícula Prof. 542</p>
                   </div>
                </div>
              </div>
            </div>
            {/* Callout badge */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-6 -right-6 lg:-right-12 w-32 h-32 bg-atlas-teal/10 backdrop-blur-xl border border-atlas-teal/30 rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(20,184,166,0.3)] z-10"
            >
               <Sparkles className="w-6 h-6 text-atlas-teal mb-1" />
               <span className="text-[9px] uppercase tracking-widest font-black text-white leading-tight">El Don de la<br/>Sanación</span>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-atlas-violet/30 bg-atlas-violet/10 text-atlas-violet text-[10px] font-black uppercase tracking-[3px]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Maestría Clínica</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white uppercase italic">
              Un don innato <span className="text-atlas-violet">perfeccionado por la ciencia.</span>
            </h2>
            
            <p className="text-atlas-white/60 text-base md:text-lg leading-relaxed font-medium">
              Hay quienes aprenden una técnica, y quienes nacen con la sensibilidad absoluta para comprender el cuerpo humano. El Lic. Villalba combina un <strong>don biomecánico natural para la sanación</strong> con una rigurosa formación académica en la Universidad Nacional de Córdoba, creando así un criterio clínico inigualable en todo el norte argentino.
            </p>
            
            <p className="text-atlas-teal text-sm leading-relaxed italic border-l-2 border-atlas-teal/50 pl-6 py-2 bg-atlas-teal/5 rounded-r-2xl font-medium">
              "No se trata de forzar la columna, sino de escucharla. Las manos deben saber exactamente dónde y cómo liberar la tensión para que el cuerpo, con su infinita inteligencia, recupere la postura perdida."
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-20" />

        {/* Knowledge Base Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter text-white uppercase italic flex items-center gap-4">
              Biblioteca <span className="text-atlas-teal">Atlas</span>
            </h3>
            <p className="text-atlas-white/50 text-sm max-w-xl leading-relaxed">
              Explora nuestra colección de artículos y guías diseñados para empoderarte con el conocimiento necesario sobre tu biomecánica.
            </p>
          </div>
          
          <div className="w-full md:w-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-atlas-white/40 group-focus-within:text-atlas-teal transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[300px] bg-white/5 border border-white/10 text-white text-sm rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-atlas-teal/50 focus:bg-white/10 transition-all font-medium placeholder:text-atlas-white/30"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[2px] transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category 
                  ? 'bg-atlas-teal text-atlas-dark shadow-[0_0_20px_rgba(20,184,166,0.3)]' 
                  : 'bg-white/5 text-atlas-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Tag className="w-3 h-3" />
              {category}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={article.title}
                className="group relative rounded-[32px] overflow-hidden glass border-white/5 hover:border-atlas-teal/30 transition-colors h-[400px]"
              >
                <div className="absolute inset-0">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                  <div className="absolute inset-0 bg-atlas-dark/40 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-atlas-teal/20 text-atlas-teal text-[9px] font-black uppercase tracking-[3px] rounded-lg border border-atlas-teal/20 backdrop-blur-md">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-atlas-white/50 font-bold tracking-widest uppercase bg-black/50 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3 group-hover:text-atlas-teal transition-colors leading-tight italic uppercase">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-atlas-white/70 leading-relaxed font-medium mb-6 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] text-white w-max">
                    <span className="w-8 h-8 rounded-full bg-atlas-teal/20 flex items-center justify-center group-hover:bg-atlas-teal group-hover:text-atlas-dark transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="group-hover:tracking-[4px] transition-all">Leer Artículo Complet...</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="col-span-full py-20 text-center glass rounded-[32px] border-white/5">
              <BookOpen className="w-12 h-12 text-atlas-white/20 mx-auto mb-4" />
              <h4 className="text-white font-bold text-xl mb-2">Sin resultados</h4>
              <p className="text-atlas-white/50">No se encontraron artículos para tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
