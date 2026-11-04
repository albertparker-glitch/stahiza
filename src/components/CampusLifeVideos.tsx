import React from 'react';
import { getSupabaseVideosUrl } from '../lib/supabase';
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
      {/* VIDEO GRID - ONLY VIDEOS WITH BOX SHADOW, NO CAPTIONS OR WORDS */}
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
