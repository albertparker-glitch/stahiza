import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ChevronLeft, ChevronRight, Film, Sparkles } from 'lucide-react';
import { CampusVideo, fetchCampusVideos, FALLBACK_CAMPUS_VIDEOS } from '../data/schoolData';
import { SchoolBadgeImg } from './SchoolBadgeImg';

export const FooterVideoReel: React.FC = () => {
  const [videos, setVideos] = useState<CampusVideo[]>(FALLBACK_CAMPUS_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<CampusVideo | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingThumbRef = useRef(false);

  useEffect(() => {
    fetchCampusVideos().then(data => {
      if (data && data.length > 0) {
        setVideos(data);
      }
    });
  }, []);

  // Update thumb scroll position on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  };

  // Scroll buttons (step scroll)
  const handleStepScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -340 : 340;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Click on track to jump
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !scrollContainerRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
  };

  // Drag thumb handler
  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDraggingThumbRef.current = true;
    const startX = e.clientX;
    const startProgress = scrollProgress;

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingThumbRef.current || !trackRef.current || !scrollContainerRef.current) return;
      const trackWidth = trackRef.current.clientWidth;
      const deltaX = moveEvent.clientX - startX;
      const deltaProgress = deltaX / trackWidth;
      const newProgress = Math.max(0, Math.min(1, startProgress + deltaProgress));
      
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollLeft = newProgress * maxScroll;
      setScrollProgress(newProgress);
    };

    const onPointerUp = () => {
      isDraggingThumbRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div className="w-full bg-[#081528] border-b border-slate-800/80 py-12 px-4 sm:px-8 text-white relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#800020]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* REEL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#800020]/30 border border-[#800020]/50 px-3 py-1 rounded-full text-rose-200 text-xs font-semibold">
              <Film className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus Reels & Video Archive</span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-300/90 font-mono text-[11px]">IMAGES/others</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] tracking-tight">
              Life at STAHIZA in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400">Motion</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Hover over any video to auto-play preview. Swipe or use the thumb scroll bar below to browse our sports championships, academics, and student activities.
            </p>
          </div>

          {/* TOP CONTROLS & ARROWS */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
              Hover to play · Click to expand
            </span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleStepScroll('left')}
                aria-label="Scroll videos left"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#800020] text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleStepScroll('right')}
                aria-label="Scroll videos right"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#800020] text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL VIDEO SCROLL RAIL */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto py-3 no-scrollbar scroll-smooth touch-pan-y"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onSelect={() => setSelectedVideo(video)} 
            />
          ))}
        </div>

        {/* THUMB SCROLL CONTROL BAR */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Thumb Scroll:</span>
            <span>Drag slider handle to pan videos</span>
          </div>

          {/* Interactive Thumb Scroll Track */}
          <div className="w-full sm:w-80 flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono">01</span>
            <div
              ref={trackRef}
              onClick={handleTrackClick}
              className="flex-1 h-2 bg-slate-800 rounded-full relative cursor-pointer group/track overflow-hidden"
            >
              {/* Active filled track */}
              <div 
                className="h-full bg-slate-700 rounded-full transition-all duration-75"
                style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
              />
              {/* Draggable thumb */}
              <div
                onPointerDown={handleThumbPointerDown}
                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-amber-400 to-[#800020] rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 transition-transform duration-75 hover:scale-y-125"
                style={{ left: `${Math.min(96, Math.max(4, scrollProgress * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{String(videos.length).padStart(2, '0')}</span>
          </div>
        </div>

      </div>

      {/* FULLSCREEN / EXPANDED VIDEO MODAL */}
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

// Video Card with Auto-play on hover
interface VideoCardProps {
  video: CampusVideo;
  onSelect: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented playback
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="relative shrink-0 w-72 sm:w-80 h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/30 to-black/60 transition-opacity duration-300" />

      {/* TOP BAR: TAG, DURATION & LIVE STATUS */}
      <div className="relative z-10 p-4 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#800020]/90 text-white px-2.5 py-1 rounded-md shadow">
          {video.tag}
        </span>

        <div className="flex items-center gap-2">
          {isPlaying ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Playing
            </span>
          ) : (
            <span className="text-[11px] font-mono font-medium text-slate-300 bg-black/60 px-2 py-0.5 rounded-md">
              {video.duration || '0:45'}
            </span>
          )}

          {/* Quick Sound Toggle on Card */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-[#800020] text-white transition shadow opacity-0 group-hover:opacity-100"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* CENTER PLAY BUTTON (fades out when auto-playing) */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <motion.div
          animate={{ opacity: isPlaying ? 0 : 0.85, scale: isPlaying ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:bg-[#800020] group-hover:border-[#800020] group-hover:scale-110 transition duration-300"
        >
          <Play className="w-6 h-6 fill-white ml-0.5" />
        </motion.div>
      </div>

      {/* BOTTOM INFO PANEL */}
      <div className="relative z-10 p-4 space-y-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <h4 className="font-bold text-sm sm:text-base font-['Montserrat'] text-white line-clamp-2 group-hover:text-amber-300 transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/10">
          <span className="flex items-center gap-1.5 text-slate-300">
            <SchoolBadgeImg size={16} className="w-4 h-4" />
            STAHIZA Reel
          </span>
          <span className="inline-flex items-center gap-1 text-amber-300 font-medium group-hover:translate-x-1 transition-transform">
            Watch Fullscreen <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Fullscreen Video Modal
interface VideoModalProps {
  video: CampusVideo;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 bg-[#0A192F]">
          <div className="flex items-center gap-3">
            <SchoolBadgeImg size={32} />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">{video.tag}</span>
              <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-white line-clamp-1">
                {video.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-slate-800 hover:bg-[#800020] text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={video.videoUrl}
            autoPlay
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-[#0A192F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Standard High School Zzana Media Archive · IMAGES/others</span>
          </div>
          <p className="italic font-serif text-slate-300">"Education Is The Way"</p>
        </div>
      </motion.div>
    </div>
  );
};
