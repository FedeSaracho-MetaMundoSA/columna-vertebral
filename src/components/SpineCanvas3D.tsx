import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Radio, Sparkles } from 'lucide-react';

interface VertebraNode {
  name: string;
  code: string;
  x: number; // 3D coordinates relative to center
  y: number;
  z: number;
  desc: string;
  type: 'cervical' | 'thoracic' | 'lumbar' | 'sacrum';
}

export default function SpineCanvas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D rotation angles
  const [rotX, setRotX] = useState<number>(-0.15);
  const [rotY, setRotY] = useState<number>(0.3);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<VertebraNode | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });

  // Generate 3D Spinal Column Vertebrae: Full set of exactly 32 clinically accurate vertebrae (C1-C7, T1-T12, L1-L5, S1-S5, Co1-Co3)
  const vertebrae: VertebraNode[] = [
    { name: "Atlas (C1) - Primera Cervical", code: "C1", x: 0, y: -150, z: 0, desc: "Soporta el cráneo y facilita la rotación principal. Influye en el tronco encefálico y el suministro de sangre a la cabeza.", type: 'cervical' },
    { name: "Axis (C2) - Segunda Cervical", code: "C2", x: 1, y: -140, z: 1, desc: "Sirve de pivote giratorio para el Atlas. Fundamental para la movilidad del cuello e inervación de ojos y nervios auditivos.", type: 'cervical' },
    { name: "Tercera Cervical (C3)", code: "C3", x: 2, y: -130, z: 2, desc: "Relacionada con el control muscular de la cara, senos nasales y el sistema del nervio periférico neumogástrico superior.", type: 'cervical' },
    { name: "Cuarta Cervical (C4)", code: "C4", x: 3, y: -120, z: 3, desc: "Clave en la inervación del diafragma para la función respiratoria, hombros y faringe.", type: 'cervical' },
    { name: "Quinta Cervical (C5)", code: "C5", x: 4, y: -110, z: 4, desc: "Inerva las cuerdas vocales, glándulas del cuello y los músculos bíceps y deltoides en el brazo anterior.", type: 'cervical' },
    { name: "Sexta Cervical (C6)", code: "C6", x: 3, y: -100, z: 3, desc: "Controla los extensores de la muñeca. Su desalineación suele generar rigidez, tensión y parestesias en los hombros.", type: 'cervical' },
    { name: "Vértebra Prominente (C7)", code: "C7", x: 1, y: -90, z: 1, desc: "Unión de alta carga cervicodorsal. Inerva los tríceps, músculos del hombro y dedos de las manos.", type: 'cervical' },
    { name: "Primera Torácica (T1)", code: "T1", x: -1, y: -78, z: -1, desc: "Soporta la parte baja del brazo, la muñeca, las manos y los dedos, además del esófago y la tráquea.", type: 'thoracic' },
    { name: "Segunda Torácica (T2)", code: "T2", x: -3, y: -68, z: -3, desc: "Asociada directamente con la inervación funcional del corazón y sus arterias coronarias.", type: 'thoracic' },
    { name: "Tercera Torácica (T3)", code: "T3", x: -5, y: -58, z: -5, desc: "Conectada con los bronquios, pulmones, pleura y capacidad torácica respiratoria general.", type: 'thoracic' },
    { name: "Cuarta Torácica (T4)", code: "T4", x: -7, y: -48, z: -7, desc: "Inervación del sistema biliar y la vesícula, frecuentemente relacionada con tensiones de drenaje digestivo.", type: 'thoracic' },
    { name: "Quinta Torácica (T5)", code: "T5", x: -8, y: -38, z: -8, desc: "Regula funciones hepáticas, el plexo solar y la circulación arterial general del torso.", type: 'thoracic' },
    { name: "Sexta Torácica (T6)", code: "T6", x: -9, y: -28, z: -9, desc: "Afecta directamente el estómago e influye sobre la acidez gástrica y el proceso de digestión estomacal.", type: 'thoracic' },
    { name: "Séptima Torácica (T7)", code: "T7", x: -8, y: -18, z: -8, desc: "Inerva el páncreas y el duodeno, esenciales para la secreción enzimática digestiva.", type: 'thoracic' },
    { name: "Octava Torácica (T8)", code: "T8", x: -7, y: -8, z: -7, desc: "Regula los estímulos neurológicos del bazo y asiste la respuesta inmunitaria orgánica general.", type: 'thoracic' },
    { name: "Novena Torácica (T9)", code: "T9", x: -5, y: 2, z: -5, desc: "Inervación de glándulas suprarrenales, regulando la liberación de adrenalina y cortisol.", type: 'thoracic' },
    { name: "Décima Torácica (T10)", code: "T10", x: -3, y: 12, z: -3, desc: "Controla las funciones renales de filtración de líquidos y estabilidad hídrica general.", type: 'thoracic' },
    { name: "Undécima Torácica (T11)", code: "T11", x: -1, y: 22, z: -1, desc: "Inervación de los uréteres y control secundario de eliminación de toxinas metabólicas.", type: 'thoracic' },
    { name: "Duodécima Torácica (T12)", code: "T12", x: 1, y: 32, z: 1, desc: "Transmisión vital en la unión toracolumbar. Inerva el intestino delgado y circulación linfática.", type: 'thoracic' },
    { name: "Primera Lumbar (L1)", code: "L1", x: 3, y: 44, z: 3, desc: "Inerva el intestino grueso e ingle. Controla la estabilidad de la pared abdominal alta.", type: 'lumbar' },
    { name: "Segunda Lumbar (L2)", code: "L2", x: 5, y: 56, z: 5, desc: "Asociada a la inervación del apéndice, abdomen bajo y porción superior del muslo anterior.", type: 'lumbar' },
    { name: "Tercera Lumbar (L3)", code: "L3", x: 6, y: 68, z: 6, desc: "Control funcional de la vejiga, órganos de reproducción e inervación de la articulación de la rodilla.", type: 'lumbar' },
    { name: "Cuarta Lumbar (L4)", code: "L4", x: 5, y: 80, z: 5, desc: "Origen clave de raíces del nervio ciático, controla la musculatura lumbar y glútea baja.", type: 'lumbar' },
    { name: "Quinta Lumbar (L5)", code: "L5", x: 2, y: 92, z: 2, desc: "Base crítica de sustentación. Inerva pantorrillas, tobillos, pies y la raíz dorsal del nervio ciático.", type: 'lumbar' },
    { name: "Sacra 1 (S1)", code: "S1", x: -1, y: 104, z: -1, desc: "Primer segmento del sacro. Inerva los glúteos, la cadera y la porción posterior del muslo.", type: 'sacrum' },
    { name: "Sacra 2 (S2)", code: "S2", x: -3, y: 114, z: -3, desc: "Segundo segmento sacral fusionado. Brinda estabilidad pélvica e inerva la articulación femorotibial.", type: 'sacrum' },
    { name: "Sacra 3 (S3)", code: "S3", x: -4, y: 122, z: -4, desc: "Centro nervioso autónomo para órganos de la cavidad pélvica y el sostén del suelo pélvico.", type: 'sacrum' },
    { name: "Sacra 4 (S4)", code: "S4", x: -4, y: 130, z: -4, desc: "Inervación de los esfínteres pélvicos, canal anal y estabilidad sacrocoxígea profunda.", type: 'sacrum' },
    { name: "Sacra 5 (S5)", code: "S5", x: -3, y: 137, z: -3, desc: "Último segmento sacral. Participa en la inervación del esfínter anal y piso pélvico profundo.", type: 'sacrum' },
    { name: "Primera Coxígea (Co1)", code: "Co1", x: -2, y: 144, z: -2, desc: "Anclaje crucial de los ligamentos del suelo pélvico y muscles elevadores del ano.", type: 'sacrum' },
    { name: "Segunda Coxígea (Co2)", code: "Co2", x: -1, y: 150, z: -1, desc: "Soporte óseo para las estructuras pélvicas durante la posición de bipedestación activa.", type: 'sacrum' },
    { name: "Tercera Coxígea (Co3)", code: "Co3", x: 0, y: 155, z: 0, desc: "Punto terminal óseo de la columna vertebral. Amortigua la presión sobre la pelvis al sentarse.", type: 'sacrum' }
  ];

  // Projection logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight || 400;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main animation loops
    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 350; // Perspective depth field

      // Draw background cybernetic diagnostic grids
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Sine wave ambient scanline
      const scanY = (Date.now() / 15) % (canvas.height + 100) - 50;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.05)';
      ctx.fillRect(0, scanY - 5, canvas.width, 3);
      ctx.fillStyle = 'rgba(255, 153, 0, 0.03)';
      ctx.fillRect(0, scanY - 2, canvas.width, 1);

      // Pre-calculate rotations
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // 3D transform function
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Rotate around Y-axis
        let x = x3d * cosY - z3d * sinY;
        let z = x3d * sinY + z3d * cosY;

        // Rotate around X-axis
        let y = y3d * cosX - z * sinX;
        z = y3d * sinX + z * cosX;

        // Perspective division
        const scale = fov / (fov + z);
        const x2d = cx + x * scale;
        const y2d = cy + y * scale;

        return { x: x2d, y: y2d, scale, zDepth: z };
      };

      // Draw continuous Spinal Core (Medula espinal)
      ctx.beginPath();
      ctx.lineWidth = 3;
      const gradient = ctx.createLinearGradient(0, cy - 130, 0, cy + 130);
      gradient.addColorStop(0, '#A855F7'); // Cervical (purple)
      gradient.addColorStop(0.5, '#FDB931'); // Thoracic (gold/orange)
      gradient.addColorStop(1, '#A855F7'); // Lumbar
      ctx.strokeStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';

      vertebrae.forEach((vert, i) => {
        const pt = project(vert.x, vert.y, vert.z);
        if (i === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      });
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Draw horizontal ribs and transverse processes for clinical detail
      vertebrae.forEach((vert) => {
        const pt = project(vert.x, vert.y, vert.z);

        // Lateral nerve endings branching off left and right
        const leftNerveEnd = project(vert.x - 35, vert.y + 4, vert.z);
        const rightNerveEnd = project(vert.x + 35, vert.y + 4, vert.z);

        // Pulsing nerve flow
        const nervePulse = Math.sin(Date.now() / 200 + vert.y) * 4;
        const leftNerveOuter = project(vert.x - 55 - nervePulse, vert.y + 4, vert.z);
        const rightNerveOuter = project(vert.x + 55 + nervePulse, vert.y + 4, vert.z);

        // Draw Nerve connections
        ctx.strokeStyle = vert.type === 'cervical' || vert.type === 'lumbar' 
          ? 'rgba(168, 85, 247, 0.25)' 
          : 'rgba(255, 153, 0, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.quadraticCurveTo((pt.x + leftNerveEnd.x) / 2, (pt.y + leftNerveEnd.y) / 2 + 5, leftNerveEnd.x, leftNerveEnd.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.quadraticCurveTo((pt.x + rightNerveEnd.x) / 2, (pt.y + rightNerveEnd.y) / 2 + 5, rightNerveEnd.x, rightNerveEnd.y);
        ctx.stroke();

        // Draw fine flowing nerve endings
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)'; // teal nerve glow
        ctx.beginPath();
        ctx.moveTo(leftNerveEnd.x, leftNerveEnd.y);
        ctx.lineTo(leftNerveOuter.x, leftNerveOuter.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rightNerveEnd.x, rightNerveEnd.y);
        ctx.lineTo(rightNerveOuter.x, rightNerveOuter.y);
        ctx.stroke();

        // Draw nerve terminal nodes
        ctx.fillStyle = '#14b8a6';
        ctx.beginPath();
        ctx.arc(leftNerveOuter.x, leftNerveOuter.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(rightNerveOuter.x, rightNerveOuter.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw vertebral body disc structure (glowing rings)
        const discWidth = vert.type === 'lumbar' ? 32 : vert.type === 'thoracic' ? 24 : 18;
        const discHeight = 6;
        
        ctx.fillStyle = vert.type === 'cervical' 
          ? 'rgba(168, 85, 247, 0.15)' 
          : vert.type === 'thoracic' 
            ? 'rgba(255, 153, 0, 0.12)' 
            : 'rgba(168, 85, 247, 0.15)';
        ctx.strokeStyle = vert.type === 'cervical' || vert.type === 'lumbar'
          ? '#A855F7'
          : '#FF9900';
        ctx.lineWidth = 1.5;

        // Render disk ellipse
        ctx.beginPath();
        ctx.ellipse(pt.x, pt.y, discWidth * pt.scale, discHeight * pt.scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw vertebral spinous process (Back bone tip)
        const spinousTip = project(vert.x, vert.y, vert.z - 18);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(spinousTip.x, spinousTip.y);
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(spinousTip.x, spinousTip.y, 2 * pt.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render interactive nodes as glowing interactive circles
      vertebrae.forEach((vert) => {
        const pt = project(vert.x, vert.y, vert.z);
        
        // Draw main centrum node
        const nodeSize = 6 * pt.scale;
        const isHovered = hoveredNode && hoveredNode.code === vert.code;

        // Outer pulse circle
        if (isHovered) {
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
          ctx.beginPath();
          const pRadius = Math.sin(Date.now() / 150) * 8 + 12;
          ctx.arc(pt.x, pt.y, pRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Base node
        ctx.shadowBlur = isHovered ? 15 : 4;
        ctx.shadowColor = vert.type === 'cervical' || vert.type === 'lumbar' ? '#A855F7' : '#FF9900';
        
        ctx.fillStyle = isHovered 
          ? '#ffffff' 
          : vert.type === 'cervical' || vert.type === 'lumbar' 
            ? '#A855F7' 
            : '#FF9900';
            
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset

        // Code label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(vert.code, pt.x + (nodeSize + 6), pt.y + 3);
      });

      // Technical circular HUD in the corner
      ctx.strokeStyle = 'rgba(255, 153, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(45, 45, 30, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.beginPath();
      ctx.arc(45, 45, 30, -Math.PI / 2, (Date.now() / 1000) % (Math.PI * 2) - Math.PI / 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '8px monospace';
      ctx.fillText("HOLO_V3", 26, 48);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [rotX, rotY, hoveredNode]);

  // Handle Drag & Spin interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { x: rotX, y: rotY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      // Map vertical drag to rotX, horizontal drag to rotY
      setRotX(rotationStart.current.x + dy * 0.007);
      setRotY(rotationStart.current.y - dx * 0.007);
    } else {
      // Direct node hovering check
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 350;
      
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      let found: VertebraNode | null = null;
      let minDistance = 24; // Threshold in pixels

      vertebrae.forEach((vert) => {
        // Run identical rotated projection to check overlap
        let x = vert.x * cosY - vert.z * sinY;
        let z = vert.x * sinY + vert.z * cosY;
        let y = vert.y * cosX - z * sinX;
        z = vert.y * sinX + z * cosX;

        const scale = fov / (fov + z);
        const x2d = cx + x * scale;
        const y2d = cy + y * scale;

        const dist = Math.hypot(mx - x2d, my - y2d);
        if (dist < minDistance) {
          minDistance = dist;
          found = vert;
        }
      });

      setHoveredNode(found);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Passive auto-rotation when not interacting
  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setRotY((prev) => prev + 0.004);
    }, 30);

    return () => clearInterval(timer);
  }, [isDragging]);

  return (
    <div className="relative w-full h-[400px] rounded-2xl bg-black/40 border border-white/5 overflow-hidden p-1">
      {/* 3D Render Area */}
      <div 
        ref={containerRef} 
        className="relative w-full h-full bg-black/70 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) {
            dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            rotationStart.current = { x: rotX, y: rotY };
          }
        }}
        onTouchMove={(e) => {
          if (isDragging && e.touches[0]) {
            const dx = e.touches[0].clientX - dragStart.current.x;
            const dy = e.touches[0].clientY - dragStart.current.y;
            setRotX(rotationStart.current.x + dy * 0.01);
            setRotY(rotationStart.current.y - dx * 0.01);
          }
        }}
        onTouchEnd={handleMouseUp}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        {/* Helper overlay instructions */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none text-white/40 text-[9px] font-mono tracking-wider uppercase select-none">
          <Activity className="w-3.5 h-3.5 text-atlas-orange animate-pulse" />
          <span>Arrastre para rotar modelo 3D</span>
        </div>

        <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-black/50 border border-white/5 px-2.5 py-1 rounded-md text-[9px] font-mono tracking-wider text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>SISTEMA DE DIAGNÓSTICO EN VIVO</span>
        </div>

        {/* Hovered Spine Node Micro-HUD Overlay */}
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute top-3 right-3 max-w-[280px] bg-zinc-950/90 backdrop-blur-md border border-atlas-violet/40 p-3.5 rounded-xl shadow-[0_10px_30px_rgba(168,85,247,0.25)] pointer-events-none space-y-1.5 text-left border-glow-violet"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1.5">
              <span className="text-[9px] font-black text-atlas-violet uppercase tracking-widest bg-atlas-violet/15 px-1.5 py-0.5 rounded">
                VÉRTEBRA: {hoveredNode.code}
              </span>
              <span className="text-[8px] font-mono text-zinc-500 uppercase">ZONA: {hoveredNode.type}</span>
            </div>
            <h4 className="text-[12px] font-extrabold text-white leading-tight uppercase">
              {hoveredNode.name}
            </h4>
            <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
              {hoveredNode.desc}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
