import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { Leader } from '../data/schoolData';

interface StaffMarqueeProps {
  staffList: Leader[];
}

export const StaffMarquee: React.FC<StaffMarqueeProps> = ({ staffList }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Animation and physics refs
  const xRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const canAutoScrollRef = useRef(true);
  const momentumVelocityRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const singleSetWidthRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  
  // Drag tracking refs
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const startOffsetRef = useRef(0);
  const isHorizontalGestureRef = useRef<boolean | null>(null);
  const recentVelocitiesRef = useRef<{ v: number; t: number }[]>([]);

  const [isDragging, setIsDragging] = useState(false);

  // Determine how many copies we need so that a single set is comfortably wide
  // and we have 4 identical repeated sets for seamless 360-degree looping.
  const baseList = staffList.length > 0 ? staffList : [];
  // Ensure we have at least 6 items per set
  const unitList = baseList.length >= 6 
    ? baseList 
    : [...baseList, ...baseList, ...baseList];
  
  // 4 identical sets for endless wrap-around
  const quadrupledList = [...unitList, ...unitList, ...unitList, ...unitList];

  // Measure single set width
  const updateMetrics = useCallback(() => {
    if (trackRef.current) {
      const totalWidth = trackRef.current.scrollWidth;
      const singleWidth = totalWidth / 4;
      singleSetWidthRef.current = singleWidth;
      
      // Initialize xRef to singleWidth so user can scroll backward immediately
      if (xRef.current === 0 && singleWidth > 0) {
        xRef.current = singleWidth;
        trackRef.current.style.transform = `translate3d(-${xRef.current}px, 0, 0)`;
      }
    }
  }, []);

  // Set up animation loop
  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseSpeed = prefersReducedMotion ? 0 : 0.8; // ~48px/sec

    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) / 16.67, 2.5); // normalized frame delta
      lastTimestamp = timestamp;

      const singleWidth = singleSetWidthRef.current;

      if (!isDraggingRef.current && trackRef.current) {
        // Apply momentum deceleration if active
        if (Math.abs(momentumVelocityRef.current) > 0.05) {
          xRef.current -= momentumVelocityRef.current * dt;
          momentumVelocityRef.current *= Math.pow(0.92, dt); // gentle friction
        } else {
          momentumVelocityRef.current = 0;
          // Normal auto-marquee glide
          if (!isHoveredRef.current && canAutoScrollRef.current) {
            xRef.current += baseSpeed * dt;
          }
        }

        // Seamless wrap-around logic
        if (singleWidth > 0) {
          if (xRef.current >= singleWidth * 2) {
            xRef.current -= singleWidth;
          } else if (xRef.current < singleWidth) {
            xRef.current += singleWidth;
          }
        }

        trackRef.current.style.transform = `translate3d(-${xRef.current}px, 0, 0)`;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [updateMetrics, quadrupledList.length]);

  // Pause and resume helper
  const scheduleAutoScrollResume = (delayMs = 2000) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    canAutoScrollRef.current = false;
    resumeTimerRef.current = setTimeout(() => {
      canAutoScrollRef.current = true;
    }, delayMs);
  };

  // Pointer event handlers (works seamlessly for mouse and mobile touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary pointer
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDragging(true);
    canAutoScrollRef.current = false;
    momentumVelocityRef.current = 0;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    startOffsetRef.current = xRef.current;
    isHorizontalGestureRef.current = null;
    recentVelocitiesRef.current = [];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    // Detect gesture direction on initial movement
    if (isHorizontalGestureRef.current === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX > 6 || absY > 6) {
        if (absX >= absY) {
          isHorizontalGestureRef.current = true;
          // Capture pointer for full drag tracking
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // Ignore capture failure on unsupported environments
          }
        } else {
          // It's a vertical scroll gesture, release dragging so page can scroll
          isHorizontalGestureRef.current = false;
          isDraggingRef.current = false;
          setIsDragging(false);
          scheduleAutoScrollResume(1000);
          return;
        }
      } else {
        return;
      }
    }

    if (!isHorizontalGestureRef.current) return;

    // Track velocity
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      const dx = currentX - lastXRef.current;
      const v = (dx / dt) * 16.67; // px per standard frame
      recentVelocitiesRef.current.push({ v, t: now });
      // Keep only last 100ms
      recentVelocitiesRef.current = recentVelocitiesRef.current.filter(item => now - item.t < 120);
      lastXRef.current = currentX;
      lastTimeRef.current = now;
    }

    // Update position
    const singleWidth = singleSetWidthRef.current;
    let nextOffset = startOffsetRef.current - deltaX;

    // Wrap immediately if dragged far
    if (singleWidth > 0) {
      while (nextOffset >= singleWidth * 2) {
        nextOffset -= singleWidth;
        startOffsetRef.current -= singleWidth;
      }
      while (nextOffset < singleWidth) {
        nextOffset += singleWidth;
        startOffsetRef.current += singleWidth;
      }
    }

    xRef.current = nextOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${nextOffset}px, 0, 0)`;
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    // Calculate release velocity for inertia
    if (isHorizontalGestureRef.current && recentVelocitiesRef.current.length > 0) {
      const avgV = recentVelocitiesRef.current.reduce((acc, cur) => acc + cur.v, 0) / recentVelocitiesRef.current.length;
      // Clamp momentum velocity
      momentumVelocityRef.current = Math.max(-28, Math.min(28, avgV));
    }

    // Resume auto-scrolling after user is done swiping
    scheduleAutoScrollResume(2200);
    isHorizontalGestureRef.current = null;
  };

  // Step buttons for manual nudge
  const handleNudge = (direction: 'left' | 'right') => {
    const cardStep = 224; // card width + gap
    canAutoScrollRef.current = false;
    momentumVelocityRef.current = direction === 'left' ? 14 : -14;
    scheduleAutoScrollResume(2500);
  };

  return (
    <div className="relative w-full overflow-hidden select-none group">
      {/* Subtle Controls & Touch Guidance Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Hand className="w-3.5 h-3.5 text-[#800020] animate-pulse" />
          <span className="font-medium text-slate-600">
            Swipe left or right to explore highlights
          </span>
        </div>
        
        {/* Navigation Step Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNudge('left')}
            aria-label="Previous items"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#800020] hover:text-white text-slate-700 flex items-center justify-center transition shadow-sm border border-slate-200 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNudge('right')}
            aria-label="Next items"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#800020] hover:text-white text-slate-700 flex items-center justify-center transition shadow-sm border border-slate-200 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Track Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        className={`relative w-full py-4 overflow-hidden touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Edge Gradient Shadows for subtle cinematic depth */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Floating Side Arrow Overlays on Desktop Hover */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNudge('left'); }}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 text-[#0A192F] items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#800020] hover:text-white transition duration-200 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNudge('right'); }}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 text-[#0A192F] items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#800020] hover:text-white transition duration-200 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Smooth Hardware-Accelerated Track */}
        <div
          ref={trackRef}
          className="flex gap-4 items-center will-change-transform"
          style={{ width: 'max-content' }}
        >
          {quadrupledList.map((staff, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center group/card shrink-0 w-52 select-none pointer-events-auto"
            >
              <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#0A192F] shadow-[0_0_20px_rgba(10,25,47,0.25)] group-hover/card:shadow-[0_0_30px_rgba(128,0,32,0.45)] bg-slate-100 relative group-hover/card:scale-105 active:scale-105 transition duration-300">
                <img 
                  src={staff.img} 
                  alt={staff.name} 
                  draggable={false}
                  className="w-full h-full object-cover object-top shadow-md pointer-events-none select-none"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#800020] text-white flex-col items-center justify-center p-2 text-center" 
                  style={{ display: 'none' }}
                >
                  <span className="text-2xl font-black font-['Montserrat']">
                    {staff.name.split(' ')[1]?.[0] || 'S'}
                  </span>
                </div>
              </div>
              
              {/* STAHIZA Ribbon Name Tag at Bottom */}
              <div className="mt-3 bg-[#0A192F] text-white py-1 px-4 rounded-full text-xs font-bold shadow-md border border-slate-700 text-center max-w-[200px] truncate group-hover/card:bg-[#800020] transition duration-200">
                {staff.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
