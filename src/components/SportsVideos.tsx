import React, { useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { Play, ExternalLink, Trophy, Youtube, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface SportsVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  tag: string;
  badgeText: string;
}

const SPORTS_VIDEOS: SportsVideo[] = [
  {
    id: 'sports-1',
    youtubeId: 'xt0ocUlNoHs',
    title: 'STAHIZA USSSA National Champions — Match Highlights',
    description: 'Electric match action and thrilling moments from our championship run in the USSSA national football competitions.',
    tag: 'USSSA Football',
    badgeText: 'National Champions'
  },
  {
    id: 'sports-2',
    youtubeId: '2k3VkRBNUnI',
    title: 'Championship Pitch Battles & Match Winner',
    description: 'Full-throttle tactical football, decisive goals, and unmatched determination on the pitch by STAHIZA sportsmen.',
    tag: 'Tournament Play',
    badgeText: 'Match Action'
  },
  {
    id: 'sports-3',
    youtubeId: 'Pc0OiyHmoSI',
    title: 'STAHIZA Team Victory Celebrations & School Spirit',
    description: 'The jubilant songs, brass band, and triumphant celebrations as STAHIZA brings home trophies to Entebbe Road.',
    tag: 'Celebration',
    badgeText: 'Victory Parade'
  },
  {
    id: 'sports-4',
    youtubeId: '0MNWG5ejKh0',
    title: 'Elite Student Athletes: Skills, Drills & Speed',
    description: 'Showcasing our top football prodigies, athletic stamina, and professional coaching that feeds top Ugandan football clubs.',
    tag: 'Athletics & Skills',
    badgeText: 'Talent Showcase'
  },
  {
    id: 'sports-5',
    youtubeId: '0mREMbnzPSY',
    title: 'Trophy Lift & The Legacy of STAHIZA Sports',
    description: 'The crowning moments of our sports legacy, lifting gold medals and inspiring the next generation of champions.',
    tag: 'Gold Medalists',
    badgeText: 'Trophy Lift'
  }
];

export const SportsVideos: React.FC = () => {
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
        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-500/30 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>USSSA Champions Match & Talent Footage</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
          STAHIZA Champions in Action
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Watch our reigning USSSA football champions, ball games powerhouses, and athletic stars conquer the pitch and bring home national trophies.
        </p>
      </motion.div>

      {/* Video Grid: 5 videos displayed gracefully */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SPORTS_VIDEOS.map((video, idx) => {
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
              transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
              className={`bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group ${
                idx === 3 ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
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
                      <div className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-2xl transform group-hover/thumb:scale-115 active:scale-95 transition duration-300 border-2 border-white/40">
                        <Play className="w-6 h-6 fill-current ml-0.5 text-[#0A192F]" />
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 bg-[#800020]/90 backdrop-blur-md text-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow">
                      <Flame className="w-3 h-3 text-amber-400" />
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
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#800020] flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      STAHIZA Sports
                    </span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {video.badgeText}
                    </span>
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
                    <span className="text-[11px] font-bold text-[#0A192F]">Champions Arena</span>
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
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Watch Match</span>
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
