import React, { useState } from 'react';
import { getSupabasePublicUrl } from '../lib/supabase';

interface SchoolBadgeProps {
  className?: string;
  size?: number;
  zoom?: number;
}

export const SchoolBadgeImg: React.FC<SchoolBadgeProps> = ({
  className = 'w-12 h-12',
  size = 48,
  zoom = 1.15,
}) => {
  const [attempt, setAttempt] = useState(0);
  const scaledSize = Math.round(size * zoom);
  const hasExplicitSizeClass = /\b(w-|h-)\S+/.test(className);
  const isCentered = /\bmx-auto\b/.test(className);
  const paddingClass = size <= 24 ? 'p-0.5' : size <= 44 ? 'p-1' : 'p-1.5';

  // Fallback sequence:
  // 0: Supabase IMAGES bucket badge.png
  // 1: Supabase IMAGES bucket badge1.png
  // 2: Local /pages/images/badge.png
  // 3: Inline SVG Crest fallback
  const getBadgeSrc = (currentAttempt: number) => {
    switch (currentAttempt) {
      case 0:
        return getSupabasePublicUrl('badge.png');
      case 1:
        return getSupabasePublicUrl('badge1.png');
      case 2:
        return '/pages/images/badge.png';
      default:
        return '';
    }
  };

  if (attempt >= 3) {
    return (
      <span
        className={`${
          isCentered ? 'flex w-fit' : 'inline-flex'
        } items-center justify-center rounded-full bg-[#ffffff]/95 ${paddingClass} shadow-md ring-1 ring-blue-200/80 shrink-0 transition duration-300 hover:scale-105 ${className}`}
      >
        <svg
          width={hasExplicitSizeClass ? undefined : size}
          height={hasExplicitSizeClass ? undefined : size}
          viewBox="0 0 100 100"
          className={`${hasExplicitSizeClass ? 'w-full h-full' : ''} shrink-0 drop-shadow-sm`}
        >
          <circle cx="50" cy="50" r="48" fill="#1E40AF" stroke="#9B1C31" strokeWidth="4" />
          <text
            x="50"
            y="55"
            fill="#ffffff"
            fontSize="24"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="Montserrat"
          >
            STH
          </text>
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`${
        isCentered ? 'flex w-fit' : 'inline-flex'
      } items-center justify-center rounded-full bg-[#ffffff]/95 ${paddingClass} shadow-md ring-1 ring-blue-200/80 shrink-0 transition duration-300 hover:scale-105 ${className}`}
    >
      <img
        src={getBadgeSrc(attempt)}
        alt="Standard High School Zzana Badge"
        width={hasExplicitSizeClass ? undefined : scaledSize}
        height={hasExplicitSizeClass ? undefined : scaledSize}
        className={`${
          hasExplicitSizeClass ? 'w-full h-full' : ''
        } object-contain shrink-0 brightness-150 saturate-90 contrast-105 drop-shadow-sm scale-110 transition duration-300`}
        onError={() => {
          setAttempt((prev) => prev + 1);
        }}
      />
    </span>
  );
};
