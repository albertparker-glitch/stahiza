import React, { useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { Play, ExternalLink, Youtube, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface AcademicVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  tag: string;
  spotlightLabel: string;
  sourceLabel: string;
}

const ACADEMIC_VIDEOS: AcademicVideo[] = [
  {
    id: 'vid-1',
    youtubeId: 'L_k2lMeINqo',
    title: 'STAHIZA Pledges Science Excellence After Top UACE Results',
    description: 'UBC Television Uganda coverage of Standard High School Zzana management and A-Level students celebrating top performers who scored 20 points and 17+ points in sciences.',
    tag: 'UACE Sciences',
    spotlightLabel: 'News Feature • UBC TV',
    sourceLabel: 'UBC Television Uganda'
  },
  {
    id: 'vid-2',
    youtubeId: '6xILoTUTEME',
    title: 'STAHIZA Shines in 2025 Senior Four UNEB Examinations',
    description: 'RUTEX Media TV report featuring PRO Eliot Musinguzi on STAHIZA’s exceptional 2025 S.4 UCE results, dedicated full-time teachers, sports balance, and S.1 & S.5 admissions.',
    tag: '2025 S.4 UCE Results',
    spotlightLabel: 'Media Report • RUTEX TV',
    sourceLabel: 'RUTEX MEDIA TV'
  },
  {
    id: 'vid-3',
    youtubeId: 'jubC506SVfI',
    title: 'S.6 Candidates Celebrate Top A-Level UNEB Performance',
    description: 'Jubilant campus scenes from STAHIZA TV capturing Senior Six candidates celebrating outstanding Uganda Advanced Certificate of Education (UACE) performance.',
    tag: 'A-Level Celebrations',
    spotlightLabel: 'Archive Clip • STAHIZA TV',
    sourceLabel: 'STAHIZA TV'
  },
  {
    id: 'vid-4',
    youtubeId: 'P6dxdxyeBko',
    title: 'Congratulations to the STAHIZA Senior Four Class of 2025',
    description: 'RUTEX Media TV congratulatory spotlight celebrating the Standard High School Zzana 2025 Senior Four cohort for their exemplary UNEB examination achievement.',
    tag: 'S.4 Class of 2025',
    spotlightLabel: 'Congratulations • RUTEX TV',
    sourceLabel: 'RUTEX MEDIA TV'
  },
  {
    id: 'vid-5',
    youtubeId: '4ZXlyjdoJOg',
    title: 'STAHIZA Top O-Level (UCE) Academic Achievers Showcase',
    description: 'STAHIZA TV spotlight honoring Standard High School Zzana’s best-performing Senior Four students in the Uganda Certificate of Education (UCE) national examinations.',
    tag: 'Top UCE Students',
    spotlightLabel: 'Achievers • STAHIZA TV',
    sourceLabel: 'STAHIZA TV'
  }
];

export const AcademicsVideos: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <div className="pt-6 pb-2 space-y-8">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 bg-[#800020]/10 border border-[#800020]/20 text-[#800020] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Youtube className="w-4 h-4 text-red-600" />
          <span>STAHIZA Academic Media & Spotlights</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
          Watch STAHIZA Academics in Action
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore national TV features, UNEB UCE and UACE results celebrations, and official highlights showcasing STAHIZA’s academic excellence.
        </p>
      </motion.div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {ACADEMIC_VIDEOS.map((video, idx) => {
          const isPlaying = activeVideoId === video.id;
          const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
          const watchUrl = `https://youtu.be/${video.youtubeId}`;
          const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

          return (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Video Player or Thumbnail */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                {isPlaying ? (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div 
                    onClick={() => setActiveVideoId(video.id)}
                    className="relative w-full h-full cursor-pointer group/thumb"
                  >
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover/thumb:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/thumb:opacity-90 transition-opacity" />
                    
                    {/* Play Button Overlay with Pulse Ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute -inset-2 rounded-full bg-red-600/30 animate-ping opacity-75 group-hover/thumb:opacity-100" />
                        <div className="relative w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transform group-hover/thumb:scale-115 active:scale-95 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 bg-[#0A192F]/85 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow">
                      <GraduationCap className="w-3 h-3 text-amber-300" />
                      <span>{video.tag}</span>
                    </div>

                    {/* Direct Youtube link */}
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-2 rounded-xl text-xs transition border border-white/20 hover:scale-110"
                      title="Open on YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#800020]">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    <span>{video.spotlightLabel}</span>
                  </div>
                  <h4 className="font-extrabold text-base sm:text-lg font-['Montserrat'] text-[#0A192F] line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SchoolBadgeImg size={24} />
                    <span className="text-[11px] font-bold text-[#0A192F]">{video.sourceLabel}</span>
                  </div>
                  
                  {isPlaying ? (
                    <button
                      onClick={() => setActiveVideoId(null)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Close Player
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveVideoId(video.id)}
                      className="text-xs font-bold text-[#800020] hover:text-[#600018] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Play Video</span>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
