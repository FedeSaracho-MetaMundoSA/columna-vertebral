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

function GlobalTopNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isHome = currentPath === '/';
  const { toggleSidebar, open } = useSidebar();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-atlas-dark/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between transition-all">
      <div className="flex items-center gap-2 sm:gap-3">
        {!isHome && (
          <Link
            to="/"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 px-2.5 py-1.5 rounded-xl border border-white/10 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer mr-1"
            id="global-back-button"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-atlas-gold" />
            <span className="hidden xs:inline">Volver</span>
          </Link>
        )}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden bg-white border border-white/10 shadow-[0_0_15px_rgba(253,185,49,0.3)] shrink-0">
            <img src="/logo-atlas.jpeg" alt="ATLAS Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-white leading-none group-hover:text-atlas-gold transition-colors">
              ATLAS
            </span>
            <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[1.5px] sm:tracking-[2px] text-atlas-teal font-extrabold leading-none mt-0.5">
              Columna Vertebral
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20solicitar%20un%20turno%20o%20hacer%20una%20consulta', '_blank')}
          className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(22,163,74,0.3)] active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Pedir Turno</span>
          <span className="inline sm:hidden">Turnos</span>
        </button>

        <button
          onClick={toggleSidebar}
          className="flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-white active:scale-95 transition-all cursor-pointer"
          aria-label="Menú Atlas"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-atlas-orange" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-atlas-teal" />
            )}
          </AnimatePresence>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white">
            Menú
          </span>
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const location = useLocation();
  const [introComplete, setIntroComplete] = React.useState(() => {
    return sessionStorage.getItem('atlas_intro_seen') === 'true';
  });
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);

  const handleIntroComplete = () => {
    sessionStorage.setItem('atlas_intro_seen', 'true');
    setIntroComplete(true);
  };

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
              <CinematicIntro onComplete={handleIntroComplete} />
            )}
          </AnimatePresence>

          <div className="flex-1 relative">
            <div className="fixed inset-0 mesh-bg pointer-events-none z-[-10]" />
            
            <GlobalTopNav />

            <main className="relative z-10 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/patologias" element={<Pathologies />} />
                <Route path="/programaciones" element={<LiveInterviews />} />
                <Route path="/academia" element={<EducationalSection />} />
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              </Routes>
            </main>

            <footer className="relative z-10 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-t from-black to-atlas-dark/0 border-t border-white/5">
              <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-20">
                  <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-[0_0_30px_rgba(255,255,255,0.1)] shrink-0">
                        <img src="/logo-atlas.jpeg" alt="ATLAS Logo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xl sm:text-2xl font-black tracking-tighter text-white uppercase italic">ATLAS</span>
                        <p className="text-[9px] sm:text-[10px] text-atlas-teal font-black uppercase tracking-[2.5px] sm:tracking-[3px] leading-none mt-1">Columna Vertebral</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight italic">Especialistas en Salta Capital</h3>
                      <p className="text-atlas-white/50 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                        Bajo la dirección técnica del <span className="text-white">Lic. Juan Antonio Villalba (M.P. 542)</span>, egresado de la Universidad Nacional de Córdoba. Brindamos soluciones no invasivas desde hace más de 15 años.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button 
                        onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20agendar%20un%20turno%20desde%20la%20p%C3%A1gina%20web', '_blank')}
                        className="px-5 py-3 bg-atlas-violet text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.3)] text-center cursor-pointer"
                      >
                        Agendar Turno
                      </button>
                      <button 
                        onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20los%20tratamientos%20del%20M%C3%A9todo%20Atlas', '_blank')}
                        className="px-5 py-3 glass text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/5 active:scale-95 transition-colors text-center cursor-pointer"
                      >
                        Saber Más
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                    <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[3px] sm:tracking-[4px] text-atlas-teal font-black italic">Contacto Profesional</h4>
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex gap-3 text-xs sm:text-sm">
                         <MapPin className="w-4 h-4 text-atlas-teal shrink-0 mt-0.5" />
                         <span className="text-atlas-white/70">Pje. Astigueta 1292, Salta</span>
                      </li>
                      <li className="flex gap-3 text-xs sm:text-sm">
                         <Phone className="w-4 h-4 text-atlas-teal shrink-0 mt-0.5" />
                         <span className="text-atlas-white/70">0387 481-6999</span>
                      </li>
                    </ul>
                    <div className="pt-2 sm:pt-4">
                      <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[2.5px] sm:tracking-[3px] text-atlas-white/20 font-black mb-2 sm:mb-3">Dominio Oficial</h4>
                      <span className="text-xs font-mono text-white/40">columna-vertebral.com.ar</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                    <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[3px] sm:tracking-[4px] text-atlas-white/30 font-black italic">Políticas de Privacidad</h4>
                    <div className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/5 space-y-3 sm:space-y-4">
                      <p className="text-[10px] sm:text-[11px] text-atlas-white/40 leading-relaxed italic">
                        "La confidencialidad del paciente es inquebrantable. Tratamos su información clínica bajo estricto cumplimiento de la Ley 25.326 de Protección de Datos Personales y el Secreto Profesional Médico."
                      </p>
                      <div className="border-t border-white/5 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                        <p className="text-[9px] sm:text-[10px] text-atlas-white/20 leading-relaxed uppercase font-black tracking-widest">
                          Propiedad de Lic. Villalba. Queda prohibida la reproducción o imitación del Método Atlas. Acciones legales ante cualquier intento de usurpación.
                        </p>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPrivacyOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-atlas-violet hover:text-white transition-colors group cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-glow-violet" />
                          <span>Ver Documento Legal (Ley 25.326)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 sm:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
                  <p className="text-[9px] sm:text-[10px] text-atlas-white/25 uppercase font-black tracking-[2px] sm:tracking-[4px]">
                    © 2011 - {new Date().getFullYear()} ATLAS QUIROPRAXIA • DERECHOS RESERVADOS
                  </p>
                  <div className="flex gap-6 items-center justify-center">
                    <a href="#" className="text-atlas-white/30 hover:text-white transition-colors p-1"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="text-atlas-white/30 hover:text-white transition-colors p-1"><Youtube className="w-5 h-5" /></a>
                    <a href="#" className="text-atlas-white/30 hover:text-white transition-colors p-1"><Facebook className="w-5 h-5" /></a>
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
