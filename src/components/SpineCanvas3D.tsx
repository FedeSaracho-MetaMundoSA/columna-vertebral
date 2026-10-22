import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sliders, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck, 
  Info, 
  Layers, 
  Eye, 
  ChevronUp, 
  ChevronDown,
  Activity,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface SpineCanvas3DProps {
  interactive?: boolean;
  initialFocus?: 'full' | 'cervical' | 'thoracic' | 'lumbar';
  heightClass?: string;
  onSelectVertebra?: (name: string, description: string) => void;
  showDockControls?: boolean;
}

interface VertebraInfo {
  id: string;
  name: string;
  region: 'cervical' | 'thoracic' | 'lumbar' | 'sacrum';
  yPos: number;
  description: string;
  symptoms: string;
  treatment: string;
  isHerniaZone?: boolean;
  isAtlas?: boolean;
}

const VERTEBRAE_DATA: VertebraInfo[] = [
  {
    id: 'c1',
    name: 'Atlas (C1) - 1ª Cervical',
    region: 'cervical',
    yPos: 6.2,
    isAtlas: true,
    description: 'La vértebra más importante de la biomecánica. Sostiene los 5 kg del cráneo y rodea el tronco encefálico.',
    symptoms: 'Migrañas, mareos, vértigos, dolor de nuca, desbalance postural de hombros y caderas.',
    treatment: 'Alineación Atlas no invasiva del Lic. Villalba. Sin rotaciones forzadas.'
  },
  {
    id: 'c2',
    name: 'Axis (C2) - 2ª Cervical',
    region: 'cervical',
    yPos: 5.6,
    description: 'Posee la apófisis odontoides sobre la que pivota el Atlas, permitiendo el 50% de la rotación de la cabeza.',
    symptoms: 'Rigidez cervical aguda, dolor retroocular, contracturas occipitales.',
    treatment: 'Desbloqueo de carillas articulares C1-C2 para restaurar la rotación sin dolor.'
  },
  {
    id: 'c5',
    name: 'Cervical Media (C4-C6)',
    region: 'cervical',
    yPos: 4.4,
    description: 'Vértice de la lordosis cervical. Gran susceptibilidad a latigazos (whiplash) y rectificación por pantallas.',
    symptoms: 'Hormigueo y adormecimiento en brazos, codos y manos (cervicobraquialgia).',
    treatment: 'Descompresión foraminal para liberar raíces nerviosas hacia los miembros superiores.'
  },
  {
    id: 't6',
    name: 'Dorsal Media (T6-T8)',
    region: 'thoracic',
    yPos: 1.5,
    description: 'Segmento torácico conectado a la caja torácica. Zona de mayor rigidez por estrés y postura encorvada.',
    symptoms: 'Puntadas entre los omóplatos, dificultad para respirar hondo, pesadez dorsal.',
    treatment: 'Ajuste dorsal para apertura torácica y expansión de la caja costal.'
  },
  {
    id: 'l4',
    name: 'Lumbar L4 - Zona de Hernia',
    region: 'lumbar',
    yPos: -2.8,
    isHerniaZone: true,
    description: 'Soporta el máximo peso del torso. El disco L4-L5 es el más propenso a protusiones y hernias discales.',
    symptoms: 'Lumbago agudo que traba la cintura, dolor punzante al sentarse o agacharse.',
    treatment: 'Descompresión axial suave para generar presión intradiscal negativa y reabsorber la hernia.'
  },
  {
    id: 'l5',
    name: 'Lumbar L5 - Raíz Ciática',
    region: 'lumbar',
    yPos: -3.6,
    isHerniaZone: true,
    description: 'Punto de partida del nervio ciático hacia glúteos y piernas. Paso crítico hacia el sacro.',
    symptoms: 'Dolor fulgurante que baja por el glúteo hasta la pantorrilla y el pie (Ciática severa).',
    treatment: 'Liberación de la raíz nerviosa L5-S1 sin cirugía ni inyecciones de corticoides.'
  },
  {
    id: 'sacro',
    name: 'Sacro e Ilíacos (Pelvis)',
    region: 'sacrum',
    yPos: -5.0,
    description: 'La base fundamental de soporte donde descansa la columna entera.',
    symptoms: 'Sacroileítis, dolor al caminar, dismetría pélvica ("pierna más corta").',
    treatment: 'Nivelación pélvica para restaurar el eje horizontal de carga.'
  }
];

export default function SpineCanvas3D({
  interactive = true,
  initialFocus = 'full',
  heightClass = 'h-[500px] sm:h-[620px] lg:h-[700px]',
  onSelectVertebra,
  showDockControls = true
}: SpineCanvas3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI Interactive States
  const [selectedVertebra, setSelectedVertebra] = useState<VertebraInfo>(VERTEBRAE_DATA[0]);
  const [decompressionValue, setDecompressionValue] = useState<number>(0); // 0 = compressed, 100 = full decompression
  const [isAtlasSubluxated, setIsAtlasSubluxated] = useState<boolean>(false);
  const [activeRegion, setActiveRegion] = useState<'full' | 'cervical' | 'thoracic' | 'lumbar'>(initialFocus);
  const [showNerves, setShowNerves] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isSimulatingDecomp, setIsSimulatingDecomp] = useState<boolean>(false);

  // Three.js internal references stored in ref to prevent teardown
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spineGroupRef = useRef<THREE.Group | null>(null);
  const atlasMeshRef = useRef<THREE.Group | null>(null);
  const herniaMeshRef = useRef<THREE.Mesh | null>(null);
  const nervesGroupRef = useRef<THREE.Group | null>(null);
  const discsRef = useRef<THREE.Mesh[]>([]);
  const vertebraMeshesRef = useRef<{ id: string; mesh: THREE.Object3D }[]>([]);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0);
  const targetCameraYRef = useRef(0);
  const targetCameraZRef = useRef(14);

  // Handle region focus transitions
  const handleFocusRegion = useCallback((region: 'full' | 'cervical' | 'thoracic' | 'lumbar') => {
    setActiveRegion(region);
    setAutoRotate(false);

    if (region === 'cervical') {
      targetCameraYRef.current = 5.6;
      targetCameraZRef.current = 8.5;
      setSelectedVertebra(VERTEBRAE_DATA[0]);
    } else if (region === 'thoracic') {
      targetCameraYRef.current = 1.2;
      targetCameraZRef.current = 10.0;
      setSelectedVertebra(VERTEBRAE_DATA[3]);
    } else if (region === 'lumbar') {
      targetCameraYRef.current = -3.2;
      targetCameraZRef.current = 8.0;
      setSelectedVertebra(VERTEBRAE_DATA[4]);
    } else {
      targetCameraYRef.current = 0.5;
      targetCameraZRef.current = 14.5;
      setSelectedVertebra(VERTEBRAE_DATA[0]);
    }
  }, []);

  // Toggle Decompression simulation
  const toggleDecompression = () => {
    if (isSimulatingDecomp) {
      setDecompressionValue(0);
      setIsSimulatingDecomp(false);
    } else {
      setIsSimulatingDecomp(true);
      let step = 0;
      const interval = setInterval(() => {
        step += 4;
        setDecompressionValue(Math.min(100, step));
        if (step >= 100) clearInterval(interval);
      }, 20);
    }
  };

  // Three.js Mount Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software rendering guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 14.5);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0f2b48, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x020617, 1.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 3.0);
    rimLight.position.set(-6, -2, -6);
    scene.add(rimLight);

    const spineGroup = new THREE.Group();
    scene.add(spineGroup);
    spineGroupRef.current = spineGroup;

    // Materials Palette
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.28,
      metalness: 0.15,
    });

    const atlasSpecialMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.5,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45
    });

    const discMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.4,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85
    });

    const herniaMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.2
    });

    const nervesGroup = new THREE.Group();
    spineGroup.add(nervesGroup);
    nervesGroupRef.current = nervesGroup;

    // 5. Construct Procedural Anatomical Spine
    // 24 Vertebrae (7 Cervical, 12 Thoracic, 5 Lumbar) + Sacrum
    const vertebraeConfigs = [
      // Cervical (C1 - C7)
      { id: 'c1', label: 'C1 Atlas', y: 6.2, scale: 0.72, isAtlas: true },
      { id: 'c2', label: 'C2 Axis', y: 5.6, scale: 0.76, isAxis: true },
      { id: 'c3', label: 'C3', y: 5.1, scale: 0.78 },
      { id: 'c4', label: 'C4', y: 4.6, scale: 0.80 },
      { id: 'c5', label: 'C5', y: 4.1, scale: 0.83 },
      { id: 'c6', label: 'C6', y: 3.6, scale: 0.86 },
      { id: 'c7', label: 'C7', y: 3.1, scale: 0.90 },
      // Thoracic (T1 - T12)
      { id: 't1', label: 'T1', y: 2.55, scale: 0.92 },
      { id: 't2', label: 'T2', y: 2.05, scale: 0.94 },
      { id: 't3', label: 'T3', y: 1.55, scale: 0.96 },
      { id: 't4', label: 'T4', y: 1.05, scale: 0.98 },
      { id: 't5', label: 'T5', y: 0.55, scale: 1.00 },
      { id: 't6', label: 'T6', y: 0.05, scale: 1.02 },
      { id: 't7', label: 'T7', y: -0.45, scale: 1.05 },
      { id: 't8', label: 'T8', y: -0.95, scale: 1.08 },
      { id: 't9', label: 'T9', y: -1.45, scale: 1.10 },
      { id: 't10', label: 'T10', y: -1.95, scale: 1.12 },
      { id: 't11', label: 'T11', y: -2.45, scale: 1.15 },
      { id: 't12', label: 'T12', y: -2.95, scale: 1.18 },
      // Lumbar (L1 - L5)
      { id: 'l1', label: 'L1', y: -3.5, scale: 1.22 },
      { id: 'l2', label: 'L2', y: -4.1, scale: 1.26 },
      { id: 'l3', label: 'L3', y: -4.7, scale: 1.30 },
      { id: 'l4', label: 'L4', y: -5.3, scale: 1.34, isHernia: true },
      { id: 'l5', label: 'L5', y: -5.9, scale: 1.38, isHerniaBase: true },
    ];

    const storedDiscs: THREE.Mesh[] = [];
    const storedVertebrae: { id: string; mesh: THREE.Object3D }[] = [];

    // Central spinal cord tube
    const cordCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, 6.8, -0.1),
      new THREE.Vector3(0, -6.5, -0.2)
    );
    const cordGeo = new THREE.TubeGeometry(cordCurve, 40, 0.16, 12, false);
    const cordMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.2
    });
    const spinalCord = new THREE.Mesh(cordGeo, cordMat);
    spineGroup.add(spinalCord);

    vertebraeConfigs.forEach((cfg, idx) => {
      const vGroup = new THREE.Group();
      vGroup.position.y = cfg.y;

      // Natural spinal sagittal curvature (Cervical Lordosis, Thoracic Kyphosis, Lumbar Lordosis)
      let zOffset = 0;
      if (cfg.y > 3.0) {
        // Cervical lordosis (curves forward)
        zOffset = Math.sin((cfg.y - 3.0) / 3.5 * Math.PI) * 0.35;
      } else if (cfg.y > -3.0) {
        // Thoracic kyphosis (curves backward)
        zOffset = -Math.sin((cfg.y - -3.0) / 6.0 * Math.PI) * 0.45;
      } else {
        // Lumbar lordosis (curves forward again)
        zOffset = Math.sin((cfg.y - -6.0) / 3.0 * Math.PI) * 0.4;
      }
      vGroup.position.z = zOffset;

      const matToUse = cfg.isAtlas ? atlasSpecialMaterial : boneMaterial;

      if (cfg.isAtlas) {
        // C1 ATLAS: Specialized Ring Anatomy with large lateral masses
        const ringGeo = new THREE.TorusGeometry(0.75 * cfg.scale, 0.22 * cfg.scale, 16, 32);
        const ringMesh = new THREE.Mesh(ringGeo, matToUse);
        ringMesh.rotation.x = Math.PI / 2;
        vGroup.add(ringMesh);

        // Lateral masses (left & right)
        const latGeo = new THREE.CylinderGeometry(0.24 * cfg.scale, 0.24 * cfg.scale, 0.3 * cfg.scale, 16);
        const latLeft = new THREE.Mesh(latGeo, matToUse);
        latLeft.position.set(-0.75 * cfg.scale, 0, 0);
        const latRight = new THREE.Mesh(latGeo, matToUse);
        latRight.position.set(0.75 * cfg.scale, 0, 0);
        vGroup.add(latLeft, latRight);

        // Transverse processes
        const transGeo = new THREE.ConeGeometry(0.18 * cfg.scale, 0.5 * cfg.scale, 12);
        const transL = new THREE.Mesh(transGeo, matToUse);
        transL.rotation.z = Math.PI / 2;
        transL.position.set(-1.1 * cfg.scale, 0, 0);
        const transR = new THREE.Mesh(transGeo, matToUse);
        transR.rotation.z = -Math.PI / 2;
        transR.position.set(1.1 * cfg.scale, 0, 0);
        vGroup.add(transL, transR);

        atlasMeshRef.current = vGroup;
      } else if (cfg.isAxis) {
        // C2 AXIS: Vertebral body + prominent odontoid process (dens) projecting up
        const bodyGeo = new THREE.CylinderGeometry(0.6 * cfg.scale, 0.65 * cfg.scale, 0.32 * cfg.scale, 18);
        const bodyMesh = new THREE.Mesh(bodyGeo, matToUse);
        vGroup.add(bodyMesh);

        // Dens / Odontoid process
        const densGeo = new THREE.CylinderGeometry(0.18 * cfg.scale, 0.22 * cfg.scale, 0.5 * cfg.scale, 16);
        const densMesh = new THREE.Mesh(densGeo, matToUse);
        densMesh.position.set(0, 0.32 * cfg.scale, 0.15 * cfg.scale);
        vGroup.add(densMesh);

        // Spinous process bifid
        const spinGeo = new THREE.BoxGeometry(0.25 * cfg.scale, 0.2 * cfg.scale, 0.6 * cfg.scale);
        const spinMesh = new THREE.Mesh(spinGeo, matToUse);
        spinMesh.position.set(0, -0.05, -0.55 * cfg.scale);
        vGroup.add(spinMesh);
      } else {
        // Standard Vertebra composite structure:
        // 1. Anterior vertebral body (kidney/oval shape)
        const bodyGeo = new THREE.CylinderGeometry(0.65 * cfg.scale, 0.7 * cfg.scale, 0.36 * cfg.scale, 20);
        bodyGeo.scale(1.1, 1.0, 0.85);
        const bodyMesh = new THREE.Mesh(bodyGeo, matToUse);
        vGroup.add(bodyMesh);

        // 2. Posterior Arch & Pedicles
        const archGeo = new THREE.TorusGeometry(0.45 * cfg.scale, 0.12 * cfg.scale, 12, 16, Math.PI);
        const archMesh = new THREE.Mesh(archGeo, matToUse);
        archMesh.rotation.x = Math.PI / 2;
        archMesh.position.set(0, 0, -0.35 * cfg.scale);
        vGroup.add(archMesh);

        // 3. Spinous process pointing back & down
        const spinousLength = cfg.y > -2.0 ? 0.75 * cfg.scale : 0.6 * cfg.scale;
        const spinGeo = new THREE.ConeGeometry(0.16 * cfg.scale, spinousLength, 12);
        const spinMesh = new THREE.Mesh(spinGeo, matToUse);
        spinMesh.rotation.x = -Math.PI / 2.3;
        spinMesh.position.set(0, -0.08 * cfg.scale, -0.75 * cfg.scale);
        vGroup.add(spinMesh);

        // 4. Transverse processes (bilateral)
        const transGeo = new THREE.CylinderGeometry(0.1 * cfg.scale, 0.14 * cfg.scale, 0.7 * cfg.scale, 12);
        const transL = new THREE.Mesh(transGeo, matToUse);
        transL.rotation.z = Math.PI / 2.3;
        transL.position.set(-0.85 * cfg.scale, 0.05, -0.2 * cfg.scale);

        const transR = new THREE.Mesh(transGeo, matToUse);
        transR.rotation.z = -Math.PI / 2.3;
        transR.position.set(0.85 * cfg.scale, 0.05, -0.2 * cfg.scale);
        vGroup.add(transL, transR);
      }

      // Add Intervertebral Disc below each vertebra (except lowest lumbar which connects to sacrum)
      if (idx < vertebraeConfigs.length - 1) {
        const discGeo = new THREE.CylinderGeometry(0.62 * cfg.scale, 0.66 * cfg.scale, 0.14, 20);
        discGeo.scale(1.08, 1.0, 0.82);

        // If this is L4-L5, attach the Herniation pathology bulge!
        let currentDiscMat = discMaterial;
        if (cfg.isHernia) {
          currentDiscMat = discMaterial.clone();
        }

        const discMesh = new THREE.Mesh(discGeo, currentDiscMat);
        discMesh.position.set(0, cfg.y - 0.24, zOffset);
        spineGroup.add(discMesh);
        storedDiscs.push(discMesh);

        if (cfg.isHernia) {
          // Posterolateral herniated disc protrusion pressing against nerve root
          const herniaBulgeGeo = new THREE.SphereGeometry(0.24, 16, 16);
          herniaBulgeGeo.scale(1.4, 0.9, 1.2);
          const herniaMesh = new THREE.Mesh(herniaBulgeGeo, herniaMaterial);
          herniaMesh.position.set(0.55 * cfg.scale, 0, -0.45 * cfg.scale);
          discMesh.add(herniaMesh);
          herniaMeshRef.current = herniaMesh;
        }
      }

      // Bilateral Nerve Roots branching out
      const nerveGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.85 * cfg.scale, 8);
      const isHerniatedLevel = cfg.isHernia;

      const nerveMat = new THREE.MeshStandardMaterial({
        color: isHerniatedLevel ? 0xef4444 : 0x38bdf8,
        emissive: isHerniatedLevel ? 0xb91c1c : 0x0369a1,
        emissiveIntensity: isHerniatedLevel ? 0.9 : 0.4
      });

      const nerveL = new THREE.Mesh(nerveGeo, nerveMat);
      nerveL.rotation.z = Math.PI / 2.4;
      nerveL.position.set(-0.75 * cfg.scale, 0, -0.15 * cfg.scale);

      const nerveR = new THREE.Mesh(nerveGeo, nerveMat);
      nerveR.rotation.z = -Math.PI / 2.4;
      nerveR.position.set(0.75 * cfg.scale, 0, -0.15 * cfg.scale);

      vGroup.add(nerveL, nerveR);

      spineGroup.add(vGroup);
      storedVertebrae.push({ id: cfg.id, mesh: vGroup });
    });

    // 6. Sacrum & Pelvic Base Structure
    const sacrumGeo = new THREE.ConeGeometry(1.3, 2.0, 16);
    sacrumGeo.scale(1.2, 1.0, 0.65);
    const sacrumMesh = new THREE.Mesh(sacrumGeo, boneMaterial);
    sacrumMesh.rotation.x = Math.PI;
    sacrumMesh.position.set(0, -7.2, 0.2);
    spineGroup.add(sacrumMesh);
    storedVertebrae.push({ id: 'sacro', mesh: sacrumMesh });

    discsRef.current = storedDiscs;
    vertebraMeshesRef.current = storedVertebrae;

    // Contact shadow plane underneath
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -8.5;
    scene.add(shadowPlane);

    // Initial positioning
    spineGroup.position.y = 0.5;

    // Pointer / Touch Interactions
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPositionRef.current = { x: clientX, y: clientY };
      setAutoRotate(false);
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointerPositionRef.current.x;
      const deltaY = clientY - previousPointerPositionRef.current.y;

      targetRotationYRef.current += deltaX * 0.008;
      targetRotationXRef.current = Math.max(-0.4, Math.min(0.4, targetRotationXRef.current + deltaY * 0.006));

      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElem.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Render Loop with Exponential Damping
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto rotation when idle
      if (autoRotate && spineGroupRef.current) {
        targetRotationYRef.current += delta * 0.35;
      }

      // Smooth damping interpolation
      if (spineGroupRef.current) {
        spineGroupRef.current.rotation.y = THREE.MathUtils.damp(
          spineGroupRef.current.rotation.y,
          targetRotationYRef.current,
          10,
          delta
        );
        spineGroupRef.current.rotation.x = THREE.MathUtils.damp(
          spineGroupRef.current.rotation.x,
          targetRotationXRef.current,
          10,
          delta
        );
      }

      // Smooth camera transition to target region
      if (cameraRef.current) {
        cameraRef.current.position.y = THREE.MathUtils.damp(
          cameraRef.current.position.y,
          targetCameraYRef.current,
          5,
          delta
        );
        cameraRef.current.position.z = THREE.MathUtils.damp(
          cameraRef.current.position.z,
          targetCameraZRef.current,
          5,
          delta
        );
        cameraRef.current.lookAt(0, targetCameraYRef.current, 0);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElem.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
    };
  }, []);

  // Update decompression simulation dynamically (expands disc height & turns herniation green)
  useEffect(() => {
    const factor = decompressionValue / 100; // 0 to 1

    // Scale discs along Y (representing decompression expansion from 1.0 to 1.8x height)
    discsRef.current.forEach((disc) => {
      disc.scale.y = 1.0 + factor * 0.75;
    });

    // Shrink hernia protrusion and change color to healthy
    if (herniaMeshRef.current) {
      // Hernia contracts back into intervertebral space
      const herniaScale = Math.max(0.15, 1.0 - factor * 0.85);
      herniaMeshRef.current.scale.set(herniaScale * 1.4, herniaScale * 0.9, herniaScale * 1.2);

      const mat = herniaMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        // Interpolate color from Red (inflamed compression) to Emerald Cyan (decompressed relief)
        const targetColor = factor > 0.6 ? new THREE.Color(0x10b981) : new THREE.Color(0xef4444);
        mat.color.lerp(targetColor, 0.2);
        mat.emissive.lerp(factor > 0.6 ? new THREE.Color(0x059669) : new THREE.Color(0xb91c1c), 0.2);
      }
    }
  }, [decompressionValue]);

  // Update Atlas Subluxation tilt
  useEffect(() => {
    if (atlasMeshRef.current) {
      if (isAtlasSubluxated) {
        // Tilted off-axis by 8 degrees lateral and 5 degrees rotation
        atlasMeshRef.current.rotation.z = 0.14;
        atlasMeshRef.current.rotation.y = 0.12;
      } else {
        // True orthogonal alignment
        atlasMeshRef.current.rotation.z = 0;
        atlasMeshRef.current.rotation.y = 0;
      }
    }
  }, [isAtlasSubluxated]);

  // Update nerve visibility
  useEffect(() => {
    if (nervesGroupRef.current) {
      nervesGroupRef.current.visible = showNerves;
    }
  }, [showNerves]);

  const selectVertebra = (v: VertebraInfo) => {
    setSelectedVertebra(v);
    if (onSelectVertebra) {
      onSelectVertebra(v.name, v.description);
    }
    // Pan camera to that vertebra
    targetCameraYRef.current = v.yPos;
    targetCameraZRef.current = v.region === 'cervical' ? 8.5 : v.region === 'lumbar' ? 8.5 : 10;
    setAutoRotate(false);
  };

  return (
    <div className={`relative w-full ${heightClass} select-none overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-800/40 shadow-2xl`}>
      
      {/* Three.js Isolated Canvas Mount */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Top Header: Anatomical Status & Controls */}
      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-600/40 text-cyan-300 shadow-lg text-xs font-semibold">
          <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="hidden sm:inline">Simulador Biomecánico:</span>
          <span className="text-white font-bold">{selectedVertebra.name}</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              autoRotate ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title="Rotación Automática 360°"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              targetCameraZRef.current = Math.max(6, targetCameraZRef.current - 1.5);
              setAutoRotate(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Acercar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              targetCameraZRef.current = Math.min(18, targetCameraZRef.current + 1.5);
              setAutoRotate(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Alejar Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleFocusRegion('full')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Restablecer Vista Completa"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Anatomical Info Card (Top Right / Center on mobile) */}
      <div className="absolute top-14 left-3 right-3 sm:left-auto sm:right-4 sm:w-80 pointer-events-none z-10">
        <div className="pointer-events-auto rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3.5 shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[10px]">
              Diagnóstico Biomecánico
            </span>
            {selectedVertebra.isAtlas ? (
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-bold">
                MÉTODO ATLAS
              </span>
            ) : selectedVertebra.isHerniaZone ? (
              <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-bold">
                ZONA HERNIA L4-L5
              </span>
            ) : null}
          </div>

          <p className="text-slate-300 leading-snug">
            {selectedVertebra.description}
          </p>

          <div className="pt-1 space-y-1">
            <div className="text-[11px] text-slate-400">
              <strong className="text-rose-400">Síntomas habituales:</strong> {selectedVertebra.symptoms}
            </div>
            <div className="text-[11px] text-slate-400">
              <strong className="text-cyan-400">Tratamiento Lic. Villalba:</strong> {selectedVertebra.treatment}
            </div>
          </div>
        </div>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Following Three.js guidelines: zero viewport occlusion) */}
      {showDockControls && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full max-w-3xl px-3 pointer-events-none z-20">
          <div className="pointer-events-auto rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-800/40 shadow-2xl p-3 sm:p-4 transition-all duration-300">
            
            {/* Collapse / Expand Toggle Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2.5">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-bold text-white tracking-wide">
                  Panel de Descompresión & Segmentos
                </span>
              </div>
              <button
                onClick={() => setIsDockCollapsed(!isDockCollapsed)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{isDockCollapsed ? 'Expandir' : 'Minimizar'}</span>
                {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {!isDockCollapsed && (
              <div className="space-y-3">
                {/* 1. Region Selector Pills */}
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => handleFocusRegion('cervical')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeRegion === 'cervical'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Atlas / Cervical
                  </button>

                  <button
                    onClick={() => handleFocusRegion('thoracic')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeRegion === 'thoracic'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Dorsal
                  </button>

                  <button
                    onClick={() => handleFocusRegion('lumbar')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeRegion === 'lumbar'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Lumbar L4-L5
                  </button>

                  <button
                    onClick={() => handleFocusRegion('full')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeRegion === 'full'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Columna Total
                  </button>
                </div>

                {/* 2. Interactive Biomechanical Simulations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  
                  {/* Simulation 1: Decompression Slider */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Descompresión Discal
                      </span>
                      <span className="text-[11px] font-bold text-cyan-400 font-mono">
                        {decompressionValue}% {decompressionValue >= 70 ? '· Alivio Óptimo' : '· Compresión'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={decompressionValue}
                        onChange={(e) => setDecompressionValue(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                      <button
                        onClick={toggleDecompression}
                        className="shrink-0 px-2.5 py-1 text-[11px] font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors cursor-pointer"
                      >
                        {decompressionValue > 0 ? 'Reset' : 'Simular'}
                      </button>
                    </div>
                  </div>

                  {/* Simulation 2: Atlas Alignment Snap */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-white block">
                        Alineación Vértebra Atlas C1
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {isAtlasSubluxated ? '⚠️ Subluxada (Desviada)' : '✓ Alineada Ortogonal'}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsAtlasSubluxated(!isAtlasSubluxated)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isAtlasSubluxated
                          ? 'bg-rose-500 hover:bg-rose-400 text-white animate-pulse'
                          : 'bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60'
                      }`}
                    >
                      {isAtlasSubluxated ? 'Alinear Ahora' : 'Desalinear C1'}
                    </button>
                  </div>

                </div>

                {/* 3. Quick Anatomy Tags Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-[11px]">
                  <span className="text-slate-400 shrink-0 font-medium mr-1">Tocar para inspeccionar:</span>
                  {VERTEBRAE_DATA.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => selectVertebra(v)}
                      className={`px-2.5 py-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                        selectedVertebra.id === v.id
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {v.name.split(' - ')[0]}
                    </button>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* Touch drag indicator for mobile */}
      <div className="absolute bottom-20 sm:bottom-28 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] text-slate-400 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
        <span>Arastrá con el dedo para girar en 360°</span>
      </div>

    </div>
  );
}
