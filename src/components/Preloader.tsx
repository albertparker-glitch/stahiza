import React, { useEffect, useRef, useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import {
  getHeroPreloadImageUrls,
  getFacilityGalleryImageUrls,
  getCampusVideoPosterUrls
} from '../data/campusMediaManifest';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  duration?: number;
  minDuration?: number; // Minimum brand visibility duration (enforced >= 2000ms)
  maxDuration?: number; // Safety upper bound so unreachable remote assets never block entry
  dataHydrated?: boolean; // True once async Supabase hero/marquee/leader data settles
  heroVideoReady?: boolean; // True once HeroParallaxVideo reports buffered readiness
  dynamicHeroUrls?: string[]; // Live marquee/leader image URLs rendered on landing
  onComplete?: () => void;
}

interface MediaReadinessState {
  heroImagesReady: boolean;
  facilityGalleriesReady: boolean;
  campusPostersReady: boolean;
  domMediaReady: boolean;
  minTimeoutPassed: boolean;
  maxTimeoutPassed: boolean;
}

function preloadAndDecodeImageUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    if (!url) {
      resolve();
      return;
    }

    const img = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    // Per-asset guard so a single dead external URL cannot stall forever
    const perImageTimeout = window.setTimeout(finish, 8000);

    img.onload = () => {
      window.clearTimeout(perImageTimeout);
      if (typeof img.decode === 'function') {
        img.decode().catch(() => undefined).finally(finish);
      } else {
        finish();
      }
    };

    img.onerror = () => {
      window.clearTimeout(perImageTimeout);
      finish();
    };

    img.src = url;
    if (img.complete) {
      window.clearTimeout(perImageTimeout);
      if (typeof img.decode === 'function' && img.naturalWidth > 0) {
        img.decode().catch(() => undefined).finally(finish);
      } else {
        finish();
      }
    }
  });
}

function preloadBatch(
  urls: string[],
  onProgress: (completed: number, total: number) => void,
  isCancelled: () => boolean
): Promise<void> {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  const total = uniqueUrls.length;
  if (total === 0) {
    onProgress(1, 1);
    return Promise.resolve();
  }

  let completed = 0;
  onProgress(0, total);

  return Promise.all(
    uniqueUrls.map((url) =>
      preloadAndDecodeImageUrl(url).then(() => {
        if (isCancelled()) return;
        completed += 1;
        onProgress(completed, total);
      })
    )
  ).then(() => undefined);
}

export const Preloader: React.FC<PreloaderProps> = ({
  duration,
  minDuration = 2000,
  maxDuration = 15000,
  dataHydrated = true,
  heroVideoReady = false,
  dynamicHeroUrls = [],
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(8);

  const [readiness, setReadiness] = useState<MediaReadinessState>({
    heroImagesReady: false,
    facilityGalleriesReady: false,
    campusPostersReady: false,
    domMediaReady: false,
    minTimeoutPassed: false,
    maxTimeoutPassed: false
  });

  const [ratios, setRatios] = useState({
    hero: 0,
    facilities: 0,
    posters: 0,
    dom: 0
  });

  // Guarantee at least 2000ms brand visibility timeout
  const effectiveMinDuration = Math.max(2000, duration ?? minDuration);
  const dynamicHeroKey = dynamicHeroUrls.join('|');

  // Lock body scroll while overlay persists
  useEffect(() => {
    if (!isVisible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isVisible]);

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

    const numPoints = 260;
    const radius = 110;
    const points: Array<{ x: number; y: number; z: number; color: string; size: number }> = [];

    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      let color = '#FCD34D';
      if (i % 3 === 0) color = '#800020';
      if (i % 5 === 0) color = '#38BDF8';

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

  // 1. MINIMUM 2-SECOND TIMEOUT & MAXIMUM SAFETY TIMEOUT
  useEffect(() => {
    const minTimer = window.setTimeout(() => {
      setReadiness((prev) => ({ ...prev, minTimeoutPassed: true }));
    }, effectiveMinDuration);

    const maxTimer = window.setTimeout(() => {
      setReadiness((prev) => ({ ...prev, maxTimeoutPassed: true }));
    }, maxDuration);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, [effectiveMinDuration, maxDuration]);

  // 2. PRE-CACHE FACILITY GALLERIES & CAMPUS VIDEO POSTERS
  useEffect(() => {
    let cancelled = false;

    const facilityUrls = getFacilityGalleryImageUrls();
    const posterUrls = getCampusVideoPosterUrls();

    preloadBatch(
      facilityUrls,
      (done, total) => {
        if (cancelled) return;
        setRatios((prev) => ({ ...prev, facilities: done / Math.max(1, total) }));
      },
      () => cancelled
    ).then(() => {
      if (cancelled) return;
      setRatios((prev) => ({ ...prev, facilities: 1 }));
      setReadiness((prev) => ({ ...prev, facilityGalleriesReady: true }));
    });

    preloadBatch(
      posterUrls,
      (done, total) => {
        if (cancelled) return;
        setRatios((prev) => ({ ...prev, posters: done / Math.max(1, total) }));
      },
      () => cancelled
    ).then(() => {
      if (cancelled) return;
      setRatios((prev) => ({ ...prev, posters: 1 }));
      setReadiness((prev) => ({ ...prev, campusPostersReady: true }));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // 3. PRE-CACHE HERO IMAGES & DYNAMIC MARQUEE/LEADER IMAGES AFTER DATA HYDRATES
  useEffect(() => {
    if (!dataHydrated) return;
    let cancelled = false;

    const urls = getHeroPreloadImageUrls(dynamicHeroUrls);
    preloadBatch(
      urls,
      (done, total) => {
        if (cancelled) return;
        setRatios((prev) => ({ ...prev, hero: done / Math.max(1, total) }));
      },
      () => cancelled
    ).then(() => {
      if (cancelled) return;
      setRatios((prev) => ({ ...prev, hero: 1 }));
      setReadiness((prev) => ({ ...prev, heroImagesReady: true }));
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHydrated, dynamicHeroKey]);

  // 4. VERIFY ALL RENDERED DOM IMAGES, VIDEOS & VIDEO POSTERS ARE READY
  useEffect(() => {
    let cancelled = false;
    const tracked = new Set<Element>();
    const cleanups: Array<() => void> = [];

    let total = 0;
    let done = 0;
    let windowLoaded = document.readyState === 'complete';
    let initialSettled = false;

    const evaluateDomReady = () => {
      if (cancelled) return;
      const ratio = total > 0 ? done / total : 1;
      setRatios((prev) => ({ ...prev, dom: ratio }));
      if (windowLoaded && initialSettled && done >= total && heroVideoReady) {
        setReadiness((prev) => ({ ...prev, domMediaReady: true }));
      }
    };

    const markOneDone = () => {
      done += 1;
      evaluateDomReady();
    };

    const trackDomImage = (img: HTMLImageElement) => {
      if (tracked.has(img) || img.loading === 'lazy' || !img.getAttribute('src')) return;
      tracked.add(img);
      total += 1;
      evaluateDomReady();

      if (img.complete) {
        if (typeof img.decode === 'function' && img.naturalWidth > 0) {
          img.decode().catch(() => undefined).finally(markOneDone);
        } else {
          markOneDone();
        }
        return;
      }

      let settled = false;
      const onDone = () => {
        if (settled) return;
        settled = true;
        img.removeEventListener('load', onDone);
        img.removeEventListener('error', onDone);
        markOneDone();
      };
      img.addEventListener('load', onDone, { once: true });
      img.addEventListener('error', onDone, { once: true });
      cleanups.push(() => {
        img.removeEventListener('load', onDone);
        img.removeEventListener('error', onDone);
      });
    };

    const trackDomVideo = (video: HTMLVideoElement) => {
      if (tracked.has(video)) return;
      tracked.add(video);

      const targetReadyState = video.hasAttribute('data-hero-video') ? 3 : 2;
      const posterAttr = video.getAttribute('poster');
      const hasPoster = Boolean(posterAttr);
      total += hasPoster ? 2 : 1;
      evaluateDomReady();

      if (hasPoster && posterAttr) {
        preloadAndDecodeImageUrl(posterAttr).then(() => {
          if (!cancelled) markOneDone();
        });
      }

      if (video.readyState >= targetReadyState) {
        markOneDone();
        return;
      }

      let settled = false;
      const finishVideo = () => {
        if (settled) return;
        settled = true;
        cleanupVideo();
        markOneDone();
      };

      const checkReady = () => {
        if (video.readyState >= targetReadyState) {
          finishVideo();
        }
      };

      const sources = Array.from(video.querySelectorAll('source'));
      const lastSource = sources.length > 0 ? sources[sources.length - 1] : null;

      const cleanupVideo = () => {
        video.removeEventListener('loadeddata', checkReady);
        video.removeEventListener('canplay', finishVideo);
        video.removeEventListener('canplaythrough', finishVideo);
        video.removeEventListener('error', finishVideo);
        if (lastSource) {
          lastSource.removeEventListener('error', finishVideo);
        }
      };

      video.addEventListener('loadeddata', checkReady);
      video.addEventListener('canplay', finishVideo, { once: true });
      video.addEventListener('canplaythrough', finishVideo, { once: true });
      video.addEventListener('error', finishVideo, { once: true });
      if (lastSource) {
        lastSource.addEventListener('error', finishVideo, { once: true });
      }
      cleanups.push(cleanupVideo);
    };

    const scanDom = (root: ParentNode | Element) => {
      if (root instanceof HTMLImageElement) trackDomImage(root);
      else if (root instanceof HTMLVideoElement) trackDomVideo(root);

      if ('querySelectorAll' in root) {
        root.querySelectorAll('img').forEach(trackDomImage);
        root.querySelectorAll('video').forEach(trackDomVideo);
      }
    };

    scanDom(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) scanDom(node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onWindowLoad = () => {
      windowLoaded = true;
      scanDom(document);
      evaluateDomReady();
    };

    if (!windowLoaded) {
      window.addEventListener('load', onWindowLoad, { once: true });
      cleanups.push(() => window.removeEventListener('load', onWindowLoad));
    }

    const settleTimer = window.setTimeout(() => {
      initialSettled = true;
      scanDom(document);
      evaluateDomReady();
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(settleTimer);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [dataHydrated, heroVideoReady]);

  // 5. COMPUTE PROGRESS & DISMISS ONLY WHEN ALL STATES + MINIMUM 2s TIMEOUT ARE SATISFIED
  useEffect(() => {
    const weighted =
      ratios.hero * 28 +
      ratios.facilities * 26 +
      ratios.posters * 26 +
      ratios.dom * 20;
    setProgress((prev) => Math.max(prev, Math.min(98, Math.round(weighted))));
  }, [ratios]);

  useEffect(() => {
    if (!isVisible) return;

    const allMediaReady =
      readiness.heroImagesReady &&
      readiness.facilityGalleriesReady &&
      readiness.campusPostersReady &&
      readiness.domMediaReady;

    if ((allMediaReady || readiness.maxTimeoutPassed) && readiness.minTimeoutPassed) {
      setProgress(100);
      const exitTimer = window.setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 180);
      return () => window.clearTimeout(exitTimer);
    }
  }, [readiness, isVisible, onComplete]);

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
