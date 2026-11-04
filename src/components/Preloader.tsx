import React, { useEffect, useRef, useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  duration?: number; // default 3000ms
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  duration = 3000, 
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // 3D DOTTED SPHERICAL ROTATION CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 280);
    let height = (canvas.height = 280);

    // Generate ~240 points on a sphere using Fibonacci distribution
    const numPoints = 260;
    const radius = 100;
    const points: Array<{ x: number; y: number; z: number; color: string; size: number }> = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Color variation in STAHIZA theme (Gold, Maroon, Deep Navy)
      let color = '#FCD34D'; // Gold
      if (i % 3 === 0) color = '#800020'; // Maroon
      if (i % 5 === 0) color = '#38BDF8'; // Sky Blue accent

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

      // Center coords
      const cx = width / 2;
      const cy = height / 2;

      // Sort points by z for proper depth buffer rendering
      const projected = points.map(p => {
        // Rotate around Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate around X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const perspective = 300 / (300 + z2);
        const px = cx + x1 * perspective;
        const py = cy + y2 * perspective;
        const alpha = Math.max(0.2, (z2 + radius) / (2 * radius)); // Depth transparency
        const projectedSize = p.size * perspective;

        return { px, py, z2, alpha, projectedSize, color: p.color };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      // Render dots
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

  // PROGRESS BAR & TIMER LOGIC (EXACTLY 3 SECONDS)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    }, 30);

    return () => clearInterval(interval);
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
          {/* AMBIENT BACKGROUND GLOW BALLS */}
          <div className="absolute w-96 h-96 rounded-full bg-[#800020]/20 blur-3xl pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* 3D DOTTED SPHERE CONTAINER WITH LOGO IN CENTER */}
          <div className="relative flex items-center justify-center">
            {/* CANVAS 3D DOTTED SPHERE */}
            <canvas
              ref={canvasRef}
              className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] drop-shadow-[0_0_20px_rgba(252,211,77,0.25)]"
            />

            {/* EMBEDDED SCHOOL CREST LOGO AT SPHERE CENTER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-amber-400/60"
              >
                <SchoolBadgeImg size={52} className="w-12 h-12 sm:w-14 sm:h-14" />
              </motion.div>
            </div>
          </div>

          {/* TYPOGRAPHY & MOTTO */}
          <div className="mt-6 text-center space-y-2 z-10">
            <h2 className="text-xl sm:text-2xl font-black font-['Montserrat'] tracking-tight text-white uppercase flex items-center justify-center gap-2">
              <span className="text-amber-300">Standard High School</span>
              <span className="text-[#800020] bg-white px-2 py-0.5 rounded-md text-xs font-black">ZZANA</span>
            </h2>
            <p className="text-xs sm:text-sm font-serif italic font-semibold text-amber-200 tracking-widest">
              "EDUCATION IS THE WAY"
            </p>
          </div>

          {/* 3SEC PROGRESS BAR & PERCENTAGE */}
          <div className="mt-8 w-64 sm:w-72 space-y-2 z-10">
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#800020] via-amber-400 to-amber-300 rounded-full shadow-[0_0_12px_rgba(252,211,77,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
              <span>LOADING STAHIZA</span>
              <span className="text-amber-300">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
