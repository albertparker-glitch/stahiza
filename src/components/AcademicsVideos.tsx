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
}

const ACADEMIC_VIDEOS: AcademicVideo[] = [
  {
    id: 'vid-1',
    youtubeId: 'L_k2lMeINqo',
    title: 'STAHIZA Academic Journey & Campus Life',
    description: 'Discover the teaching methodology, modern classrooms, and student dedication at Standard High School Zzana.',
    tag: 'Academic Tour'
  },
  {
    id: 'vid-2',
    youtubeId: '6xILoTUTEME',
    title: 'Student Discipline, Mentorship & Values',
    description: 'Inside our student culture, academic mentorship sessions, and the holistic upbringing that fuels UNEB success.',
    tag: 'Student Culture'
  },
  {
    id: 'vid-3',
    youtubeId: 'jubC506SVfI',
    title: 'Excellence in UNEB Sciences & Arts',
    description: 'Hands-on practical sessions in science laboratories, interactive seminars, and candidate drilling.',
    tag: 'UNEB Preparation'
  },
  {
    id: 'vid-4',
    youtubeId: 'P6dxdxyeBko',
    title: 'Academic Excellence, UNEB Results & Student Success',
    description: 'A look into the disciplined study culture, motivated teaching staff, and exemplary academic performance at STAHIZA.',
    tag: 'Academic Excellence'
  },
  {
    id: 'vid-5',
    youtubeId: '4ZXlyjdoJOg',
    title: 'Holistic Education, Curriculum & Classroom Rigor',
    description: 'Fostering intellectual growth, science and arts mastery, and comprehensive career preparation for every learner.',
    tag: 'Curriculum & Rigor'
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
          Experience our high-standard learning culture, inspiring faculty lectures, student testimonies, and rigorous preparation for national UNEB examinations.
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
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group"
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
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transform group-hover/thumb:scale-115 active:scale-95 transition duration-300">
                        <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
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
                    <span>Academic Spotlight</span>
                  </div>
                  <h4 className="font-extrabold text-base sm:text-lg font-['Montserrat'] text-[#0A192F] line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SchoolBadgeImg size={24} />
                    <span className="text-[11px] font-bold text-[#0A192F]">STAHIZA Media</span>
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
