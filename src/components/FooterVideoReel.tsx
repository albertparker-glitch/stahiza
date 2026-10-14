import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, Maximize2, X, Film } from 'lucide-react';
import { CampusVideo, fetchCampusVideos, FALLBACK_CAMPUS_VIDEOS } from '../data/schoolData';
import { SchoolBadgeImg } from './SchoolBadgeImg';

export const FooterVideoReel: React.FC = () => {
  const [videos, setVideos] = useState<CampusVideo[]>(FALLBACK_CAMPUS_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<CampusVideo | null>(null);

  useEffect(() => {
    fetchCampusVideos().then(data => {
      if (data && data.length > 0) {
        setVideos(data);
      }
    });
  }, []);

  return (
    <div className="w-full bg-[#081528] border-b border-slate-800/80 py-16 px-4 sm:px-8 text-white relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#800020]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* REEL HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#800020]/30 border border-[#800020]/50 px-3.5 py-1 rounded-full text-rose-200 text-xs sm:text-sm font-semibold">
            <Film className="w-3.5 h-3.5 text-amber-300" />
            <span>Campus Video Archive</span>
            <span className="text-slate-400">·</span>
            <span className="text-amber-300/90 font-mono text-[11px]">IMAGES/others</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] tracking-tight">
            Stahiza in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400">Motion</span>
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore our campus activities, academic highlights, and championship sports moments in motion. Click any video to view in fullscreen.
          </p>
        </div>

        {/* RESPONSIVE VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onSelect={() => setSelectedVideo(video)} 
            />
          ))}
        </div>

      </div>

      {/* FULLSCREEN / EXPANDED VIDEO MODAL WITH BLURRED BACKGROUND */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Video Card with Autoplay Loop
interface VideoCardProps {
  video: CampusVideo;
  onSelect: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      onClick={onSelect}
      className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl cursor-pointer group flex flex-col justify-between"
    >
      {/* Background Autoplay Video */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-black/50 transition-opacity duration-300" />

      {/* TOP BAR: TAG & SOUND TOGGLE */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#800020]/90 text-white px-3 py-1 rounded-md shadow border border-rose-500/40">
          {video.tag}
        </span>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-black/60 px-2.5 py-1 rounded-full border border-emerald-500/40 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live AutoPlay
          </span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-2 rounded-xl bg-black/70 hover:bg-[#800020] text-white transition shadow border border-white/10"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* CENTER EXPAND ICON ON HOVER */}
      <div className="relative z-10 flex items-center justify-center my-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-[#800020]/90 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl">
          <Maximize2 className="w-6 h-6" />
        </div>
      </div>

      {/* BOTTOM INFO PANEL */}
      <div className="relative z-10 p-4 sm:p-6 space-y-2 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
        <h4 className="font-bold text-base sm:text-lg font-['Montserrat'] text-white line-clamp-2 group-hover:text-amber-300 transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <SchoolBadgeImg size={18} className="w-4 h-4" />
            STAHIZA Motion
          </span>
          <span className="inline-flex items-center gap-1 text-amber-300 font-bold group-hover:translate-x-1 transition-transform">
            Watch Fullscreen &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Fullscreen Video Modal with 80% Max Height, Solid Gold Border, Glow Shadow & Thoroughly Blurred Background
interface VideoModalProps {
  video: CampusVideo;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Thoroughly Blurred Background Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
      />

      {/* Modal Dialog with Solid Gold Border, Glow Shadow, & 80% Max Height */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-4xl max-h-[80vh] bg-slate-900 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(252,211,77,0.35)] border-4 border-[#FCD34D] flex flex-col my-auto"
      >
        {/* Modal Top Header */}
        <div className="p-3 sm:p-5 flex items-center justify-between border-b border-slate-800 bg-[#0A192F] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <SchoolBadgeImg size={32} className="shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-300 tracking-wider block">{video.tag}</span>
              <h3 className="text-sm sm:text-lg font-extrabold font-['Montserrat'] text-white truncate">
                {video.title}
              </h3>
            </div>
          </div>
          
          {/* Prominent 'X' Close Button */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 sm:p-3 rounded-full bg-[#800020] hover:bg-[#A00028] text-white transition shadow-lg border-2 border-amber-300 shrink-0 ml-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        {/* Video Player with max-h-[80vh] container */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[calc(80vh-130px)]">
          <video
            src={video.videoUrl}
            autoPlay
            controls
            playsInline
            className="w-full h-full max-h-[calc(80vh-130px)] object-contain"
          />
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3 sm:p-4 bg-[#0A192F] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-300 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium truncate">Standard High School Zzana · Stahiza in Motion Archive</span>
          </div>
          <p className="italic font-serif text-amber-300 font-medium">"Education Is The Way"</p>
        </div>
      </motion.div>
    </div>
  );
};
