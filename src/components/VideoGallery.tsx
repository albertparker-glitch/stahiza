import React, { useState, useEffect } from 'react';
import { supabase, getSupabasePublicUrl } from '../lib/supabase';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { Film, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoItem {
  name: string;
  url: string;
  title: string;
}

export const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const cleaningVideoUrl = getSupabasePublicUrl('videos/cleaning.mp4');
        const back4VideoUrl = getSupabasePublicUrl('videos/back4.mp4');

        if (!supabase) {
          setVideos([
            {
              name: 'back4.mp4',
              url: back4VideoUrl,
              title: 'STAHIZA Campus Highlight'
            },
            {
              name: 'cleaning.mp4',
              url: cleaningVideoUrl,
              title: 'Campus Cleaning & Environment'
            }
          ]);
          setLoading(false);
          return;
        }

        const { data: files, error } = await supabase.storage
          .from('IMAGES')
          .list('videos/', {
            limit: 20,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        let videoItems: VideoItem[] = [];

        videoItems.push({
          name: 'back4.mp4',
          url: back4VideoUrl,
          title: 'STAHIZA Campus Highlight'
        });

        videoItems.push({
          name: 'cleaning.mp4',
          url: cleaningVideoUrl,
          title: 'Campus Cleaning & Environment'
        });

        if (!error && files && files.length > 0) {
          const mp4Files = files.filter(f => 
            f.name && 
            f.name.toLowerCase().endsWith('.mp4') && 
            f.name.toLowerCase() !== 'cleaning.mp4' &&
            f.name.toLowerCase() !== 'back4.mp4'
          );
          
          mp4Files.forEach(file => {
            const { data } = supabase.storage.from('IMAGES').getPublicUrl(`videos/${file.name}`);
            const cleanTitle = file.name
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]/g, ' ')
              .replace(/\b\w/g, c => c.toUpperCase());
            videoItems.push({
              name: file.name,
              url: data.publicUrl,
              title: cleanTitle
            });
          });
        }

        setVideos(videoItems);
      } catch (err) {
        console.error('Error fetching videos from Supabase:', err);
        setVideos([
          {
            name: 'back4.mp4',
            url: getSupabasePublicUrl('videos/back4.mp4'),
            title: 'STAHIZA Campus Highlight'
          },
          {
            name: 'cleaning.mp4',
            url: getSupabasePublicUrl('videos/cleaning.mp4'),
            title: 'Campus Cleaning & Environment'
          }
        ]);
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
            Explore recent highlights from academics, sports championships, and campus life at Standard High School Zzana.
          </p>
        </motion.div>

        {/* Loading State / Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
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
          /* Responsive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800/80 group hover:border-amber-300/40 transition duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  >
                    <source src={vid.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10 text-amber-300">
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
