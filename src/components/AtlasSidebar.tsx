import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Calendar, 
  Video, 
  MapPin, 
  ShieldCheck, 
  Scale,
  BrainCircuit,
  PhoneCall,
  Clock,
  Instagram,
  Youtube,
  Facebook,
  BookOpen,
  Activity
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';

const mainSections = [
  { title: "INICIO", icon: Stethoscope, url: "/" },
  { title: "GLOSARIO", icon: Activity, url: "/patologias" },
  { title: "VIDEOS / ENTREVISTAS", icon: Video, url: "/programaciones" },
  { title: "SECCIÓN EDUCATIVA", icon: BookOpen, url: "/academia" },
];

const clinicInfo = [
  { title: "Sede Central Salta", icon: MapPin, text: "Pje. Astigueta 1292, Salta" },
  { title: "Atención", icon: Clock, text: "Lun-Sáb: 07:00 - 18:00" },
  { title: "Contacto Directo", icon: PhoneCall, text: "0387 481-6999" },
];

export function AtlasSidebar() {
  const { setOpenMobile, setOpen } = useSidebar();
  const handleNavClick = () => {
    setOpenMobile(false);
    setOpen(false);
  };

  return (
    <Sidebar side="right" className="glass border-l border-white/10 bg-atlas-dark/95 backdrop-blur-2xl">
      <SidebarHeader className="p-4 sm:p-6 border-b border-white/5">
        <Link to="/" onClick={handleNavClick} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img src="/logo-atlas.jpeg" alt="ATLAS Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">ATLAS</span>
            <span className="text-[10px] uppercase tracking-[2px] text-atlas-teal font-black">Columna Vertebral</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* MAIN NAVIGATION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] text-atlas-white/30 uppercase tracking-[3px] font-bold mb-3 sm:mb-4">Navegación Profesional</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainSections.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-atlas-violet/10 h-11 sm:h-12 rounded-xl transition-all group">
                    <Link to={item.url} onClick={handleNavClick} className="flex items-center gap-3 sm:gap-4 px-3">
                      <item.icon className="w-5 h-5 text-atlas-violet group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-[13px] font-black text-white/80 group-hover:text-white uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* CLINC GALLERY MINI - NEW SECTION */}
        <SidebarGroup>
           <SidebarGroupLabel className="text-[10px] text-atlas-white/30 uppercase tracking-[3px] font-bold mb-4">Nuestras Instalaciones</SidebarGroupLabel>
           <div className="grid grid-cols-2 gap-2 px-1">
              {['/facade-1.jpeg', '/interior-1.jpeg', '/facade-3.jpeg', '/facade-2.jpeg'].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/5 group/img relative">
                   <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-110" />
                   <div className="absolute inset-0 bg-atlas-violet/10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                </div>
              ))}
           </div>
        </SidebarGroup>

        {/* MISSION STATEMENT */}
        <SidebarGroup>
          <div className="bg-atlas-violet/5 rounded-2xl p-5 border border-atlas-violet/20 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 w-24 h-24 bg-atlas-violet/10 blur-3xl rounded-full" />
            <h4 className="text-atlas-violet text-[11px] font-black uppercase tracking-[2px] mb-3 flex items-center gap-2 italic">
              <Scale className="w-3 h-3" />
              Compromiso Ético
            </h4>
            <p className="text-[12px] text-white/90 leading-relaxed font-bold italic">
              "Brindar claridad diagnóstica absoluta para evitar procedimientos quirúrgicos riesgosos."
            </p>
          </div>
        </SidebarGroup>

        {/* CLINIC DATA */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] text-atlas-white/30 uppercase tracking-[3px] font-bold mb-4">Información del Centro</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            {clinicInfo.map((info) => (
              <div key={info.title} className="flex items-start gap-4 px-3 group/info">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/info:bg-atlas-teal/10 transition-colors">
                  <info.icon className="w-4 h-4 text-atlas-teal" />
                </div>
                <div>
                  <p className="text-[10px] text-atlas-white/30 font-bold uppercase tracking-wider">{info.title}</p>
                  <p className="text-[13px] text-white/90 font-medium">{info.text}</p>
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SOCIAL LINKS */}
        <SidebarGroup>
           <SidebarGroupLabel className="text-[10px] text-atlas-white/30 uppercase tracking-[3px] font-bold mb-4">Redes Sociales</SidebarGroupLabel>
           <div className="flex gap-4 px-3">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-atlas-violet/20 hover:text-atlas-violet transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-atlas-violet/20 hover:text-atlas-violet transition-all"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-atlas-violet/20 hover:text-atlas-violet transition-all"><Facebook className="w-4 h-4" /></a>
           </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-white/5 bg-black/20">
        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-center gap-2 py-3 bg-atlas-violet text-white font-black uppercase text-xs tracking-[2px] rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-transform"
            onClick={() => window.open('https://wa.me/5493874816999?text=Hola!%20Quiero%20agendar%20un%20turno%20para%20una%20consulta', '_blank')}
          >
            <Calendar className="w-4 h-4" />
            Agenda un Turno
          </button>
          
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-3">
              <ShieldCheck className="w-3.5 h-3.5 text-atlas-teal/40" />
              <span className="text-[9px] text-atlas-white/20 uppercase font-black tracking-widest leading-none">
                Control de Matrícula M.P. 542
              </span>
            </div>
            
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-privacy-modal'));
              }}
              className="flex items-center gap-2 px-3 hover:text-white transition-colors text-left group cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-atlas-violet/60 group-hover:text-atlas-violet transition-colors" />
              <span className="text-[9px] text-atlas-white/30 uppercase font-black tracking-widest leading-none group-hover:text-atlas-white/80 transition-colors">
                Ver Políticas y Términos (Ley 25.326)
              </span>
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
