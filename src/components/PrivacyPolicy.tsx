import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2, Server, HelpCircle, ShieldAlert, Heart, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  // Scroll to top on load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-atlas-dark text-white py-16 px-6 md:px-12 relative overflow-hidden selection:bg-atlas-violet selection:text-white">
      {/* Background Cybernetic Matrix lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-atlas-violet/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-atlas-violet/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF9900] hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </button>
          
          <div className="flex items-center gap-3 bg-zinc-950/60 border border-emerald-500/30 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 tracking-wider font-extrabold uppercase">
              CONEXIÓN CIFRADA CON SISTEMA DE SEGURIDAD TLS/SSL
            </span>
          </div>
        </div>

        {/* CLOUDFLARE ENCRYPTION HEADER BANNER */}
        <div className="bg-gradient-to-r from-[#F38020]/20 via-zinc-950/65 to-[#F38020]/10 border border-[#F38020]/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-stretch gap-6 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#F38020]/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-center p-4 rounded-2xl bg-[#F38020]/10 border border-[#F38020]/20 shrink-0 text-[#F38020]">
            <Server className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-[#F38020] text-black font-black uppercase px-2 py-0.5 rounded tracking-widest">
                PROTECCIÓN AVANZADA CLOUDFLARE
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">TLS v1.3</span>
            </div>
            <h2 className="text-lg font-black tracking-tight text-white uppercase italic">
              Cifrado Digital, HTTPS Securizado y Firewall Activo
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Para resguardar el activo digital de <strong>columna-vertebral.com.ar</strong> ante accesos indebidos e interceptación de tráfico de datos, la plataforma emplea protocolos de cifrado asimétrico SSL de alta resistencia provistos por servidores seguros, garantizando que su información clínica y solicitudes de turnos viajen bajo estricto sigilo digital.
            </p>
          </div>
        </div>

        {/* LEGAL BODY */}
        <div className="space-y-12 bg-zinc-950/55 border border-white/5 p-8 md:p-12 rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
          
          {/* Main Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-atlas-violet">
              <ShieldCheck className="w-5 h-5 text-glow-violet" />
              <span className="text-[11px] font-black uppercase tracking-[4px] text-glow-violet">POLÍTICAS LEGALES E INSTITUCIONALES</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tight leading-none">
              POLÍTICA DE PRIVACIDAD DE DATOS Y TERMINOS Y CONDICIONES
            </h1>
            <p className="text-xs font-mono text-zinc-500">
              Marco Regulatorio aplicable en la República Argentina — Ley N° 25.326 de Protección de Datos Personales.
            </p>
          </div>

          {/* PARTE I: POLITICA DE PRIVACIDAD */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-atlas-violet rounded-full" />
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">I. POLÍTICA DE PRIVACIDAD</h2>
            </div>
            
            <p className="text-zinc-300 text-sm leading-relaxed">
              El usuario puede utilizar este sitio web oficial e institucional de <strong>columna-vertebral.com.ar</strong> para solicitar turnos, cancelarlos y realizar consultas sobre los mismos de forma dinámica.
            </p>

            <p className="text-zinc-300 text-sm leading-relaxed">
              Al suministrar información en este sitio web, el Usuario asiste al Administrador (Lic. Juan Antonio Villalba / ATLAS) en el constante proceso de mejora de los servicios disponibles y en el desarrollo de nuevos productos clínicos o asistenciales, siempre tendiendo a que el uso de los mismos se torne lo más sencillo, inmediato y ágil para todos los Usuarios.
            </p>

            <div className="bg-atlas-violet/5 border border-atlas-violet/20 p-4 rounded-2xl">
              <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                <span className="text-[#FF9900] font-black">IMPORTANTE:</span> Proporcionar datos personales a través de los canales de este activo digital supone la <strong>aceptación absoluta y sin reservas</strong> de todos los términos y condiciones aquí establecidos.
              </p>
            </div>

            {/* ARTICULO 1 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">1.</span> Información al Usuario titular de los datos personales
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Usuario que utilice el sitio web de columna-vertebral.com.ar podrá proporcionar algunos datos personales a efectos de mantenerse en contacto y recibir información precisa respecto de servicios de alineación, cuidado quiropráctico, ortopedia de pie, ergonomía, análisis postural o kinesiología terapéutica en general.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Administrador se ocupa activamente de que el Usuario cuente con la información veraz y necesaria para decidir de forma expresa, libre y voluntaria si desea brindar sus datos de carácter personal, informando a tal efecto las consecuencias de hacerlo, de la negativa o de la inexactitud de los mismos.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                En ningún caso proporcionar los datos personales en la plataforma constituye una condición condicionante para el uso general de la web institucional. No obstante, si el Usuario decide voluntariamente proporcionar sus datos personales, se compromete y obliga a brindar datos veraces, exactos, reales y completos. La inexactitud de los mismos puede suponer dificultades infranqueables para establecer un vínculo inmediato o agendar de forma fehaciente su turno con el Administrador.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Administrador (ATLAS / Lic. Juan Antonio Villalba, M.P. 542) conservará todos los datos personales brindados por los correspondientes Usuarios hasta el momento exacto en que se encuentre extinguida la finalidad clínica o administrativa para la cual fueron recolectados, o bien hasta tanto el titular de dichos datos solicite de manera expresa y formal la elisión de los mismos.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El titular de los datos personales podrá solicitar en cualquier momento la actualización, rectificación y, cuando corresponda, la supresión o el sometimiento a confidencialidad de los datos personales oportunamente provistos, pudiendo acceder en forma totalmente gratuita mientras se acredite un interés legítimo a tal fin, de conformidad con lo establecido expresamente en el <strong>artículo 14, inciso 3 de la Ley Nacional N° 25.326</strong>.
              </p>
              <p className="text-xs text-zinc-500 italic">
                * La Dirección Nacional de Protección de Datos Personales, órgano de control de la Ley N° 25.326 de la República Argentina, conserva la atribución legal y de policía administrativa de atender las denuncias y reclamos que se formulen de forma oficial en relación con el eventual incumplimiento de las normas sobre protección de datos personales.
              </p>
            </div>

            {/* ARTICULO 2 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">2.</span> Finalidad de los datos recolectados
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Los datos recolectados voluntariamente tendrán por finalidad exclusiva:
              </p>
              <ul className="list-disc pl-5 text-xs text-zinc-400 space-y-1.5 font-mono">
                <li>Optimizar los servicios asistenciales brindados por el consultorio de ATLAS / Lic. Juan Antonio Villalba.</li>
                <li>Solicitar, agendar, re-programar y confirmar turnos de consulta biomecánica presencial o virtual de forma fidedigna.</li>
                <li>Cancelar turnos previstos que el usuario no pueda ocupar.</li>
                <li>Enviar de manera automática o programada alertas por SMS, canales de mensajería interactiva como WhatsApp y/o correo electrónico, respecto a los servicios institucionales que el paciente hubiera solicitado o consultado.</li>
              </ul>
            </div>

            {/* ARTICULO 3 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">3.</span> Seguridad Técnica e Institucional
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El responsable legal de las bases de datos de columna-vertebral.com.ar declara formalmente que adopta las medidas técnicas, organizativas y físicas que resulten necesarias de acuerdo con la tecnología actual para garantizar la seguridad y absoluta confidencialidad de los datos personales de los pacientes, de modo tal de evitar su adulteración, pérdida fortuita, consulta inapropiada o tratamiento no autorizado por agentes externos, permitiendo detectar de forma temprana cualquier desvío de flujo de información digital.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Asimismo, el Administrador protege los Datos Personales de tal forma que no puedan ser elididos accidentalmente ni saboteados. Para proteger el ecosistema digital de ATLAS y a los correspondientes Usuarios de cualquier modificación, divulgación no consentida o destrucción no autorizada se toman los siguientes recaudos cibernéticos:
              </p>
              <ul className="list-none space-y-2 pt-1">
                <li className="flex items-start gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Cifrado robusto de las comunicaciones y de la transferencia de datos mediante el protocolo seguro SSL/TLS nativo.</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Cifrado y segregación perimetral de aquellos datos definidos como sensibles o de índole clínica médica/física considerados críticos bajo el Secreto Profesional.</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Establecimiento de un entorno tecnológico local y restringido para el equipamiento de hardware y sistemas embebidos utilizados para resguardar la base de consulta.</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Políticas estrictamente definidas en materia de recolección, almacenamiento temporal y tratamiento regulado de datos personales bajo las directas normativas bioéticas.</span>
                </li>
              </ul>
            </div>

            {/* ARTICULO 4 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">4.</span> Detalle de Información Personal Recolectada
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                La información de contacto y personal del Usuario que opta voluntariamente por registrarse o ponerse en contacto para agendar una sesión de análisis clínico puede contener los siguientes campos informativos:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] font-mono font-medium text-white pt-1">
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• Nombre</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• Apellido</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• E-mail</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• Teléfono móvil</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• Sexo</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• DNI (Identidad)</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• Obra Social</div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">• Motivo Clínico</div>
              </div>
            </div>

            {/* ARTICULO 5 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">5.</span> Información de Dispositivos y Geolocalización (No Recolección)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-white">Datos sobre el Dispositivo:</strong> En ningún momento el Administrador recopila de forma activa datos específicos relativos a los identificadores de hardware individuales del paciente, datos confidenciales de la red telefónica móvil, dirección MAC de tarjetas de red, ni el sistema operativo de origen de navegación. No es técnicamente realizable asociar ni cruzar datos de identificadores de hardware o red telefónica de procedencia del Usuario con su ficha o solicitud.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-white">Ubicación Física Real:</strong> La plataforma de columna-vertebral.com.ar tampoco recopila, almacena ni trata a través de automatismos datos referentes a la ubicación satelital ni geolocalización real e inmediata del Usuario en tiempo real.
              </p>
            </div>

            {/* ARTICULO 6 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">6.</span> Uso de Datos por Terceros (No Distribución)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Administrador <strong>no recopila información de tracking estadístico ni hace uso comercial de servicios de rastreo de redes publicitarias de terceros</strong>. De igual modo, los datos de salud, inervaciones y contacto clínico recopilados por ATLAS no son bajo ninguna circunstancia transferidos, vendidos o expuestos a laboratorios multinacionales o corporaciones de seguros de salud.
              </p>
            </div>

            {/* ARTICULO 7 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#FF9900]">7.</span> Jurisdicción y Derecho Aplicable
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                En relación con esta Política de Privacidad rigen plenamente las disposiciones y mandatos jurídicos de la <strong>Ley Nacional N° 25.326 de Protección de Datos Personales de la República Argentina</strong>, su correspondiente Decreto Reglamentario N° 1558/2001 y normativas complementarias de control.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                La Autoridad de Aplicación directa encargada de tutelar vuestro derecho es la Dirección Nacional de Protección de Datos Personales, con asiento oficial en el Ministerio de Justicia. En caso de suscitarse eventuales controversias relativas a la interpretación jurídica o efectivo cumplimiento de la presente, tanto el Administrador como el Usuario se someten formalmente y con exclusión de cualquier otro fuero a los <strong>Tribunales Nacionales en lo Contencioso Administrativo Federal con jurisdicción y asiento en la Ciudad Autónoma de Buenos Aires</strong>.
              </p>
            </div>
          </div>

          {/* PARTE II: TERMINOS Y CONDICIONES */}
          <div className="space-y-6 pt-10 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#FF9900] rounded-full" />
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">II. TÉRMINOS Y CONDICIONES DE USO</h2>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">
              Los presentes Términos y Condiciones definen las normas aplicables al acceso, navegación y uso voluntario de la plataforma web de columna-vertebral.com.ar por parte del Usuario.
            </p>

            {/* T&C ARTICULO 1 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-atlas-violet">►</span> Alcance y Aceptación Absoluta
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El registro voluntario, consulta de patologías o envío de información clínica a través de la presente aplicación web indica la aceptación absoluta e incondicional de los presentes Términos y Condiciones vigentes y de la Política de Privacidad del activo digital.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El acceso general a la información anatómica es libre, público y gratuito para fines divulgativos generales. El Usuario que use o solicite sesiones quiroprácticas declara formalmente ser mayor de 18 años, o bien contar con la debida y expresa autorización y condescendencia de sus progenitores o tutores legales para someterse a análisis biomecánicos de columna. El Administrador deslinda cualquier responsabilidad por inexactitud o falsedad en las declaraciones personales de edad del Usuario.
              </p>
            </div>

            {/* T&C ARTICULO 2 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-atlas-violet">►</span> Obligaciones, Responsabilidades y Seguridad del Paciente
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Usuario se obliga de manera irrevocable a usar los servicios puestos a disposición en columna-vertebral.com.ar de conformidad estricta con las leyes, la buena fe, la seguridad informática y el orden constitucional. Queda expresamente tipificado que el Usuario se compromete formalmente a:
              </p>
              <ul className="list-disc pl-5 text-xs text-zinc-400 space-y-2 font-mono">
                <li><strong className="text-white">Respetar la Seguridad Tecnológica:</strong> No intentar penetrar bases de datos restringidas, no vulnerar cortafuegos, ni buscar de forma malintencionada vulnerabilidades lógicas en la infraestructura de cara a explotarlas con propósitos delictivos o difamatorios.</li>
                <li><strong className="text-white">Confidencialidad de Identificación:</strong> No divulgar a través de foros o redes informativas eventuales fallas de seguridad halladas en el activo digital, comprometiéndose a notificar de forma privada e inmediata al Administrador clínicas cualquier incidente que detecte.</li>
                <li><strong className="text-white">Veracidad Científica:</strong> Proporcionar antecedentes físicos auténticos, radiologías emitidas por institutos habilitados de diagnóstico y no fraguar su historial clínico para conseguir ajustes o vectores de alineación inapropiados.</li>
              </ul>
            </div>

            {/* T&C ARTICULO 3 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-atlas-violet">►</span> Uso General de Solicitud de Consultas
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                La solicitud de turnos quiroprácticos u ortopédicos específicos requiere la validación mediante contacto de WhatsApp oficial o el correspondiente formulario en línea. Toda la información médica transmitida se resguarda bajo la estricta clave del secreto profesional y médica.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Administrador se reserva el derecho de rechazar unilateralmente solicitudes que presenten indicios de spam, perfiles de usuario mendaces o intentos de suplantación de identidad para garantizar la seguridad clínica del consultorio.
              </p>
            </div>

            {/* T&C ARTICULO 4 */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-atlas-violet">►</span> Modificaciones del Pliego Legal
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El Administrador se reserva el pleno derecho de modificar, ampliar, recortar o re-adecuar los presentes Términos y Condiciones y Políticas de Privacidad en cualquier momento de acuerdo con los cambios en la legislación nacional en materia sanitaria o informática, comprometiéndose a anunciarlo idóneamente mediante un aviso destacado dentro de la portada del activo digital oficial para el conocimiento ineludible de la masa de pacientes habituales.
              </p>
            </div>

          </div>

          {/* Sello o Firma Institucional */}
          <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Lic. Juan Antonio Villalba</h4>
              <p className="text-xs font-mono text-zinc-500">M.P. 542 - Matrícula Profesional de Kinesiología y Fisioterapia</p>
              <p className="text-[10px] uppercase font-black text-atlas-teal tracking-widest">DIRECCIÓN TÉCNICA GENERAL • ATLAS COLUMNA VERTEBRAL</p>
              <p className="text-[10px] text-zinc-500 font-mono">Salta, República Argentina</p>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/15 flex items-center gap-3 shrink-0">
              <ClipboardCheck className="w-5 h-5 text-emerald-400 text-glow-emerald" />
              <div className="text-left font-mono">
                <div className="text-[10px] text-white/40">MARCO REGULATORIO</div>
                <div className="text-[11px] font-black text-white uppercase tracking-widest">LEY NACIONAL N° 25.326</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-atlas-violet hover:bg-[#A855F7]/80 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            Entendido, Volver al Sitio Oficial
          </button>
        </div>

      </div>
    </div>
  );
}
