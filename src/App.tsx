/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Facebook, Instagram, MapPin, Menu, Phone, ShieldCheck, X, Youtube, ArrowLeft } from 'lucide-react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';

import { AtlasSidebar } from './components/AtlasSidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';
import LiveInterviews from './components/LiveInterviews';
import EducationalSection from './components/EducationalSection';
import Pathologies from './components/Pathologies';
import AIAvatarWidget from './components/AIAvatarWidget';
import PrivacyPolicy from './components/PrivacyPolicy';
import HomePage from './HomePage';
import PrivacyModal from './components/PrivacyModal';
import FloatingNav from './components/FloatingNav';

function GlobalBackButton() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Render on all pages except the homepage
  if (currentPath === '/') return null;

  return (
    <nav className="fixed top-6 left-6 md:left-8 z-40 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="pointer-events-auto"
      >
        <Link
          to="/"
          className="flex items-center gap-2 bg-atlas-dark/80 backdrop-blur-xl border border-white/10 hover:border-atlas-gold px-4 py-2.5 rounded-2xl transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5)] group active:scale-95 cursor-pointer"
          id="global-back-button"
        >
          <ArrowLeft className="w-4 h-4 text-atlas-gold group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-wider text-white">
            Volver
          </span>
        </Link>
      </motion.div>
    </nav>
  );
}

function LogoTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <motion.button
      onClick={toggleSidebar}
      className="pointer-events-auto relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-4 bg-atlas-dark/60 backdrop-blur-xl led-border p-2 pr-6 rounded-2xl hover:border-atlas-gold transition-colors">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(253,185,49,0.3)]">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="text-atlas-dark"
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <img
                src="/logo-atlas.jpeg"
                alt="ATLAS Logo"
                className="w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-lg font-black tracking-tighter text-white leading-none">ATLAS</span>
          <span className="text-[9px] uppercase tracking-[2px] text-atlas-orange font-bold">Menu Interactivo</span>
        </div>
      </div>
    </motion.button>
  );
}

export default function App() {
  const location = useLocation();
  const [introComplete, setIntroComplete] = React.useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  console.log('App rendering, introComplete:', introComplete);

  React.useEffect(() => {
    const handleOpen = () => setIsPrivacyOpen(true);
    window.addEventListener('open-privacy-modal', handleOpen);
    return () => window.removeEventListener('open-privacy-modal', handleOpen);
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="relative min-h-screen bg-atlas-dark selection:bg-atlas-teal selection:text-atlas-dark overflow-x-hidden flex w-full">
          <AnimatePresence>
            {!introComplete && (
              <CinematicIntro onComplete={() => setIntroComplete(true)} />
            )}
          </AnimatePresence>

          <div className="flex-1 relative">
            <div className="fixed inset-0 mesh-bg pointer-events-none z-[-10]" />
            
            <nav className="fixed top-6 right-6 md:right-8 z-40 pointer-events-none">
              <div className="flex justify-end items-center pointer-events-none">
                <LogoTrigger />
              </div>
            </nav>

            <GlobalBackButton />

            <main className="relative z-10 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/patologias" element={<Pathologies />} />
                <Route path="/programaciones" element={<LiveInterviews />} />
                <Route path="/academia" element={<EducationalSection />} />
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              </Routes>
            </main>

            <footer className="relative z-10 pt-32 pb-16 bg-gradient-to-t from-black to-atlas-dark/0 border-t border-white/5">
              <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                  <div className="lg:col-span-5 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <img src="/logo-atlas.jpeg" alt="ATLAS Logo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-2xl font-black tracking-tighter text-white uppercase italic">ATLAS</span>
                        <p className="text-[10px] text-atlas-teal font-black uppercase tracking-[3px] leading-none mt-1">Columna Vertebral</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Especialistas en Salta Capital</h3>
                      <p className="text-atlas-white/50 text-sm leading-relaxed max-w-md font-medium">
                        Bajo la dirección técnica del <span className="text-white">Lic. Juan Antonio Villalba (M.P. 542)</span>, egresado de la Universidad Nacional de Córdoba. Brindamos soluciones no invasivas desde hace más de 15 años.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20agendar%20un%20turno%20desde%20la%20p%C3%A1gina%20web', '_blank')}
                        className="px-6 py-3 bg-atlas-violet text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      >
                        Agendar Turno
                      </button>
                      <button className="px-6 py-3 glass text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-colors">
                        Saber Más
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-3 space-y-6">
                    <h4 className="text-[11px] uppercase tracking-[4px] text-atlas-teal font-black italic">Contacto Profesional</h4>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-sm">
                         <MapPin className="w-4 h-4 text-atlas-teal shrink-0" />
                         <span className="text-atlas-white/70">Pje. Astigueta 1292, Salta</span>
                      </li>
                      <li className="flex gap-3 text-sm">
                         <Phone className="w-4 h-4 text-atlas-teal shrink-0" />
                         <span className="text-atlas-white/70">0387 481-6999</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <h4 className="text-[10px] uppercase tracking-[3px] text-atlas-white/20 font-black mb-3">Dominio Oficial</h4>
                      <span className="text-xs font-mono text-white/40">columna-vertebral.com.ar</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <h4 className="text-[11px] uppercase tracking-[4px] text-atlas-white/30 font-black italic">Políticas de Privacidad</h4>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                      <p className="text-[11px] text-atlas-white/40 leading-relaxed italic">
                        "La confidencialidad del paciente es inquebrantable. Tratamos su información clínica bajo estricto cumplimiento de la Ley 25.326 de Protección de Datos Personales y el Secreto Profesional Médico."
                      </p>
                      <div className="border-t border-white/5 pt-4 space-y-3">
                        <p className="text-[10px] text-atlas-white/20 leading-relaxed uppercase font-black tracking-widest">
                          Propiedad de Lic. Villalba. Queda prohibida la reproducción o imitación del Método Atlas. Acciones legales ante cualquier intento de usurpación.
                        </p>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPrivacyOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-atlas-violet hover:text-white transition-colors group cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-glow-violet" />
                          <span>Ver Documento Legal (Ley 25.326)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[10px] text-atlas-white/20 uppercase font-black tracking-[4px]">
                    © 2011 - {new Date().getFullYear()} ATLAS QUIROPRAXIA • DERECHOS RESERVADOS
                  </p>
                  <div className="flex gap-6">
                    <a href="#" className="text-atlas-white/20 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="text-atlas-white/20 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                    <a href="#" className="text-atlas-white/20 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <AtlasSidebar />
          {location.pathname !== '/' && <FloatingNav />}
          <AIAvatarWidget />
          <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
          <Toaster theme="dark" position="bottom-right" />
      </div>
    </SidebarProvider>
  );
}
