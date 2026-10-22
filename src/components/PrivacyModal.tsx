import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Lock, CheckCircle2, Server, KeyRound, ClipboardCheck, AlertTriangle, Smartphone, MapPin, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(168,85,247,0.3)] z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 bg-atlas-violet/20 border border-atlas-violet/30 rounded-xl text-atlas-violet">
                  <ShieldCheck className="w-5 h-5 text-glow-violet" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[3px] text-white">Documento Legal e Institucional</h2>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">columna-vertebral.com.ar • LEY 25.326 ARGENTINA</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
              
              {/* Cloudflare Encryption Banner */}
              <div className="bg-gradient-to-r from-[#F38020]/15 via-zinc-950/65 to-[#F38020]/5 border border-[#F38020]/30 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4">
                <div className="p-3 rounded-xl bg-[#F38020]/10 border border-[#F38020]/20 text-[#F38020] shrink-0">
                  <Server className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] bg-[#F38020] text-black font-black uppercase px-1.5 py-0.5 rounded tracking-wider">
                      PROTECCIÓN ACTIVA CLOUDFLARE
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono">ENCRIPTACIÓN SSL / TLS v1.3</span>
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase italic">
                    Seguridad Criptográfica Homologada de Extremo a Extremo
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    Los datos ingresados se transmiten de manera segura a través de un túnel cifrado asimétrico SSL de alta resistencia de Cloudflare, resguardando la privacidad de consultas e información biomecánica ante cualquier interceptor de red pública.
                  </p>
                </div>
              </div>

              {/* Legal Clauses Grid */}
              <div className="space-y-6 text-zinc-300 text-xs leading-relaxed text-left">
                
                {/* Intro Section */}
                <div className="space-y-2 border-b border-white/5 pb-4">
                  <h4 className="text-base font-black text-white uppercase italic">Política de Privacidad</h4>
                  <p>
                    El usuario puede utilizar el sitio oficial de <strong>columna-vertebral.com.ar</strong> para solicitar turnos, cancelarlos y realizar consultas precisas sobre los mismos de forma dinámica y autogestionada.
                  </p>
                  <p>
                    Al suministrar información clínica y antecedentes de sintomatología, el Usuario asiste al Administrador en el constante proceso de mejora de los servicios disponibles y en el desarrollo de nuevos tratamientos y productos posturales, siempre tendiendo a que el uso de los mismos se torne cada vez más sencillo, inmediato y ágil para los propios Usuarios pacientes.
                  </p>
                  <p className="text-white font-extrabold bg-atlas-violet/10 border border-atlas-violet/30 p-3 rounded-xl">
                    ⚠️ PROPORCIONAR DATOS PERSONALES SUPONE LA ACEPTACIÓN ABSOLUTA Y SIN RESERVAS DE LOS PRESENTES TÉRMINOS Y CONDICIONES Y POLÍTICAS DE PRIVACIDAD.
                  </p>
                </div>

                {/* Sec 1 */}
                <div className="space-y-2">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full animate-pulse" />
                    1. Información al Usuario titular de los datos personales
                  </h5>
                  <p>
                    El Usuario que utilice este canal oficial podrá proporcionar datos personales seleccionados a efectos de mantenerse en contacto y recibir información calificada respecto de los servicios quiroprácticos, ortopédicos y biomecánicos puestos a disposición de la persona.
                  </p>
                  <p>
                    El Administrador se ocupa diligentemente de que el Usuario cuente con la información veraz y necesaria para decidir de forma expresa, libre y voluntaria si desea brindar sus datos personales, informando a tal efecto las claras consecuencias de hacerlo, de la eventual negativa o de la inexactitud técnica de los mismos.
                  </p>
                  <p>
                    En ningún caso proporcionar los datos personales se erige como condición mandatoria o restrictiva para el goce y uso general del sitio web y sus servicios divulgativos. No obstante, si el Usuario decide voluntariamente proporcionar sus datos personales, asume la obligación del derecho civil de brindar datos estrictamente veraces, exactos, reales y completos. La inexactitud o falsedad de los mismos puede suponer severas dificultades de coordinación para entablar un diagnóstico directo y coordinar un turno con el Administrador.
                  </p>
                  <p>
                    <strong>COLUMNA-VERTEBRAL</strong> (bajo la dirección del consultorio del Lic. Juan Antonio Villalba, M.P. 542 en Salta) conservará los datos personales provistos por los correspondientes Usuarios de manera indefinida hasta tanto se encuentre completamente extinguida la finalidad asistencial o administrativa para la cual fueron recolectados, o bien hasta tanto el titular legal de dichos datos solicite por escrito su elisión formal.
                  </p>
                  <p className="border-l-2 border-atlas-teal pl-3 py-1 italic text-zinc-400">
                    Sustento Normativo: El titular de los datos personales podrá solicitar la oportuna actualización, rectificación y, cuando corresponda, la supresión o el sometimiento a absoluta confidencialidad de los datos personales provistos, pudiendo acceder en forma totalmente gratuita mientras se acredite un interés legítimo a tal fin, tal como lo prescribe taxativamente el artículo 14, inciso 3 de la Ley Nacional N° 25.326.
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    * La Dirección Nacional de Protección de Datos Personales, órgano de control supremo de la Ley N° 25.326 de la República Argentina, conserva la atribución de policía de protección ciudadana para atender denuncias y reclamos en torno al incumplimiento de estas normas.
                  </p>
                </div>

                {/* Sec 2 */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full animate-pulse" />
                    2. Finalidad de los datos recolectados
                  </h5>
                  <p>Los datos clínicos y biológicos recolectados de forma voluntaria tendrán por objeto exclusivo de aplicación:</p>
                  <ul className="list-disc pl-5 space-y-1.5 font-mono text-[10px] text-zinc-400">
                    <li>Optimizar los servicios profesionales y biomecánicos brindados por <strong>COLUMNA-VERTEBRAL</strong> / Lic. Juan Antonio Villalba.</li>
                    <li>Solicitar, agendar y confirmar turnos de forma fidedigna.</li>
                    <li>Cancelar turnos agendados previamente.</li>
                    <li>Enviar a los pacientes alertas instantáneas, recordatorios de consulta y confirmaciones por vía SMS, mensajería WhatsApp y/o correo electrónico, respecto a las prestaciones solicitadas o consultas realizadas.</li>
                  </ul>
                </div>

                {/* Sec 3 */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
                    3. Niveles de Seguridad Lógica y Física Integrada
                  </h5>
                  <p>
                    El responsable de la Base de Datos declara que adopta todas las medidas técnicas y organizativas que resulten pragmáticamente necesarias para garantizar la seguridad clínica, legal y la confidencialidad de la información personal de modo tal de evitar activamente su adulteración, pérdida, fuga, consulta malintencionada o tratamiento no autorizado por terceros, y que posean capacidades de detección rápida ante variaciones del flujo de información.
                  </p>
                  <p>
                    Asimismo, el consultorio de <strong>COLUMNA-VERTEBRAL / ATLAS</strong> protege los Datos Personales de tal modo que no puedan ser elididos de forma accidental o saboteados por entes de la red pública. Para resguardar con máxima fuerza los sistemas y a los usuarios se emplean las siguientes barreras lógicas de seguridad:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                    <li>Encriptación de comunicaciones / transferencia de datos mediante el protocolo homologado TLS/SSL (HTTPS activo en columna-vertebral.com.ar).</li>
                    <li>Encriptación de bases de datos que albergan descriptores clínicos, cervicalgias, antecedentes traumáticos o patologías discales (considerados datos sensibles clínicos).</li>
                    <li>Entorno cibernético seguro para el equipamiento del servidor y los sistemas físicos acotados de resguardo de datos de pacientes.</li>
                    <li>Políticas auditables en materia de recolección, administración temporal y tratamiento regulado, incluyendo estrictos controles biométricos de acceso manual a salas de base de consulta.</li>
                  </ul>
                </div>

                {/* Sec 4 */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
                    4. Campos de Información Personal Solicitados
                  </h5>
                  <p>La información clínica y administrativa suministrada voluntariamente por el usuario para coordinar sesiones consta de los siguientes campos de carácter confidencial:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-[10px] text-white pt-1">
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• Nombre</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• Apellido</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• E-mail</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• Teléfono celular</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• DNI (Titularidad)</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• Obra Social</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• Tipo de Sintomatología</div>
                    <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">• Antecedente Clínico</div>
                  </div>
                </div>

                {/* Sec 5 */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    5. Datos de Geolocalización y Dispositivos (Exclusión Activa)
                  </h5>
                  <p>
                    <strong className="text-white">Datos sobre el Dispositivo:</strong> En ningún momento <strong>COLUMNA-VERTEBRAL</strong> ni el activo oficial recopila datos específicos técnicos sobre el dispositivo como ser identificador IMEI, identificador publicitario, red móvil o el sistema operativo específico. Por ende, resulta materialmente inviable asociar o cruzar identificadores telefónicos o de hardware con las cuentas de turnos del sistema de identificación.
                  </p>
                  <p>
                    <strong className="text-white">Datos sobre Ubicación Física:</strong> Tampoco se recolectan ni procesan por automatismos datos satelitales GPS o metadatos de geolocalización real o inmediata del paciente.
                  </p>
                </div>

                {/* Sec 6 */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
                    6. Tratamiento por Terceras Partes (Restricción Absoluta)
                  </h5>
                  <p>
                    El Administrador no explota redes comerciales de publicidad anónima, estadísticas cruzadas de marketing ni hace uso comercial de cookies de terceras corporaciones. De igual manera, los datos ingresados en <strong>columna-vertebral.com.ar</strong> no son compartidos, transferidos, alquilados ni vendidos a compañías farmacéuticas o aseguradoras médicas privadas.
                  </p>
                </div>

                {/* Sec 7 */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h5 className="font-extrabold text-[#FF9900] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
                    7. Jurisdicción Judicial y Derecho Aplicable
                  </h5>
                  <p>
                    En relación con esta Política de Privacidad rigen estrictamente las disposiciones soberanas de la <strong>Ley N° 25.326 de Protección de Datos Personales</strong>, complementarias y concordantes de la República Argentina. La Autoridad de Aplicación legal es la Dirección Nacional de Protección de Datos Personales (Ministerio de Justicia de la Nación). 
                  </p>
                  <p>
                    Ante eventuales discrepancias relativas a la interpretación o debido cumplimiento judicial del pliego legal, las partes se someten formalmente a los <strong>Tribunales en lo Contencioso Administrativo Federal con sede en la Ciudad Autónoma de Buenos Aires</strong>, con exclusión deliberada de cualquier otro fuero nacional o extranjero.
                  </p>
                </div>

                {/* PARTE II: TERMINOS Y CONDICIONES */}
                <div className="pt-8 border-t border-white/10 space-y-4">
                  <h4 className="text-base font-black text-white uppercase italic flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FF9900] text-black text-[10px] font-black rounded uppercase tracking-wider">PARTE II</span>
                    TÉRMINOS Y CONDICIONES GENERALES
                  </h4>
                  <p>
                    Los presentes Términos y Condiciones rigen el alcance, obligaciones y límites jurídicos de la navegación e interacción del Usuario con los Servicios de columna-vertebral.com.ar.
                  </p>
                  <p>
                    El registro o solicitud táctica de consultas biomecánicas expresa la <strong>conformidad absoluta, ineludible e informada</strong> con estos términos y con la política de tratamiento de datos personales. El acceso general a la información es enteramente libre y gratuito. El paciente declara ser legalmente capaz de entender e incorporar estas pautas bajo fe de veracidad clínica y técnica.
                  </p>
                  <p>
                    El Usuario se compromete de manera ineludible a: no intentar hackear ni inspeccionar vulnerabilidades, no publicar datos de seguridad de servidores sin aviso formal previo y utilizar el recurso exclusivamente para resguardar la salud biomecánica de su columna. Las adulteraciones documentales médicas eximen de responsabilidad reparadora al Lic. Juan Antonio Villalba, MP 542.
                  </p>
                </div>

              </div>

              {/* Legal MP Seal */}
              <div className="border-t border-white/10 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left">
                  <h5 className="font-bold text-white text-xs uppercase">LIC. JUAN ANTONIO VILLALBA • MATRÍCULA PROFESIONAL 542</h5>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">DIRECTOR TÉCNICO GENERAL DE ATLAS • SALTA CAPITAL</p>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <span className="block text-[8px] text-zinc-500 font-mono">CUMPLIMIENTO LEGAL</span>
                    <span className="font-mono text-[9px] text-white font-black tracking-widest uppercase">REGISTRO AAIP COMPLIANT N° 3422-C</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-3 z-10">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors border border-white/10"
              >
                Cerrar Documento
              </button>
              <button
                onClick={() => {
                  onClose();
                  // Fallback anchor action just in case, but modal reading is primary!
                  window.open('/politica-de-privacidad', '_blank');
                }}
                className="px-6 py-3 bg-atlas-violet hover:bg-[#A855F7]/80 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Abrir en Nueva Ventana</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
