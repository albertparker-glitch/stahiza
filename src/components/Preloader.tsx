import React, { useEffect, useRef, useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  duration?: number; // Backwards-compatible alias for minimum reveal duration
  minDuration?: number; // Minimum smooth reveal time (default 1500ms)
  maxDuration?: number; // Safety cap so stalled remote assets never block entry (default 12000ms)
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  duration,
  minDuration = 1500,
  maxDuration = 12000,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(8);

  const effectiveMinDuration = duration ?? minDuration;

  // 3D DOTTED SPHERICAL ROTATION CANVAS
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 300);
    const height = (canvas.height = 300);

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

      const projected = points.map((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const perspective = 300 / (300 + z2);
        const px = cx + x1 * perspective;
        const py = cy + y2 * perspective;
        const alpha = Math.max(0.2, (z2 + radius) / (2 * radius));
        const projectedSize = p.size * perspective;

        return { px, py, z2, alpha, projectedSize, color: p.color };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      projected.forEach((p) => {
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
  }, [isVisible]);

  // WAIT FOR DOCUMENT, IMAGES & VIDEOS TO LOAD PROPERLY
  useEffect(() => {
    let isCancelled = false;
    const trackedElements = new Set<Element>();
    const cleanups: Array<() => void> = [];

    let totalTracked = 0;
    let completedTracked = 0;
    let windowLoaded = document.readyState === 'complete';
    let minTimeElapsed = false;
    let settleCheckDone = false;

    const updateProgress = () => {
      if (isCancelled) return;
      const mediaRatio = totalTracked > 0 ? completedTracked / totalTracked : 1;
      const windowWeight = windowLoaded ? 0.15 : 0;
      const computed = Math.min(96, Math.round(12 + mediaRatio * 72 + windowWeight * 100));
      setProgress((prev) => Math.max(prev, computed));
    };

    const finish = () => {
      if (isCancelled) return;
      isCancelled = true;
      setProgress(100);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 180);
    };

    const tryFinish = () => {
      updateProgress();
      if (
        !isCancelled &&
        windowLoaded &&
        settleCheckDone &&
        minTimeElapsed &&
        completedTracked >= totalTracked
      ) {
        finish();
      }
    };

    const markItemDone = () => {
      completedTracked += 1;
      tryFinish();
    };

    const trackImage = (img: HTMLImageElement) => {
      if (trackedElements.has(img)) return;
      if (img.loading === 'lazy') return;
      if (!img.getAttribute('src')) return;

      trackedElements.add(img);
      totalTracked += 1;
      updateProgress();

      if (img.complete) {
        if (typeof img.decode === 'function' && img.naturalWidth > 0) {
          img.decode().catch(() => undefined).finally(markItemDone);
        } else {
          markItemDone();
        }
        return;
      }

      let settled = false;
      const onDone = () => {
        if (settled) return;
        settled = true;
        img.removeEventListener('load', onDone);
        img.removeEventListener('error', onDone);
        markItemDone();
      };

      img.addEventListener('load', onDone, { once: true });
      img.addEventListener('error', onDone, { once: true });
      cleanups.push(() => {
        img.removeEventListener('load', onDone);
        img.removeEventListener('error', onDone);
      });
    };

    const trackVideo = (video: HTMLVideoElement) => {
      if (trackedElements.has(video)) return;
      trackedElements.add(video);

      const targetReadyState = video.hasAttribute('data-hero-video') ? 3 : 2;
      totalTracked += 1;
      updateProgress();

      if (video.readyState >= targetReadyState) {
        markItemDone();
        return;
      }

      let settled = false;
      const finishVideo = () => {
        if (settled) return;
        settled = true;
        cleanupVideo();
        markItemDone();
      };

      const checkVideoReady = () => {
        if (video.readyState >= targetReadyState) {
          finishVideo();
        }
      };

      const sources = Array.from(video.querySelectorAll('source'));
      const lastSource = sources.length > 0 ? sources[sources.length - 1] : null;

      const cleanupVideo = () => {
        video.removeEventListener('loadeddata', checkVideoReady);
        video.removeEventListener('canplay', finishVideo);
        video.removeEventListener('canplaythrough', finishVideo);
        video.removeEventListener('error', finishVideo);
        if (lastSource) {
          lastSource.removeEventListener('error', finishVideo);
        }
      };

      video.addEventListener('loadeddata', checkVideoReady);
      video.addEventListener('canplay', finishVideo, { once: true });
      video.addEventListener('canplaythrough', finishVideo, { once: true });
      video.addEventListener('error', finishVideo, { once: true });
      if (lastSource) {
        lastSource.addEventListener('error', finishVideo, { once: true });
      }

      cleanups.push(cleanupVideo);
    };

    const scanNode = (root: ParentNode | Element) => {
      if (root instanceof HTMLImageElement) {
        trackImage(root);
      } else if (root instanceof HTMLVideoElement) {
        trackVideo(root);
      }
      if ('querySelectorAll' in root) {
        root.querySelectorAll('img').forEach((img) => trackImage(img));
        root.querySelectorAll('video').forEach((vid) => trackVideo(vid));
      }
    };

    // Initial scan
    scanNode(document);

    // Watch dynamically mounted media (e.g. async Supabase gallery/leaders hydration)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            scanNode(node);
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const onWindowLoad = () => {
      windowLoaded = true;
      scanNode(document);
      tryFinish();
    };

    if (!windowLoaded) {
      window.addEventListener('load', onWindowLoad, { once: true });
      cleanups.push(() => window.removeEventListener('load', onWindowLoad));
    }

    const settleTimer = setTimeout(() => {
      settleCheckDone = true;
      scanNode(document);
      tryFinish();
    }, 500);

    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryFinish();
    }, effectiveMinDuration);

    const maxTimer = setTimeout(() => {
      finish();
    }, maxDuration);

    return () => {
      isCancelled = true;
      clearTimeout(settleTimer);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [effectiveMinDuration, maxDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="stahiza-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0A192F] text-white flex flex-col items-center justify-center p-4 overflow-hidden select-none"
        >
          {/* AMBIENT BACKGROUND GLOW */}
          <div className="absolute w-96 h-96 rounded-full bg-[#800020]/20 blur-3xl pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* 3D DOTTED SPHERE CONTAINER WITH BADGE */}
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
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-amber-400/60"
              >
                <SchoolBadgeImg size={56} className="w-14 h-14 sm:w-16 sm:h-16" />
              </motion.div>
            </div>
          </div>

          {/* SMOOTH MEDIA READINESS PROGRESS */}
          <div className="mt-6 w-52 sm:w-64 space-y-2 text-center relative z-10">
            <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#800020] via-amber-400 to-amber-300"
                initial={{ width: '8%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-200/80">
              Loading Campus Media...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
