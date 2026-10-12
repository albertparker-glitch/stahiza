import React, { useState } from 'react';

interface SchoolBadgeProps {
  className?: string;
  size?: number;
  zoom?: number;
}

export const SchoolBadgeImg: React.FC<SchoolBadgeProps> = ({ className = "w-12 h-12", size = 48, zoom = 1.3 }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-md ${className}`}>
        <circle cx="50" cy="50" r="48" fill="#0F2A4A" stroke="#800020" strokeWidth="4" />
        <text x="50" y="55" fill="#ffffff" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="Montserrat">STH</text>
      </svg>
    );
  }

  return (
    <img 
      src="/pages/images/badge.png" 
      alt="Standard High School Zzana Badge" 
      width={Math.round(size * zoom)}
      height={Math.round(size * zoom)}
      className={`object-contain shrink-0 drop-shadow-md transform scale-125 hover:scale-135 transition duration-300 ${className}`}
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src.includes('/pages/images/badge.png')) {
          target.src = '/badge.png';
        } else {
          setHasError(true);
        }
      }}
    />
  );
};
