import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, Video, Sparkles, X } from 'lucide-react';
import { fetchSchoolVideos, SchoolVideoItem } from '../data/schoolData';
import { SchoolBadgeImg } from './SchoolBadgeImg';

interface VideoCardProps {
  video: SchoolVideoItem;
  onSelect: (video: SchoolVideoItem) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !hasError) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted if unmuted, but it's muted
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(video)}
      className="group relative flex-shrink-0 w-72 sm:w-80 h-52 sm:h-56 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-700/60 shadow-lg hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 transform hover:-translate-y-1 snap-start"
    >
      {/* VIDEO ELEMENT */}
      <video
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail}
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* TOP BADGES */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <span className="bg-[#800020]/90 backdrop-blur-md text-amber-200 border border-amber-400/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {video.category}
        </span>
        {video.duration && (
          <span className="bg-black/70 backdrop-blur-md text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/10">
            {video.duration}
          </span>
        )}
      </div>

      {/* CENTER PLAY BADGE ON HOVER / IDLE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
          isPlaying 
            ? 'bg-amber-400/20 text-amber-300 scale-90 border border-amber-400/40 opacity-0 group-hover:opacity-100' 
            : 'bg-white/20 text-white group-hover:bg-[#800020] group-hover:scale-110 border border-white/30'
        }`}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </div>
      </div>

      {/* BOTTOM INFO */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none space-y-1">
        <p className="text-white font-bold text-sm font-['Montserrat'] line-clamp-1 group-hover:text-amber-300 transition-colors">
          {video.title}
        </p>
        <div className="flex items-center justify-between text-[11px] text-slate-300">
          <span className="text-slate-400 flex items-center gap-1">
            <Video className="w-3 h-3 text-amber-400" /> Hover to preview
          </span>
          <span className="text-amber-300 font-semibold group-hover:underline flex items-center gap-1">
            Click to expand <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* LIVE PROGRESS BAR WHEN PLAYING */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-[#800020] animate-[marquee_5s_linear_infinite]" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export const FooterVideoShowcase: React.FC = () => {
  const [videos, setVideos] = useState<SchoolVideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<SchoolVideoItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchSchoolVideos().then(items => setVideos(items));
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#071322] border-t border-slate-800 text-slate-200 py-10 px-4 sm:px-8 relative overflow-hidden">
      {/* BACKGROUND ACCENTS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#800020]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* HEADER BAR WITH TITLE & SCROLL CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>STAHIZA Live Video Reels & Campus Highlights</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-white">
              Watch Life at Standard High School Zzana
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Experience our vibrant boarding school community, national USSSA sports, UNEB science laboratories, and cultural celebrations. Auto-plays on hover.
            </p>
          </div>

          {/* SCROLL BUTTONS & MOBILE THUMB HINT */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-xs text-slate-400 font-medium">
              Swipe or thumb-scroll track
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-[#800020] text-white flex items-center justify-center transition border border-slate-700/60 shadow active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-[#800020] text-white flex items-center justify-center transition border border-slate-700/60 shadow active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* THUMB-SCROLLABLE HORIZONTAL TRACK */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 touch-pan-x cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((vid) => (
            <VideoCard
              key={vid.id}
              video={vid}
              onSelect={setSelectedVideo}
            />
          ))}
        </div>

        {/* TRACK BOTTOM HINT */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <SchoolBadgeImg size={18} />
            <span>Supabase Media Storage • Bucket: <code className="text-amber-400/80 font-mono text-[11px]">IMAGES/others</code></span>
          </div>
          <span className="text-[11px] text-slate-400">Touch & thumb swipe enabled for mobile</span>
        </div>

      </div>

      {/* FULLSCREEN / MODAL PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl space-y-4">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <SchoolBadgeImg size={32} />
                <div>
                  <h4 className="text-lg font-bold text-white font-['Montserrat']">{selectedVideo.title}</h4>
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">{selectedVideo.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#800020] text-white flex items-center justify-center transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* VIDEO PLAYER */}
            <div className="p-4 sm:p-6 pt-0">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                <video
                  src={selectedVideo.url}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-slate-400">
              <span>Standard High School Zzana - Education Is The Way</span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition"
              >
                Close Player
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
