import React from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { motion } from 'motion/react';

interface SectionDividerProps {
  variant?: 'crest' | 'simple' | 'gold';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'crest',
  className = '' 
}) => {
  return (
    <div className={`py-10 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-center relative overflow-hidden ${className}`}>
      {/* Left Gradient Line */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-slate-300 to-[#800020]/40 rounded-full" />
      
      {/* Center Emblem Icon */}
      {variant === 'crest' && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-4 sm:mx-6 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-xs shrink-0"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
          <SchoolBadgeImg size={24} className="w-6 h-6 shrink-0" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#0A192F]" />
        </motion.div>
      )}

      {variant === 'gold' && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-4 sm:mx-6 flex items-center gap-2 bg-gradient-to-r from-[#800020] to-[#0A192F] text-amber-300 px-4 py-1 rounded-full shadow-sm text-[11px] font-extrabold uppercase tracking-widest border border-amber-300/30 shrink-0"
        >
          <span>STAHIZA</span>
          <span className="text-white">•</span>
          <SchoolBadgeImg size={18} className="w-4 h-4" />
        </motion.div>
      )}

      {variant === 'simple' && (
        <div className="mx-4 flex items-center gap-1.5 shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#800020]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs" />
          <div className="w-2 h-2 rounded-full bg-[#0A192F]" />
        </div>
      )}

      {/* Right Gradient Line */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-slate-300 to-[#0A192F]/40 rounded-full" />
    </div>
  );
};
