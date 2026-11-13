import React, { useState } from 'react';
import { getSupabaseVideosUrl } from '../lib/supabase';
import { CAMPUS_VIDEO_POSTERS } from '../data/campusMediaManifest';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { Video, Play, ExternalLink, Sparkles, Youtube } from 'lucide-react';
import { motion } from 'motion/react';

export interface CampusVideoItem {
  id: string;
  fileKey: string;
}

interface CampusYoutubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  tag: string;
  badgeText: string;
  sourceLabel: string;
}

const CAMPUS_VIDEOS_LIST: CampusVideoItem[] = [
  { id: 'life-1', fileKey: 'life1' },
  { id: 'life-2', fileKey: 'life2' },
  { id: 'life-3', fileKey: 'life3' },
  { id: 'life-4', fileKey: 'life4' },
  { id: 'life-5', fileKey: 'life5' },
  { id: 'life-6', fileKey: 'life6' },
  { id: 'life-7', fileKey: 'life7' },
  { id: 'life-8', fileKey: 'life8' }
];

const CAMPUS_YOUTUBE_VIDEOS: CampusYoutubeVideo[] = [
  {
    id: 'campus-yt-1',
    youtubeId: 'Pc0OiyHmoSI',
    title: 'Hi Skool Kiromo Checks In at Standard High School Zzana',
    description: 'KIROMO Brand House campus tour hosted by MC Ollo featuring lively student interaction, music, youth culture, and vibrant STAHIZA school spirit.',
    tag: 'Campus Tour',
    badgeText: 'Hi Skool Kiromo',
    sourceLabel: 'KIROMO Brand House'
  },
  {
    id: 'campus-yt-2',
    youtubeId: '0MNWG5ejKh0',
    title: 'Smashed Live Uganda Youth Awareness Experience at STAHIZA',
    description: 'Produced by Topowa Youth Mentoring Uganda, this interactive educational theatre outreach equips STAHIZA students with awareness against underage drinking and peer pressure.',
    tag: 'Youth Mentoring',
    badgeText: 'Smashed Live Uganda',
    sourceLabel: 'Topowa Youth Mentoring'
  },
  {
    id: 'campus-yt-3',
    youtubeId: '0mREMbnzPSY',
    title: 'Teacher Mpamire Live Comedy Performance at STAHIZA',
    description: 'Ugandan comedian and former STAHIZA history teacher Herbert Mendo Ssegujja (Teacher Mpamire) returns to campus for a lively comedy and assembly showcase with students.',
    tag: 'Live Comedy',
    badgeText: 'Campus Event',
    sourceLabel: 'Teacher Mpamire'
  }
];

export const CampusLifeVideos: React.FC = () => {
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);

  return (
    <div className="space-y-8 pt-2">
      {/* STICKY CATEGORY HEADER WITH TITLE "Stahiza in a brief" */}
      <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3.5 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Montserrat'] text-[#0A192F]">
              Stahiza in a brief
            </h3>
            <span className="text-[10px] sm:text-xs text-[#800020] font-bold uppercase tracking-wider block">
              Campus Life Video Highlights
            </span>
          </div>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('campus-section-filter');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
        >
          <span>Change Section</span>
        </button>
      </div>

      {/* VIDEO GRID - ONLY VIDEOS WITH BOX SHADOW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {CAMPUS_VIDEOS_LIST.map((vid, idx) => {
          const videoUrl = getSupabaseVideosUrl(vid.fileKey);

          return (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: (idx % 4) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-black rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl hover:shadow-2xl hover:shadow-[#0A192F]/25 transition-all duration-300"
              style={{
                boxShadow: '0 20px 25px -5px rgba(10, 25, 47, 0.15), 0 8px 10px -6px rgba(10, 25, 47, 0.1)'
              }}
            >
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <video
                  src={videoUrl}
                  poster={CAMPUS_VIDEO_POSTERS[vid.fileKey]}
                  preload="auto"
                  controls
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                </video>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CAMPUS LIFE & STUDENT EVENTS YOUTUBE HIGHLIGHTS */}
      <div className="pt-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#800020]">
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Campus Events & Student Outreach</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold font-['Montserrat'] text-[#0A192F]">
              Student Life, Tours & Assemblies on YouTube
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CAMPUS_YOUTUBE_VIDEOS.map((video, idx) => {
            const isPlaying = activeYoutubeId === video.id;
            const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
            const watchUrl = `https://youtu.be/${video.youtubeId}`;
            const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group"
              >
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
                      onClick={() => setActiveYoutubeId(video.id)}
                      className="relative w-full h-full cursor-pointer group/thumb"
                    >
                      <img
                        src={thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transform group-hover/thumb:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
                        </div>
                      </div>

                      <div className="absolute top-3 left-3 bg-[#0A192F]/85 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>{video.tag}</span>
                      </div>

                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-2 rounded-xl text-xs transition border border-white/20"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold gap-2">
                      <span className="text-[#800020]">Campus Life Feature</span>
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0">
                        {video.badgeText}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-base font-['Montserrat'] text-[#0A192F] line-clamp-2 leading-snug">
                      {video.title}
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <SchoolBadgeImg size={24} className="shrink-0" />
                      <span className="text-[11px] font-bold text-[#0A192F] truncate">{video.sourceLabel}</span>
                    </div>

                    {isPlaying ? (
                      <button
                        onClick={() => setActiveYoutubeId(null)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 shrink-0"
                      >
                        Close Player
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveYoutubeId(video.id)}
                        className="text-xs font-bold text-[#800020] hover:text-[#600018] flex items-center gap-1 shrink-0"
                      >
                        <span>Watch Video</span>
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
    </div>
  );
};
