import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  Send, 
  CheckCircle2, 
  MapPin, 
  ShieldAlert,
  MessageSquare
} from 'lucide-react';

export default function ResonanceSchedule() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pathology: 'lumbalgia',
    preferredDate: '',
    preferredTime: 'tarde',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Build WhatsApp message URL
    const message = `Hola Lic. Juan Antonio Villalba, solicito un turno para quiropraxia en Salta:
- Nombre: ${formData.name}
- Teléfono: ${formData.phone}
- Motivo de consulta: ${formData.pathology}
- Día preferido: ${formData.preferredDate || 'A coordinar'}
- Franja horaria: ${formData.preferredTime}
- Detalle: ${formData.notes || 'Sin observaciones'}`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5493874000000?text=${encoded}`;

    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="turnos" className="py-12 sm:py-16 lg:py-24 bg-slate-900/80 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Agenda & Turnos Online</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Reservá tu Consulta en Salta Capital
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-300">
            Completá tus datos para coordinar día y horario directamente con el consultorio del <strong className="text-white">Lic. Juan Antonio Villalba</strong>.
          </p>
        </div>

        {/* Reservation Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                ¡Solicitud de Turno Enviada!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Se abrió WhatsApp para confirmar la fecha exacta con el consultorio. Si no se abrió la ventana, podés hacer clic abajo:
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white underline underline-offset-4"
                >
                  Modificar datos del turno
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Ej: Marcelo Ramos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 387 154 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pathology selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Motivo Principal de Consulta
                  </label>
                  <select
                    value={formData.pathology}
                    onChange={(e) => setFormData({ ...formData, pathology: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Lumbalgia / Dolor de cintura">Lumbalgia / Dolor de cintura</option>
                    <option value="Ciática / Dolor en pierna">Ciática / Dolor en pierna</option>
                    <option value="Hernia de disco / Pinzamiento">Hernia de disco / Pinzamiento</option>
                    <option value="Cervicalgia / Cuello y Mareos">Cervicalgia / Cuello y Mareos</option>
                    <option value="Alineación preventiva Método Atlas">Alineación preventiva Método Atlas</option>
                    <option value="Otro motivo">Otro motivo de consulta</option>
                  </select>
                </div>

                {/* Preferred date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Día Preferido (Aproximado)
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Preferred time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferencia Horaria
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Por la mañana (09:00 a 13:00)">Por la mañana (09:00 a 13:00)</option>
                    <option value="Por la tarde (16:00 a 20:30)">Por la tarde (16:00 a 20:30)</option>
                    <option value="Cualquier horario disponible">Cualquier horario disponible</option>
                  </select>
                </div>
              </div>

              {/* Extra Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ¿Traés resonancia, radiografía o diagnóstico previo? (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contanos brevemente hace cuánto tenés el dolor o si tenés estudios médicos previos..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Submit CTA - Generous touch button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Enviar y Coordinar Turno por WhatsApp Directo</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Respuesta rápida en el día · Consultorio céntrico en Salta Capital
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
