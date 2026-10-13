import React, { useState } from 'react';
import { getSupabasePublicUrl } from '../lib/supabase';

interface SchoolBadgeProps {
  className?: string;
  size?: number;
  zoom?: number;
}

export const SchoolBadgeImg: React.FC<SchoolBadgeProps> = ({ className = "w-12 h-12", size = 48, zoom = 1.3 }) => {
  const [attempt, setAttempt] = useState(0);
  const scaledSize = Math.round(size * zoom);

  // Fallback sequence: 
  // 0: Supabase IMAGES bucket badge.png
  // 1: Supabase IMAGES bucket badge1.png
  // 2: Local /pages/images/badge.png
  // 3: Inline SVG Crest fallback
  const getBadgeSrc = (currentAttempt: number) => {
    switch (currentAttempt) {
      case 0: return getSupabasePublicUrl('badge.png');
      case 1: return getSupabasePublicUrl('badge1.png');
      case 2: return '/pages/images/badge.png';
      default: return '';
    }
  };

  if (attempt >= 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-md ${className}`}>
        <circle cx="50" cy="50" r="48" fill="#0F2A4A" stroke="#800020" strokeWidth="4" />
        <text x="50" y="55" fill="#ffffff" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="Montserrat">STH</text>
      </svg>
    );
  }

  return (
    <img 
      src={getBadgeSrc(attempt)} 
      alt="Standard High School Zzana Badge" 
      width={scaledSize}
      height={scaledSize}
      className={`object-contain shrink-0 drop-shadow-md transform scale-125 hover:scale-135 transition duration-300 ${className}`}
      onError={() => {
        setAttempt(prev => prev + 1);
      }}
    />
  );
};
