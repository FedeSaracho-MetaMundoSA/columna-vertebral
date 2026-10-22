import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Tv, 
  ChevronRight, 
  ChevronLeft, 
  Settings, 
  Info, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink, 
  Calendar, 
  Youtube,
  Trash2,
  Plus,
  X,
  Link as LinkIcon,
  HelpCircle,
  Video
} from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

// Highly reliable, public chiropractic & spine health YouTube video IDs as beautiful default presets
const DEFAULT_VIDEOS: YouTubeVideo[] = [
  {
    id: 'G5EDsdT9RLc',
    title: 'Quiropraxia de Alta Precisión y Descompresión Vertebral',
    description: 'Demostración profesional del Lic. Juan Antonio Villalba aplicando el Método Atlas para alineación y descompresión de la columna vertebral.',
    thumbnail: 'https://img.youtube.com/vi/G5EDsdT9RLc/hqdefault.jpg',
    publishedAt: '2026-03-15T12:00:00Z'
  },
  {
    id: '_7z0Zc8XpIo',
    title: 'Yoga para el Dolor de Espalda y Alivio Lumbar',
    description: 'Rutina guiada de 20 minutos de yoga suave y estiramientos terapéuticos para relajar la columna, abrir caderas y aliviar tensiones musculares.',
    thumbnail: 'https://img.youtube.com/vi/_7z0Zc8XpIo/hqdefault.jpg',
    publishedAt: '2026-04-10T15:30:00Z'
  },
  {
    id: 'G5EDsdT9RLc',
    title: 'Higiene Postural y Ergonomía del Método Atlas',
    description: 'Guía práctica para mantener la correcta alineación y curvatura natural de la columna durante las actividades cotidianas del día a día.',
    thumbnail: 'https://img.youtube.com/vi/G5EDsdT9RLc/hqdefault.jpg',
    publishedAt: '2026-05-02T18:45:00Z'
  }
];

export default function LiveInterviews() {
  const [videos, setVideos] = useState<YouTubeVideo[]>(DEFAULT_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Configuration State
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [apiKey, setApiKey] = useState('');
  const [channelId, setChannelId] = useState('');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUsingCustom, setIsUsingCustom] = useState(false);

  // Manual input form states
  const [manualUrl, setManualUrl] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualDesc, setManualDesc] = useState('');
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');

  // Load configuration from localStorage or env on mount
  useEffect(() => {
    const metaEnv = (import.meta as any).env || {};
    const savedMode = localStorage.getItem('atlas_yt_mode') as 'auto' | 'manual' || 'auto';
    setMode(savedMode);
    setActiveTab(savedMode);

    const savedKey = localStorage.getItem('atlas_yt_api_key') || metaEnv.VITE_YOUTUBE_API_KEY || '';
    const savedChannel = localStorage.getItem('atlas_yt_channel_id') || metaEnv.VITE_YOUTUBE_CHANNEL_ID || '';
    
    setApiKey(savedKey);
    setChannelId(savedChannel);

    const savedManual = localStorage.getItem('atlas_manual_videos');
    let parsedManual: YouTubeVideo[] = [];
    if (savedManual) {
      try {
        parsedManual = JSON.parse(savedManual);
      } catch (e) {
        console.error('Error parsing manual videos:', e);
      }
    }

    if (savedMode === 'manual') {
      if (parsedManual.length > 0) {
        setVideos(parsedManual);
        setIsUsingCustom(true);
      } else {
        setVideos(DEFAULT_VIDEOS);
      }
    } else {
      if (savedKey && savedChannel) {
        setIsUsingCustom(true);
        loadChannelVideos(savedKey, savedChannel);
      } else {
        setVideos(DEFAULT_VIDEOS);
      }
    }
  }, []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const loadChannelVideos = async (key: string, channel: string) => {
    setLoading(true);
    setError(null);
    try {
      let playlistId = channel.trim();
      // Standard YouTube logic: Channel ID 'UCxxxxxxxxxxxxxxxxxxxxxxx' maps to upload playlist 'UUxxxxxxxxxxxxxxxxxxxxxxx'
      if (playlistId.startsWith('UC') && playlistId.length === 24) {
        playlistId = 'UU' + playlistId.substring(2);
      } else if (!playlistId.startsWith('UU')) {
        throw new Error('El ID de canal ingresado no es válido. Debe comenzar con "UC" (ej: UC1234567890abcdefghijklm).');
      }

      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${key.trim()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData?.error?.message || 'Error al conectar con la API de YouTube.';
        throw new Error(errMsg);
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        throw new Error('No se encontraron videos en este canal o la lista de reproducción de subidas está vacía.');
      }

      const fetchedVideos = data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description || '',
        thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`,
        publishedAt: item.snippet.publishedAt,
      }));

      setVideos(fetchedVideos);
      setActiveIndex(0);
      setIsUsingCustom(true);
      setMode('auto');
      localStorage.setItem('atlas_yt_mode', 'auto');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error desconocido al cargar videos.');
      // Keep default videos on error so site doesn't break
      setVideos(DEFAULT_VIDEOS);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAutoConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || !channelId.trim()) {
      setError('Por favor completa ambos campos.');
      return;
    }

    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Test-load first before saving
      await loadChannelVideos(apiKey, channelId);
      
      // If success, persist
      localStorage.setItem('atlas_yt_api_key', apiKey.trim());
      localStorage.setItem('atlas_yt_channel_id', channelId.trim());
      localStorage.setItem('atlas_yt_mode', 'auto');
      setMode('auto');
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsConfigOpen(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'No se pudieron recuperar los videos. Revisa las credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddManualVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim() || !manualTitle.trim()) {
      setError('Por favor completa el enlace y el título.');
      return;
    }

    const videoId = getYouTubeId(manualUrl);
    if (!videoId) {
      setError('Enlace de YouTube no válido. Ejemplos aceptados: https://www.youtube.com/watch?v=... o https://youtu.be/...');
      return;
    }

    const newVideo: YouTubeVideo = {
      id: videoId,
      title: manualTitle.trim(),
      description: manualDesc.trim() || 'Video de ATLAS Quiropraxia.',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: new Date().toISOString()
    };

    const savedManual = localStorage.getItem('atlas_manual_videos');
    let parsedManual: YouTubeVideo[] = [];
    if (savedManual) {
      try {
        parsedManual = JSON.parse(savedManual);
      } catch (e) {}
    }

    const updated = [newVideo, ...parsedManual];
    localStorage.setItem('atlas_manual_videos', JSON.stringify(updated));
    localStorage.setItem('atlas_yt_mode', 'manual');
    
    setVideos(updated);
    setMode('manual');
    setIsUsingCustom(true);
    setActiveIndex(0);

    // Clear form
    setManualUrl('');
    setManualTitle('');
    setManualDesc('');
    setError(null);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  };

  const handleDeleteManualVideo = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const savedManual = localStorage.getItem('atlas_manual_videos');
    let parsedManual: YouTubeVideo[] = [];
    if (savedManual) {
      try {
        parsedManual = JSON.parse(savedManual);
      } catch (e) {}
    }

    const updated = parsedManual.filter(v => v.id !== id);
    localStorage.setItem('atlas_manual_videos', JSON.stringify(updated));
    
    if (mode === 'manual') {
      const newList = updated.length > 0 ? updated : DEFAULT_VIDEOS;
      setVideos(newList);
      setActiveIndex(0);
      if (updated.length === 0) {
        setIsUsingCustom(false);
      }
    }
  };

  const handleResetConfig = () => {
    localStorage.removeItem('atlas_yt_api_key');
    localStorage.removeItem('atlas_yt_channel_id');
    localStorage.removeItem('atlas_manual_videos');
    localStorage.removeItem('atlas_yt_mode');
    setApiKey('');
    setChannelId('');
    setIsUsingCustom(false);
    setVideos(DEFAULT_VIDEOS);
    setActiveIndex(0);
    setError(null);
    setMode('auto');
    setActiveTab('auto');
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const activeVideo = videos[activeIndex];

  // Helper to format YouTube published date
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  // Safe manual list getter for UI list
  const getManualList = () => {
    const savedManual = localStorage.getItem('atlas_manual_videos');
    if (savedManual) {
      try {
        return JSON.parse(savedManual) as YouTubeVideo[];
      } catch (e) {}
    }
    return [];
  };

  return (
    <section className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 relative overflow-hidden bg-atlas-dark min-h-screen" id="medios">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-atlas-orange/5 blur-[120px] rounded-[100%] pointer-events-none" id="youtube-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-atlas-orange/30 bg-atlas-orange/10 text-atlas-gold text-[9.5px] sm:text-[10px] font-black uppercase tracking-[2.5px] sm:tracking-[3px] mb-4 sm:mb-6">
              <Tv className="w-3 h-3" />
              <span>Sincronización Inteligente de Videos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 tracking-tighter leading-tight text-white">
              Lic. Villalba en <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-atlas-gold to-atlas-orange">
                Canal de YouTube
              </span>
            </h2>
            <p className="text-atlas-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
              Educación postural, biomecánica vertebral y entrevistas en vivo sincronizadas con YouTube. Podés sincronizar tu canal o cargar enlaces directamente.
            </p>
          </motion.div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0">
            <div className="flex gap-2">
              <button 
                id="btn-prev-video"
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-atlas-orange/10 hover:border-atlas-orange/30 active:scale-95 transition-all text-white cursor-pointer"
                aria-label="Video anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                id="btn-next-video"
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-atlas-orange/10 hover:border-atlas-orange/30 active:scale-95 transition-all text-white cursor-pointer"
                aria-label="Video siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Status / Error Indicator */}
        {error && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-950/40 border border-red-500/30 rounded-2xl text-red-200 text-xs sm:text-sm font-medium" id="yt-error-banner">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-sm sm:text-base">Error en Sincronización Automática con YouTube</p>
                <p className="opacity-90 text-[11px] sm:text-xs font-mono mt-1 bg-black/30 p-2.5 sm:p-3 rounded-lg border border-red-500/10">
                  {error}
                </p>
              </div>
            </div>

            {/* Clear troubleshooting instructions for Google Cloud developer error */}
            <div className="border-t border-red-500/20 pt-3 sm:pt-4 mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs bg-black/20 p-3 sm:p-4 rounded-xl">
              <p className="font-bold text-atlas-gold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <HelpCircle className="w-4 h-4" /> ¿Por qué ocurre este error y cómo solucionarlo?
              </p>
              <ul className="list-decimal list-inside space-y-1.5 opacity-80 pl-1 leading-relaxed text-[11px] sm:text-xs">
                <li>
                  <strong className="text-white">Falta activar la API:</strong> En tu Consola de Google Cloud, debés ir a <strong className="text-white">APIs & Servicios &gt; Biblioteca</strong>, buscar <strong className="text-white">"YouTube Data API v3"</strong> y hacer clic en <strong className="text-white">"Habilitar"</strong>. Sin esto, Google rechaza tu clave API.
                </li>
                <li>
                  <strong className="text-white">Usa la Carga Manual Rápida:</strong> Si no querés lidiar con la consola de Google Cloud, hace clic en el botón de arriba <strong className="text-white">"Configurar Videos"</strong> y elegí la pestaña <strong className="text-white">"Carga Manual"</strong>. Podés pegar cualquier enlace de YouTube directamente gratis y sin credenciales.
                </li>
              </ul>
            </div>
          </div>
        )}

        {loading ? (
          <div className="w-full h-64 sm:h-96 rounded-2xl sm:rounded-[40px] border border-white/5 bg-black/40 flex flex-col items-center justify-center gap-3 sm:gap-4" id="yt-loading-spinner">
            <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-atlas-gold animate-spin" />
            <p className="text-white/60 text-xs sm:text-sm font-mono uppercase tracking-[2px]">Cargando videos del canal...</p>
          </div>
        ) : activeVideo ? (
          /* Main Cinema Theater Showcase */
          <div className="relative w-full rounded-2xl sm:rounded-[32px] md:rounded-[40px] overflow-hidden glass border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] aspect-video md:aspect-[21/9] bg-black group" id="main-video-player">
            <iframe
              key={activeVideo.id}
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Media Information overlay (bottom gradient) */}
            <div className="hidden sm:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 sm:p-6 md:p-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="max-w-4xl">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-600 text-white font-black text-[9px] uppercase tracking-wider mb-2">
                  <Youtube className="w-3 h-3 fill-current" /> YOUTUBE
                </span>
                <h3 className="text-white font-bold text-base sm:text-xl md:text-2xl tracking-tight mb-1 sm:mb-2 drop-shadow-md">
                  {activeVideo.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm line-clamp-2 max-w-2xl mb-2 sm:mb-3 font-medium">
                  {activeVideo.description || 'Sin descripción disponible.'}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-white/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-atlas-gold"/> {formatDate(activeVideo.publishedAt)}
                  </span>
                  <span>ATLAS QUIROPRAXIA</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Video title caption for mobile below the player */}
        {activeVideo && (
          <div className="sm:hidden mt-3 px-1 space-y-1">
            <h3 className="text-white font-bold text-sm tracking-tight leading-snug">
              {activeVideo.title}
            </h3>
            <p className="text-white/50 text-[11px] flex items-center gap-2">
              <span className="text-atlas-gold font-mono">{formatDate(activeVideo.publishedAt)}</span>
              <span>•</span>
              <span className="text-atlas-teal font-black uppercase text-[9px] tracking-wider">Atlas Quiropraxia</span>
            </p>
          </div>
        )}

        {/* Video Playlist Thumbnails Navigation */}
        <div className="mt-8" id="video-playlist-container">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[11px] uppercase tracking-[4px] text-atlas-white/40 font-black italic">
              {mode === 'manual' ? 'Lista de Videos Manuales' : 'Lista de Reproducción'}
            </h4>
            {mode === 'manual' && (
              <span className="text-[10px] bg-atlas-gold/10 text-atlas-gold border border-atlas-gold/20 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                Podés eliminar videos tocando la cruz (X)
              </span>
            )}
          </div>

          <div className="flex overflow-x-auto gap-3 pb-4 snap-x scrollbar-thin scrollbar-thumb-white/10 hide-scrollbar" id="thumbnails-track">
            {videos.map((item, idx) => (
              <div key={item.id} className="relative flex-shrink-0 snap-center">
                <button
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex-shrink-0 w-40 md:w-60 aspect-video rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left group/thumb
                    ${activeIndex === idx ? 'border-atlas-gold shadow-[0_0_20px_rgba(253,185,49,0.3)] scale-100' : 'border-white/5 scale-95 opacity-60 hover:opacity-100'}`}
                >
                  <img 
                    src={item.thumbnail} 
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500" 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3">
                    <p className="text-white font-bold text-[10px] md:text-xs line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </button>

                {/* Direct quick delete icon for manual videos */}
                {mode === 'manual' && (
                  <button
                    onClick={(e) => handleDeleteManualVideo(item.id, e)}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-20 border border-white/20"
                    title="Eliminar este video"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* YouTube Configuration Modal */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="yt-config-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfigOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0B0D12] border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-atlas-gold to-atlas-orange" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-500/20">
                    <Youtube className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Administrar Contenido de Video</h3>
                    <p className="text-xs text-white/40 font-medium">Sincronización de canal o carga directa manual</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsConfigOpen(false)} 
                  className="p-1 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Selection Tabs */}
              <div className="grid grid-cols-2 p-1 bg-white/5 rounded-xl border border-white/5 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('auto');
                    setError(null);
                  }}
                  className={`py-2.5 text-[10px] md:text-xs uppercase tracking-wider font-black rounded-lg transition-all flex items-center justify-center gap-2
                    ${activeTab === 'auto' ? 'bg-gradient-to-r from-atlas-gold to-atlas-orange text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sincronización (API)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('manual');
                    setError(null);
                  }}
                  className={`py-2.5 text-[10px] md:text-xs uppercase tracking-wider font-black rounded-lg transition-all flex items-center justify-center gap-2
                    ${activeTab === 'manual' ? 'bg-gradient-to-r from-atlas-gold to-atlas-orange text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Carga Manual (Fácil)</span>
                </button>
              </div>

              {/* Scrollable Container Content */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-6 custom-scrollbar">
                
                {/* 1. AUTO MODE TAB */}
                {activeTab === 'auto' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-xs text-zinc-400 space-y-2 leading-relaxed">
                      <p className="flex gap-2 text-white/80 font-bold">
                        <Info className="w-4 h-4 text-atlas-gold shrink-0" />
                        ¿Cómo funciona la sincronización automática?
                      </p>
                      <p>
                        Usa las credenciales de Google Cloud para buscar los últimos videos cargados al canal de forma automática.
                      </p>
                      <p className="text-red-400 font-medium text-[11px] bg-red-950/20 p-2.5 rounded-lg border border-red-500/10">
                        <strong>¡IMPORTANTE!</strong> Si te da error de credenciales, recordá activar la API <strong>"YouTube Data API v3"</strong> en la consola de Google Cloud de tu proyecto.
                      </p>
                    </div>

                    <form onSubmit={handleSaveAutoConfig} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-white/50 mb-1.5">
                          1. ID del Canal de YouTube (Channel ID)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: UC1234567890abcdefghijklm"
                          value={channelId}
                          onChange={(e) => setChannelId(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/15 focus:border-atlas-gold focus:outline-none text-white text-xs font-mono transition-colors"
                        />
                        <p className="text-[9px] text-white/30 mt-1">
                          Debe comenzar con <strong className="text-white">UC</strong>. Podés obtener el ID copiando la URL de tu canal en <a href="https://commentpicker.com/youtube-channel-id.php" target="_blank" rel="noreferrer" className="text-atlas-gold underline inline-flex items-center gap-0.5">CommentPicker <ExternalLink className="w-2.5 h-2.5" /></a>.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-white/50 mb-1.5">
                          2. Google Cloud API Key (YouTube Data API v3)
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Ej: AIzaSy..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/15 focus:border-atlas-gold focus:outline-none text-white text-xs font-mono transition-colors"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-[11px] text-red-200 font-mono">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        {isUsingCustom && mode === 'auto' && (
                          <button
                            type="button"
                            onClick={handleResetConfig}
                            className="px-4 py-3 border border-red-500/30 hover:bg-red-950/40 text-red-400 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Desvincular</span>
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-atlas-gold to-atlas-orange text-black font-black text-[10px] uppercase tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                        >
                          {loading ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : isSuccess ? (
                            <Check className="w-3.5 h-3.5 text-black" />
                          ) : (
                            'Guardar y Conectar Canal'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* 2. MANUAL MODE TAB */}
                {activeTab === 'manual' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-xs text-zinc-400 space-y-1.5 leading-relaxed">
                      <p className="flex gap-2 text-white/80 font-bold">
                        <LinkIcon className="w-4 h-4 text-atlas-gold shrink-0" />
                        Carga directa de videos de YouTube
                      </p>
                      <p>
                        Pegá cualquier enlace de video de tu canal. No requiere claves de Google Cloud, es <strong>100% gratuito e instantáneo</strong>.
                      </p>
                    </div>

                    <form onSubmit={handleAddManualVideo} className="space-y-4 p-4 border border-white/5 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-wider text-atlas-gold mb-1">Cargar Nuevo Video</p>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-white/40 mb-1">
                          Enlace de YouTube (URL)
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="Ej: https://www.youtube.com/watch?v=y_PPlb7nU2c"
                          value={manualUrl}
                          onChange={(e) => setManualUrl(e.target.value)}
                          className="w-full px-4 py-2.5 bg-black rounded-xl border border-white/10 focus:border-atlas-gold focus:outline-none text-white text-xs transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-white/40 mb-1">
                          Título del Video
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Nueva Entrevista en ATLAS Quiropraxia"
                          value={manualTitle}
                          onChange={(e) => setManualTitle(e.target.value)}
                          className="w-full px-4 py-2.5 bg-black rounded-xl border border-white/10 focus:border-atlas-gold focus:outline-none text-white text-xs transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-white/40 mb-1">
                          Descripción (Opcional)
                        </label>
                        <textarea
                          placeholder="Breve descripción de qué trata el video..."
                          value={manualDesc}
                          onChange={(e) => setManualDesc(e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2.5 bg-black rounded-xl border border-white/10 focus:border-atlas-gold focus:outline-none text-white text-xs transition-colors resize-none"
                        />
                      </div>

                      {error && activeTab === 'manual' && (
                        <div className="p-2.5 bg-red-950/40 border border-red-500/30 rounded-xl text-[10px] text-red-200 font-mono">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-atlas-gold to-atlas-orange text-black font-black text-[10px] uppercase tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                      >
                        {isSuccess ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>Agregar a la Web</span>
                      </button>
                    </form>

                    {/* Manage currently loaded manual videos */}
                    <div className="space-y-2 mt-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-white/50">
                        Videos Cargados Actualmente ({getManualList().length})
                      </p>
                      
                      {getManualList().length === 0 ? (
                        <p className="text-xs text-white/30 italic">No hay videos manuales guardados. Mostrando videos por defecto.</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {getManualList().map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5 gap-3">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <img src={item.thumbnail} alt="" className="w-12 aspect-video rounded-lg object-cover bg-black" referrerPolicy="no-referrer" />
                                <div className="overflow-hidden">
                                  <p className="text-white font-bold text-xs truncate">{item.title}</p>
                                  <p className="text-[9px] text-white/40 truncate font-mono">{item.id}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteManualVideo(item.id)}
                                className="p-2 hover:bg-red-950/20 text-red-400 hover:text-red-500 rounded-lg transition-colors"
                                title="Eliminar video"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Reset All Settings Button */}
              {isUsingCustom && (
                <div className="pt-3 border-t border-white/5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleResetConfig}
                    className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Reestablecer todo por defecto
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
