import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Map() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-atlas-dark relative overflow-hidden" id="ubicacion">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <img src="/facade-1.jpeg" alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 mb-4 sm:mb-6">
               <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">Ubicación Estratégica</h2>
               <h3 className="text-atlas-teal text-[10px] sm:text-[12px] font-black uppercase tracking-[2.5px] sm:tracking-[3px]">Quiropraxia en Salta Capital - Lic. Villalba</h3>
            </div>
            <p className="text-atlas-white/60 text-sm sm:text-base md:text-lg">
               Visítanos en nuestro centro de Salta Capital. Contamos con instalaciones de primer nivel diseñadas para tu comodidad.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-atlas-teal/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-atlas-teal w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base uppercase tracking-wider italic">Dirección Sede Central</h4>
                  <p className="text-atlas-white/60 text-xs sm:text-sm">Pje. Astigueta 1292, A4400 Salta, Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-atlas-teal/10 flex items-center justify-center shrink-0">
                  <Clock className="text-atlas-teal w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base uppercase tracking-wider italic">Horarios de Atención</h4>
                  <p className="text-atlas-white/60 text-xs sm:text-sm">Lunes a Sábado: 07:00hs – 18:00hs</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-atlas-teal/10 flex items-center justify-center shrink-0">
                  <Phone className="text-atlas-teal w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base uppercase tracking-wider italic">Atención Directa</h4>
                  <p className="text-atlas-white/60 text-xs sm:text-sm">0387 481-6999</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[380px] md:h-[480px] rounded-2xl sm:rounded-[32px] overflow-hidden glass border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            {/* Real Map Sync */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.606346761614!2d-65.42171440000001!3d-24.79155980000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc308ff28d7a3%3A0xe2128bca689ca114!2sPje.%20Astigueta%201292%2C%20A4400%20Salta!5e0!3m2!1sen!2sar!4v1714600000000!5m2!1sen!2sar" 
              className="absolute inset-0 w-full h-full grayscale invert-[0.85] contrast-125 opacity-90"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
