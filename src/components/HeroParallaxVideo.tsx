import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { getSupabasePublicUrl, getSupabaseOthersUrl, getSupabaseVideosUrl } from '../lib/supabase';

export const HeroParallaxVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform: moving down relative to the parent creates the subtle slower-than-content scroll feel
  const y = useTransform(scrollYProgress, [0, 1], ['-2%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.92, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.08]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black max-h-[600px] leading-none block select-none"
    >
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : y,
          opacity: shouldReduceMotion ? 1 : opacity,
          scale: shouldReduceMotion ? 1 : scale,
        }}
        className="w-full h-full will-change-transform transform-gpu"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto max-h-[600px] object-cover sm:object-contain m-0 p-0 block pointer-events-none"
        >
          <source src={getSupabasePublicUrl('back.mp4')} type="video/mp4" />
          <source src={getSupabaseOthersUrl('back.mp4')} type="video/mp4" />
          <source src={getSupabaseVideosUrl('back.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
};
