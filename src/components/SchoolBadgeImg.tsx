import React from 'react';

interface SchoolBadgeProps {
  className?: string;
  size?: number;
  zoom?: number;
}

export const SchoolBadgeImg: React.FC<SchoolBadgeProps> = ({ className = "w-12 h-12", size = 48, zoom = 1.3 }) => {
  const scaledSize = Math.round(size * zoom);

  return (
    <div className={`relative flex items-center justify-center shrink-0 drop-shadow-md ${className}`} style={{ width: scaledSize, height: scaledSize }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 200 220" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transform scale-115 hover:scale-125 transition duration-300"
      >
        {/* Outer Shield Boundary */}
        <path 
          d="M20 25 C20 25, 100 5, 180 25 C180 80, 180 150, 100 200 C20 150, 20 80, 20 25 Z" 
          fill="#0F2A4A" 
          stroke="#ffffff" 
          strokeWidth="6" 
        />
        <path 
          d="M26 31 C26 31, 100 13, 174 31 C174 80, 174 144, 100 192 C26 144, 26 80, 26 31 Z" 
          fill="#ffffff" 
          stroke="#0F2A4A" 
          strokeWidth="3" 
        />

        {/* Top Header Banner in Shield */}
        <path d="M26 31 L174 31 L174 75 L26 75 Z" fill="#0F2A4A" />
        <text x="100" y="48" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="Montserrat, sans-serif" letterSpacing="1">STANDARD</text>
        <text x="100" y="66" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Montserrat, sans-serif" letterSpacing="0.5">HIGH SCH. ZZANA</text>

        {/* Inner white field with Ladder & Pen & Book */}
        <g stroke="#0F2A4A" strokeWidth="4" strokeLinecap="round">
          <line x1="60" y1="120" x2="140" y2="80" />
          <line x1="75" y1="135" x2="155" y2="95" />
          <line x1="70" y1="110" x2="85" y2="125" strokeWidth="3" />
          <line x1="90" y1="100" x2="105" y2="115" strokeWidth="3" />
          <line x1="110" y1="90" x2="125" y2="105" strokeWidth="3" />
          <line x1="130" y1="80" x2="145" y2="95" strokeWidth="3" />
        </g>

        {/* Pen Nib */}
        <path d="M110 85 L125 100 L115 110 L70 155 L65 155 L70 150 Z" fill="#0F2A4A" />
        <path d="M70 150 L65 155 L60 150 Z" fill="#800020" />

        {/* Open Book at Bottom */}
        <g transform="translate(70, 140)">
          <path d="M0 15 Q30 5 60 15 L60 35 Q30 25 0 35 Z" fill="#ffffff" stroke="#0F2A4A" strokeWidth="2" />
          <path d="M60 15 Q90 5 120 15 L120 35 Q90 25 60 35 Z" fill="#ffffff" stroke="#0F2A4A" strokeWidth="2" />
          <line x1="60" y1="15" x2="60" y2="35" stroke="#0F2A4A" strokeWidth="2" />
        </g>

        {/* Bottom Banner Ribbon */}
        <path d="M10 170 Q100 160 190 170 L195 195 Q100 215 5 195 Z" fill="#0F2A4A" stroke="#ffffff" strokeWidth="2" />
        <text x="100" y="190" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="Montserrat, sans-serif" letterSpacing="0.5">EDUCATION IS THE WAY</text>
      </svg>
    </div>
  );
};
