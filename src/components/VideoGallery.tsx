import React, { useState, useEffect } from 'react';
import { supabase, getSupabaseVideosUrl } from '../lib/supabase';
import { CAMPUS_VIDEO_POSTERS } from '../data/campusMediaManifest';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { Film, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoItem {
  name: string;
  url: string;
  title: string;
  poster: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    name: 'life1.mp4',
    url: getSupabaseVideosUrl('life1.mp4'),
    title: 'STAHIZA Campus Life Highlight 1',
    poster: CAMPUS_VIDEO_POSTERS.life1
  },
  {
    name: 'life2.mp4',
    url: getSupabaseVideosUrl('life2.mp4'),
    title: 'STAHIZA Campus Life Highlight 2',
    poster: CAMPUS_VIDEO_POSTERS.life2
  },
  {
    name: 'life3.mp4',
    url: getSupabaseVideosUrl('life3.mp4'),
    title: 'STAHIZA Campus Life Highlight 3',
    poster: CAMPUS_VIDEO_POSTERS.life3
  },
  {
    name: 'life4.mp4',
    url: getSupabaseVideosUrl('life4.mp4'),
    title: 'STAHIZA Campus Life Highlight 4',
    poster: CAMPUS_VIDEO_POSTERS.life4
  }
];

export const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(DEFAULT_VIDEOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const lifeFiles = ['life1.mp4', 'life2.mp4', 'life3.mp4', 'life4.mp4'];

        const client = supabase;
        if (!client) {
          setVideos(DEFAULT_VIDEOS);
          setLoading(false);
          return;
        }

        const items: VideoItem[] = lifeFiles.map((filename, index) => {
          const { data } = client.storage.from('IMAGES').getPublicUrl(`videos/${filename}`);
          const fileKey = filename.replace('.mp4', '');
          return {
            name: filename,
            url: data?.publicUrl || getSupabaseVideosUrl(filename),
            title: `STAHIZA Campus Life Highlight ${index + 1}`,
            poster: CAMPUS_VIDEO_POSTERS[fileKey] || CAMPUS_VIDEO_POSTERS.life1
          };
        });

        setVideos(items);
      } catch (err) {
        console.error('Error fetching videos from Supabase:', err);
        setVideos(DEFAULT_VIDEOS);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <section className="py-16 bg-[#0A192F] text-white border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-[#800020]/40 border border-[#800020]/60 px-4 py-1.5 rounded-full text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Film className="w-4 h-4 text-amber-300" />
            <span>STAHIZA Video Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] tracking-tight">
            Campus Moments & Activities
          </h2>
          <p className="text-slate-300 text-sm">
            Watch official highlights from student life, campus assemblies, and activities at Standard High School Zzana.
          </p>
        </motion.div>

        {/* Loading State / Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-4 space-y-4 animate-pulse">
                <div className="aspect-video w-full bg-slate-800 rounded-xl"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No video files found in the Supabase videos/ directory.
          </div>
        ) : (
          /* Responsive 4-Column Grid for life1 to life4 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((vid, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.025 }}
                className="rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800/80 group hover:border-amber-300/40 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto"
                    poster={vid.poster}
                    controls
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  >
                    <source src={vid.url} type="video/mp4" />
                    <source src={vid.url.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10 text-amber-300 pointer-events-none">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                {/* Title Overlay Footer */}
                <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <SchoolBadgeImg size={24} className="w-6 h-6 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-white font-['Montserrat'] truncate">
                      {vid.title}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#800020] text-white px-2 py-0.5 rounded uppercase font-semibold shrink-0">
                    HD
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
