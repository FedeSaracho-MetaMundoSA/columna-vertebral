import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Activity, Youtube, BookOpen } from 'lucide-react';

export default function FloatingNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Inicio', path: '/', icon: Home, color: 'text-atlas-teal hover:text-white' },
    { name: 'Glosario', path: '/patologias', icon: Activity, color: 'text-atlas-gold hover:text-white' },
    { name: 'Videos', path: '/programaciones', icon: Youtube, color: 'text-atlas-orange hover:text-white' },
    { name: 'Academia', path: '/academia', icon: BookOpen, color: 'text-atlas-violet hover:text-white' },
  ];

  const isHome = currentPath === '/';

  if (isHome) {
    // Inline grid version for the Homepage, placed right above "Nuestra Misión"
    return (
      <div className="w-full flex justify-center py-6 sm:py-10 bg-atlas-dark relative z-20 px-3 sm:px-4 md:px-6" id="homepage-nav-container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-4xl p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
          id="homepage-nav-dock"
        >
          {/* 2x2 grid on mobile/tablet, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const isActive = item.path === '/';
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-6 rounded-xl sm:rounded-2xl transition-all border cursor-pointer text-center group
                    ${isActive 
                      ? 'bg-white/5 border-white/15' 
                      : 'bg-transparent border-transparent hover:border-white/10 hover:bg-white/5'}`}
                  id={`floating-nav-btn-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon 
                    className={`w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 relative z-10
                      ${isActive 
                        ? 'text-atlas-gold drop-shadow-[0_0_10px_rgba(253,185,49,0.5)]' 
                        : item.name === 'Videos'
                          ? 'text-red-500 group-hover:scale-110 group-hover:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                          : 'text-neutral-400 group-hover:scale-110 group-hover:text-white'}`}
                  />
                  
                  <span 
                    className={`text-[9.5px] sm:text-xs font-black uppercase tracking-wider relative z-10 transition-colors duration-300
                      ${isActive ? 'text-white font-black' : 'text-neutral-500 group-hover:text-neutral-300'}`}
                  >
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="absolute bottom-1.5 sm:bottom-2.5 w-1.5 h-1.5 rounded-full bg-atlas-gold shadow-[0_0_8px_rgba(253,185,49,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  // Floating version for other pages
  return (
    <motion.div
      initial={{ y: 100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 100 }}
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 px-2 py-1 sm:px-3 sm:py-2 md:px-6 md:py-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-2 md:gap-3 max-w-[94vw]"
      id="floating-nav-dock"
    >
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center gap-0.5 sm:gap-1 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 rounded-xl transition-all group cursor-pointer"
            id={`floating-nav-btn-${item.name.toLowerCase().replace(' ', '-')}`}
          >
            {/* Background highlight pill for active item */}
            {isActive && (
              <motion.div
                layoutId="activeFloatingPill"
                className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}

            <item.icon 
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 transition-all duration-300 relative z-10
                ${isActive 
                  ? 'text-atlas-gold scale-110 drop-shadow-[0_0_10px_rgba(253,185,49,0.5)]' 
                  : item.name === 'Videos'
                    ? 'text-red-500 group-hover:scale-110 group-hover:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                    : 'text-neutral-400 group-hover:scale-110 group-hover:text-white'}`}
            />
            
            <span 
              className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider relative z-10 transition-colors duration-300
                ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}
            >
              {item.name}
            </span>

            {/* Accent glowing dot below the icon */}
            {isActive && (
              <span className="absolute bottom-0 w-1 h-1 rounded-full bg-atlas-gold shadow-[0_0_8px_rgba(253,185,49,0.8)]" />
            )}
          </Link>
        );
      })}
    </motion.div>
  );
}

