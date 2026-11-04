import React from 'react';
import { getSupabaseVideosUrl } from '../lib/supabase';
import { Video } from 'lucide-react';
import { motion } from 'motion/react';

export interface CampusVideoItem {
  id: string;
  fileKey: string;
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

export const CampusLifeVideos: React.FC = () => {
  return (
    <div className="space-y-6 pt-2">
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
    </div>
  );
};
