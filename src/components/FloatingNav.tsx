import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Activity, Youtube, BookOpen } from 'lucide-react';

export default function FloatingNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Glosario', path: '/patologias', icon: Activity },
    { name: 'Videos', path: '/programaciones', icon: Youtube },
    { name: 'Academia', path: '/academia', icon: BookOpen },
  ];

  const isHome = currentPath === '/';

  if (isHome) {
    return (
      <div className="w-full flex justify-center py-6 bg-[#09090b] relative z-20 px-4" id="homepage-nav-container">
        <div
          className="w-full max-w-3xl p-2 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-xl"
          id="homepage-nav-dock"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navItems.map((item) => {
              const isActive = item.path === '/';
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl transition-all border cursor-pointer text-center group active:scale-95
                    ${isActive 
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-sm' 
                      : 'bg-white/[0.03] border-white/5 text-neutral-300 hover:text-white hover:bg-white/10'}`}
                  id={`floating-nav-btn-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-teal-400 group-hover:text-teal-300'} transition-colors`} />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Floating dock for subpages
  return (
    <motion.div
      initial={{ y: 80, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-1 sm:gap-2 max-w-[92vw]"
      id="floating-nav-dock"
    >
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              isActive ? 'bg-white/10 text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            id={`floating-nav-btn-${item.name.toLowerCase().replace(' ', '-')}`}
          >
            <item.icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
}
