import React, { useEffect, useRef, useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  duration?: number; // default 5000ms
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  duration = 3000, 
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // 3D DOTTED SPHERICAL ROTATION CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 300);
    let height = (canvas.height = 300);

    // Generate ~260 points on a sphere using Fibonacci distribution
    const numPoints = 260;
    const radius = 110;
    const points: Array<{ x: number; y: number; z: number; color: string; size: number }> = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Color variation in STAHIZA theme (Gold, Maroon, Sky Blue)
      let color = '#FCD34D'; // Gold
      if (i % 3 === 0) color = '#800020'; // Maroon
      if (i % 5 === 0) color = '#38BDF8'; // Accent Blue

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        color,
        size: Math.random() * 1.5 + 2.2
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += 0.012;
      angleY += 0.018;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const cx = width / 2;
      const cy = height / 2;

      const projected = points.map(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const perspective = 300 / (300 + z2);
        const px = cx + x1 * perspective;
        const py = cy + y2 * perspective;
        const alpha = Math.max(0.2, (z2 + radius) / (2 * radius));
        const projectedSize = p.size * perspective;

        return { px, py, z2, alpha, projectedSize, color: p.color };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.8, p.projectedSize), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.alpha * 6;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // TIMER LOGIC (EXACTLY 3 SECONDS)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="stahiza-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0A192F] text-white flex flex-col items-center justify-center p-4 overflow-hidden select-none"
        >
          {/* AMBIENT BACKGROUND GLOW */}
          <div className="absolute w-96 h-96 rounded-full bg-[#800020]/20 blur-3xl pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* 3D DOTTED SPHERE CONTAINER WITH BADGE ONLY */}
          <div className="relative flex items-center justify-center">
            {/* CANVAS 3D DOTTED SPHERE */}
            <canvas
              ref={canvasRef}
              className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] drop-shadow-[0_0_25px_rgba(252,211,77,0.3)]"
            />

            {/* EMBEDDED SCHOOL CREST LOGO BADGE AT SPHERE CENTER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-amber-400/60"
              >
                <SchoolBadgeImg size={56} className="w-14 h-14 sm:w-16 sm:h-16" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
