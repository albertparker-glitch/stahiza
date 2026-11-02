import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  GraduationCap,
  Trophy,
  BookOpen,
  Users,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  ArrowRight,
  ChevronUp,
  Camera
} from 'lucide-react';
import { SchoolBadgeImg } from './components/SchoolBadgeImg';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { ContactSection } from './components/ContactSection';
import { VideoGallery } from './components/VideoGallery';
import { AcademicsVideos } from './components/AcademicsVideos';
import { SportsVideos } from './components/SportsVideos';
import { Leader, TopStudent, fetchLeaders, fetchMarqueeStaff, fetchTopStudents, SCHOOL_CONTACTS } from './data/schoolData';
import { getSupabasePublicUrl, getSupabaseOthersUrl } from './lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

const TYPEWRITER_PHRASES = [
  '"Education Is The Way"',
  '"Academic Excellence & Moral Discipline"',
  '"Home of National Sports Champions"',
  '"Nurturing Talents & Building Leaders"',
];

function TypewriterMotto() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = TYPEWRITER_PHRASES[phraseIdx % TYPEWRITER_PHRASES.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setPhraseIdx(prev => (prev + 1) % TYPEWRITER_PHRASES.length);
        timeout = setTimeout(() => {}, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIdx]);

  return (
    <span className="inline-flex items-center min-h-[1.75em]">
      <span>{text}</span>
      <span className="inline-block w-[3px] h-6 sm:h-7 bg-[#800020] ml-1.5 animate-pulse rounded-full" />
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'leadership' | 'academics' | 'sports' | 'campus' | 'contact'>('home');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [marqueeStaff, setMarqueeStaff] = useState<Leader[]>([]);
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [campusSection, setCampusSection] = useState<'all' | 'facilities' | 'clubs' | 'prefects' | 'teachers' | 'staff' | 'gallery'>('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent landing at the bottom
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Ensure initial scroll position stays at top even if dynamic content loads
    const timer1 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 50);
    const timer2 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 250);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Always reset window scroll position to top whenever active tab changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchLeaders().then(data => setLeaders(data));
    fetchMarqueeStaff().then(data => setMarqueeStaff(data));
    fetchTopStudents().then(data => setTopStudents(data));
  }, []);

  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (marqueeRef.current) {
      setStartX(e.pageX - marqueeRef.current.offsetLeft);
      setScrollLeft(marqueeRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (marqueeRef.current) {
      setStartX(e.touches[0].pageX - marqueeRef.current.offsetLeft);
      setScrollLeft(marqueeRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    const x = e.touches[0].pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    fetchLeaders().then(data => setLeaders(data));
    fetchMarqueeStaff().then(data => setMarqueeStaff(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-['Inter',sans-serif] selection:bg-[#800020] selection:text-white">
      
      {/* NAVBAR */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setApplyModalOpen={setApplyModalOpen} 
      />

      {/* MAIN CONTENT AREA */}
      <main>
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {activeTab === 'home' && (
          <div>
            {/* FULL BLEED 100% WIDTH VIDEO BANNER (Home page only) */}
            <div className="w-full m-0 p-0 bg-black overflow-hidden leading-none block">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto max-h-[600px] object-contain m-0 p-0 block pointer-events-none"
              >
                <source src={getSupabasePublicUrl('back.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* HERO SECTION */}
            <section className="relative py-12 sm:py-16 overflow-hidden bg-[#F5F2EB] border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="lg:col-span-7 space-y-6"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="inline-flex items-center gap-3 bg-[#800020]/10 border border-[#800020]/20 px-4 py-2 rounded-full text-[#800020] text-xs sm:text-sm font-semibold tracking-wide"
                  >
                    <SchoolBadgeImg size={22} className="w-5 h-5" />
                    <span>Official STAHIZA Administrative Portal</span>
                  </motion.div>
                  <h1 className="text-4xl sm:text-6xl font-black font-['Montserrat'] tracking-tight leading-tight">
                    <span className="text-[#800020]">S</span><span className="text-[#0A192F]">tandard</span>{' '}
                    <span className="text-[#800020]">H</span><span className="text-[#0A192F]">igh</span>{' '}
                    <span className="text-[#800020]">S</span><span className="text-[#0A192F]">chool</span>{' '}
                    <span className="text-[#0A192F]">-</span>{' '}
                    <span className="text-[#800020]">Z</span><span className="text-[#0A192F]">zana</span>
                  </h1>
                  <p className="text-xl sm:text-2xl font-semibold text-[#800020] italic font-serif min-h-[2rem] sm:min-h-[2.5rem] flex items-center">
                    <TypewriterMotto />
                  </p>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
                    Fostering academic excellence, moral discipline, and championship talent along Entebbe Road.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setApplyModalOpen(true)}
                      className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition flex items-center gap-3 text-base"
                    >
                      <SchoolBadgeImg size={22} className="w-5 h-5" />
                      <span>Apply For Admissions</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveTab('academics')}
                      className="bg-white hover:bg-stone-100 border border-stone-300 text-[#0A192F] font-semibold px-7 py-4 rounded-xl shadow-sm transition flex items-center gap-2 text-base"
                    >
                      <span>Explore Academics</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* HERO STATS / CREST EMBLEM CARD */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  className="lg:col-span-5 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl border border-stone-200 p-8 rounded-3xl shadow-xl space-y-6"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-4 bg-white rounded-2xl shadow-md border border-slate-200"
                  >
                    <SchoolBadgeImg size={100} className="w-28 h-28" />
                  </motion.div>
                  <div className="text-center space-y-2">
                    <div className="inline-block">
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] px-4 py-2 rounded-xl bg-[#0A192F]/10 border border-[#0A192F]/15">
                        <span className="text-[#800020]">S</span><span className="text-[#0A192F]">tandard</span>{' '}
                        <span className="text-[#800020]">H</span><span className="text-[#0A192F]">igh</span>{' '}
                        <span className="text-[#800020]">S</span><span className="text-[#0A192F]">chool</span>{' '}
                        <span className="text-[#0A192F]">-</span>{' '}
                        <span className="text-[#800020]">Z</span><span className="text-[#0A192F]">zana</span>
                      </h3>
                    </div>
                    <p className="text-xs text-[#800020] font-bold">{SCHOOL_CONTACTS.box}</p>
                    <p className="text-xs text-slate-600 font-medium">Office Desk: {SCHOOL_CONTACTS.phone1}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full pt-2">
                    <div className="bg-[#F5F2EB] p-4 rounded-xl text-center border border-stone-200">
                      <div className="text-2xl font-black text-[#800020] font-['Montserrat']">USSSA</div>
                      <div className="text-xs text-slate-700 font-medium mt-0.5">National Champions</div>
                    </div>
                    <div className="bg-[#F5F2EB] p-4 rounded-xl text-center border border-stone-200">
                      <div className="text-2xl font-black text-[#0A192F] font-['Montserrat']">100%</div>
                      <div className="text-xs text-slate-700 font-medium mt-0.5">UNEB Pass Rate</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* QUICK HIGHLIGHT TICKER / ANNOUNCEMENT BAR */}
            <div className="bg-[#800020] text-white py-3 px-4 shadow-inner">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-[#800020] font-bold px-2.5 py-0.5 rounded text-xs uppercase">Official Notice</span>
                  <span>2027 Admissions now open. Apply online or visit our Entebbe Road campus.</span>
                </div>
                <button 
                  onClick={() => setApplyModalOpen(true)}
                  className="underline underline-offset-4 font-bold hover:text-amber-200 text-xs sm:text-sm whitespace-nowrap"
                >
                  Secure Your Vacancy &rarr;
                </button>
              </div>
            </div>

            {/* CORE PILLARS */}
            <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto mb-16 space-y-4"
              >
                <div className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-full mb-2">
                  <SchoolBadgeImg size={36} className="w-9 h-9" />
                </div>
                <span className="text-[#800020] font-bold tracking-wider uppercase text-sm block">The STAHIZA Advantage</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                  Pillars of Excellence
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Three core pillars guiding student development and future success.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: BookOpen,
                    title: "Academics",
                    desc: "Rigorous UNEB drilling in Sciences and Arts for top grades and university placement.",
                  },
                  {
                    icon: Trophy,
                    title: "Sports",
                    desc: "Reigning USSSA champions in football, basketball, and athletics with professional training.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Discipline",
                    desc: "Instilling integrity, leadership, and moral discipline in every learner.",
                  },
                ].map((pillar, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: idx * 0.12, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 group flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-white/10 text-amber-300 border-white/20 group-hover:scale-110 transition duration-300">
                        <pillar.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-['Montserrat'] text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-sm font-semibold text-amber-300 group-hover:text-amber-200">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* STAFF MARQUEE SECTION UNDER PILLARS */}
            <section className="py-16 bg-white overflow-hidden border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 text-center space-y-2">
                <span className="text-[#800020] font-bold uppercase tracking-wider text-xs">_________</span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                  STAHIZA IN A BRIEF
                </h3>
              </div>

              <div 
                ref={marqueeRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative w-full overflow-x-auto scrollbar-none py-4 cursor-grab active:cursor-grabbing select-none"
              >
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 70s linear infinite;
                  }
                  .animate-marquee:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="animate-marquee flex gap-3 items-center">
                  {[...marqueeStaff, ...marqueeStaff, ...marqueeStaff].map((staff, idx) => (
                    <div key={idx} className="flex flex-col items-center group shrink-0 w-52">
                      <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#0A192F] shadow-[0_0_25px_rgba(10,25,47,0.35)] group-hover:shadow-[0_0_35px_rgba(128,0,32,0.5)] bg-slate-100 relative group-hover:scale-105 active:scale-105 transition duration-300">
                        <img 
                          src={staff.img} 
                          alt={staff.name} 
                          className="w-full h-full object-cover object-top shadow-md"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#800020] text-white flex-col items-center justify-center p-2 text-center" style={{ display: 'none' }}>
                          <span className="text-2xl font-black font-['Montserrat']">{staff.name.split(' ')[1]?.[0] || 'S'}</span>
                        </div>
                      </div>
                      {/* Blue Ribbon Name Tag at Bottom */}
                      <div className="mt-3 bg-[#0A192F] text-white py-1 px-4 rounded-full text-xs font-bold shadow-md border border-slate-700 text-center max-w-[200px] truncate">
                        {staff.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* HEADTEACHER WELCOME BANNER */}
            <section className="bg-slate-100 py-20 px-4 sm:px-8 border-y border-slate-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-5 relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#800020] to-[#0A192F] rounded-3xl opacity-25 blur-lg"></div>
                  <div className="relative bg-[#0A192F] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow">
                        <SchoolBadgeImg size={50} className="w-12 h-12" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg font-['Montserrat']">Administrative Office</h4>
                        <p className="text-xs text-amber-300">Standard High School, Zzana</p>
                      </div>
                    </div>
                    <blockquote className="italic font-serif text-lg leading-relaxed text-slate-200">
                      "At STAHIZA, every learner has unique potential. Through disciplined academics and mentorship, we mold champions for life."
                    </blockquote>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-7 space-y-6"
                >
                  <span className="text-[#800020] font-bold uppercase tracking-wider text-sm">Headteacher's Welcome</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                    Welcome to Standard High School Zzana
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Located along Entebbe Road, STAHIZA pairs comprehensive UNEB curriculum mastery in Sciences and Arts with national sports dominance. We provide a disciplined, secure environment where young minds flourish.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">100%</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Boarding Security</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#0A192F] font-['Montserrat']">50+</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Trophies & Awards</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center col-span-2 sm:col-span-1"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">Top 10</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">National Ranking</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* OFFICIAL ADMISSIONS DESK INQUIRY SECTION */}
            <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-[#0A192F] to-[#163c6c] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-amber-300 text-xs font-semibold">
                    <SchoolBadgeImg size={20} className="w-5 h-5" /> Official Admissions Desk
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat']">
                    Admissions, fees & subject combination guidance
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Our team is available Monday to Saturday at our Entebbe Road campus or via phone to guide your admissions.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setApplyModalOpen(true)}
                    className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    <SchoolBadgeImg size={22} className="w-5 h-5" />
                    <span>Apply Online Now</span>
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="tel:+256772831704"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Phone className="w-5 h-5 text-amber-300" />
                    <span>{SCHOOL_CONTACTS.phone1}</span>
                  </motion.a>
                </div>
              </motion.div>
            </section>
            
            {/* VIDEO GALLERY ON HOME PAGE */}
            <VideoGallery />
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Administration & Faculty</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                School Leadership
              </h2>
              <p className="text-slate-600 text-base">
                Experienced educators and administrators steering STAHIZA toward academic and moral excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition flex flex-col"
                >
                  <div className="relative w-full h-80 bg-slate-100 overflow-hidden">
                    <img 
                      src={leader.img} 
                      alt={leader.name} 
                      className="w-full h-full object-cover object-top shadow-xl transition-transform duration-500 hover:scale-105 active:scale-105 cursor-pointer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#800020] text-white flex-col items-center justify-center p-6 text-center" style={{ display: 'none' }}>
                      <span className="text-4xl font-black font-['Montserrat']">{leader.name.split(' ')[1]?.[0] || 'S'}</span>
                      <span className="text-xs text-amber-300 mt-2 font-semibold">{leader.name}</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg">
                      <SchoolBadgeImg size={34} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent flex items-end p-6">
                      <span className="bg-[#800020] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {leader.role}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">{leader.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">UNEB Curriculum</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Academic Programs & Top Achievers
              </h2>
              <p className="text-slate-600 text-base">
                Lower and upper secondary education designed for national exam distinctions and top university entry.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#800020] flex items-center justify-center">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <SchoolBadgeImg size={42} />
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">O-Level (Lower Secondary)</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Complete UNEB curriculum emphasizing sciences, mathematics, digital literacy, and continuous assessment.
                </p>
                <ul className="space-y-3 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Practical labs in Physics, Chemistry & Biology</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ICT training and digital research</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Targeted revision and distinction drilling</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0A192F] flex items-center justify-center">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <SchoolBadgeImg size={42} />
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">A-Level (Upper Secondary)</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Sciences and Arts combinations engineered for direct public and private university admissions.
                </p>
                <ul className="space-y-3 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sciences: PCM, BCM, PCB, PEM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Arts: HEG, MEG, HED combinations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sub-Math & General Paper coaching</li>
                </ul>
              </motion.div>
            </div>

            {/* A-LEVEL TOP 10 HIGH ACHIEVERS (MAROON BACKGROUND THEME) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#800020] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="bg-amber-300 text-[#800020] font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider inline-block">Upper Secondary Excellence</span>
                <h3 className="text-3xl sm:text-4xl font-black font-['Montserrat']">A-Level Top 10 High Achievers</h3>
                <p className="text-rose-100 text-sm max-w-xl mx-auto">Celebrating students with top points in their UNEB combinations.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {topStudents.filter(s => s.level === 'A-Level').map((student, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: (idx % 5) * 0.08 }}
                    whileHover={{ y: -5, scale: 1.04 }}
                    className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-rose-300/30 flex flex-col justify-between group transition duration-300"
                  >
                    <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                      <img 
                        src={student.img} 
                        alt={student.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#800020] to-[#0A192F] text-white flex-col items-center justify-center p-2 text-center" style={{ display: 'none' }}>
                        <span className="text-2xl font-black font-['Montserrat']">{student.name.split(' ')[1]?.[0] || 'S'}</span>
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-400 text-[#800020] font-black text-[10px] w-6 h-6 rounded-full flex items-center justify-center shadow">
                        #{idx + 1}
                      </div>
                    </div>
                    <div className="p-3 bg-white text-center space-y-1">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#0A192F] font-['Montserrat'] truncate">{student.name}</h4>
                      <div className="text-[10px] text-slate-500 font-semibold">{student.combinationOrStream}</div>
                      <div className="mt-1 bg-[#800020] text-amber-200 py-1 px-2 rounded-lg text-[10px] font-bold shadow-sm">
                        {student.pointsOrAs}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* O-LEVEL TOP 10 HIGH ACHIEVERS (NAVY BLUE BACKGROUND THEME) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="bg-amber-300 text-[#0A192F] font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider inline-block">Lower Secondary Excellence</span>
                <h3 className="text-3xl sm:text-4xl font-black font-['Montserrat']">O-Level Top 10 High Achievers</h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">Honoring outstanding candidates with exceptional distinctions.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {topStudents.filter(s => s.level === 'O-Level').map((student, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: (idx % 5) * 0.08 }}
                    whileHover={{ y: -5, scale: 1.04 }}
                    className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-blue-300/30 flex flex-col justify-between group transition duration-300"
                  >
                    <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                      <img 
                        src={student.img} 
                        alt={student.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#800020] text-white flex-col items-center justify-center p-2 text-center" style={{ display: 'none' }}>
                        <span className="text-2xl font-black font-['Montserrat']">{student.name.split(' ')[1]?.[0] || 'S'}</span>
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-400 text-[#0A192F] font-black text-[10px] w-6 h-6 rounded-full flex items-center justify-center shadow">
                        #{idx + 1}
                      </div>
                    </div>
                    <div className="p-3 bg-white text-center space-y-1">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#0A192F] font-['Montserrat'] truncate">{student.name}</h4>
                      <div className="text-[10px] text-slate-500 font-semibold">{student.combinationOrStream}</div>
                      <div className="mt-1 bg-[#0A192F] text-amber-300 py-1 px-2 rounded-lg text-[10px] font-bold shadow-sm">
                        {student.pointsOrAs}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ACADEMICS YOUTUBE VIDEOS HIGHLIGHTS */}
            <AcademicsVideos />

          </div>
        )}

        {activeTab === 'sports' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Champions of Uganda</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Sports & Talent Powerhouse
              </h2>
              <p className="text-slate-600 text-base">
                Nurturing sporting excellence and creative talent alongside academic rigour.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "USSSA Football Champions",
                  desc: "Historic victories in national football competitions, producing national team talent.",
                  stat: "National Champions"
                },
                {
                  title: "Basketball & Netball",
                  desc: "Championship dominance across Kampala district and national tournaments.",
                  stat: "District & National Winners"
                },
                {
                  title: "Music, Dance & Drama (MDD)",
                  desc: "Celebrating cultural heritage through traditional folklore, choir, and stage drama.",
                  stat: "Gold Medalists 2025"
                },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: idx * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4 hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <SchoolBadgeImg size={34} />
                    </div>
                    <span className="text-xs font-bold text-[#800020] bg-rose-50 px-3 py-1 rounded-full">{item.stat}</span>
                    <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A192F]">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SPORTS & TALENT YOUTUBE VIDEOS */}
            <SportsVideos />
          </div>
        )}

        {activeTab === 'campus' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Life at STAHIZA</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Campus Life & Directory
              </h2>
              <p className="text-slate-600 text-base">
                Explore campus facilities, student clubs, prefects cabinet, teachers, staff, and photo gallery.
              </p>
            </div>

            {/* CAMPUS SECTION DROPDOWN / FILTER SELECTOR */}
            <div id="campus-section-filter" className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-slate-200 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#800020]" />
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Filter Directory:</label>
              </div>
              <select
                value={campusSection}
                onChange={(e) => setCampusSection(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#0A192F] w-full sm:w-auto shadow-sm cursor-pointer"
              >
                <option value="all">All Sections (Full Overview)</option>
                <option value="facilities">Campus Facilities (Labs, Dorms, Library)</option>
                <option value="clubs">Clubs & Societies (Scrabble, MDD, Debate)</option>
                <option value="prefects">Prefects Cabinet & Student Leaders</option>
                <option value="teachers">Teachers & Administration</option>
                <option value="staff">Staff Members</option>
                <option value="gallery">Campus Photo Gallery</option>
              </select>
            </div>

            {/* FACILITIES SECTION */}
            {(campusSection === 'all' || campusSection === 'facilities') && (
              <div className="space-y-6 pt-2">
                {/* STICKY CATEGORY HEADER */}
                <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                        Campus Facilities
                      </h3>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        6 Specialized Learning & Boarding Environments
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('campus-section-filter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>Change Section</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "Modern Science Labs", 
                      desc: "Equipped Physics, Chemistry, and Biology laboratories for hands-on experiments and UNEB practical exams.",
                      tag: "Physics, Chem & Biology",
                      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
                      fallbackImg: "/pages/images/odeke.jpeg"
                    },
                    { 
                      title: "Computer Laboratory", 
                      desc: "High-speed internet workstations for ICT practicals, coding, and national examinations.",
                      tag: "ICT & Digital Research",
                      img: getSupabaseOthersUrl("complab.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "Comfortable Dormitories", 
                      desc: "Secure, warden-supervised boarding residences with running water and quiet study areas.",
                      tag: "Boarding & Resident Life",
                      img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
                      fallbackImg: "/pages/images/bena.jpeg"
                    },
                    { 
                      title: "Spacious Dining Hall", 
                      desc: "Nutritious, balanced meals prepared under strict culinary hygiene standards.",
                      tag: "Food & Nutrition Center",
                      img: getSupabaseOthersUrl("fnst.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "Sports Grounds & Courts", 
                      desc: "Full-size football pitch, basketball, and netball courts home to national champions.",
                      tag: "Football, Netball & Courts",
                      img: getSupabaseOthersUrl("hand.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "School Library & Resource Center", 
                      desc: "Curriculum textbooks, encyclopedias, past UNEB papers, and dedicated silent study zones.",
                      tag: "Quiet Study & Archives",
                      img: getSupabaseOthersUrl("dedication 2026 s4.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                    },
                  ].map((fac, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="relative w-full h-48 sm:h-52 bg-slate-100 overflow-hidden">
                        <img 
                          src={fac.img} 
                          alt={fac.title}
                          onError={(e) => {
                            if (fac.fallbackImg && (e.currentTarget.src !== fac.fallbackImg)) {
                              e.currentTarget.src = fac.fallbackImg;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-black/20 to-transparent" />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-md">
                          <SchoolBadgeImg size={24} />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-[#0A192F]/90 backdrop-blur-sm text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30 shadow-md">
                          {fac.tag}
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-bold text-lg font-['Montserrat'] text-[#0A192F] group-hover:text-[#800020] transition-colors">
                            {fac.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed mt-2">{fac.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5 text-[#800020] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> STAHIZA Standard
                          </span>
                          <span className="bg-slate-100 px-2.5 py-0.5 rounded-md font-mono text-[11px] text-slate-600">Facility</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CLUBS SECTION */}
            {(campusSection === 'all' || campusSection === 'clubs') && (
              <div className="space-y-6 pt-2">
                {/* STICKY CATEGORY HEADER */}
                <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#800020] text-amber-200 flex items-center justify-center font-bold shadow-sm">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                        Clubs & Societies
                      </h3>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Active Co-Curricular & Championship Teams
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('campus-section-filter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>Change Section</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "Scrabble & Board Games Club", 
                      desc: "National champions developing vocabulary, rapid calculation, and tournament strategy.",
                      tag: "National Champions",
                      img: getSupabaseOthersUrl("scrablle.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "Music, Dance & Drama (MDD)", 
                      desc: "Preserving culture through traditional dances, choral vocals, and theatrical performance.",
                      tag: "Gold Medalists 2025",
                      img: getSupabaseOthersUrl("mdd.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "Science, Tech & Coding Club", 
                      desc: "Software coding, robotics, circuit experiments, and science fair projects.",
                      tag: "Coding & Tech Champions",
                      img: getSupabaseOthersUrl("code.jpg"),
                      fallbackImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "Debate & Writers Society", 
                      desc: "Public speaking, analytical reasoning, and competitive national debate.",
                      tag: "National Debate Circuit",
                      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
                      fallbackImg: "/pages/images/odeke.jpeg"
                    },
                    { 
                      title: "Scouts, Guides & Fellowships", 
                      desc: "Character development, campcraft, volunteer service, and leadership discipline.",
                      tag: "Leadership & Discipline",
                      img: getSupabaseOthersUrl("mus.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                    },
                    { 
                      title: "Sports Academy & Girls FC", 
                      desc: "Elite training in football, athletics, and basketball with direct club pathways.",
                      tag: "USSSA Powerhouse",
                      img: getSupabaseOthersUrl("hand.jpeg"),
                      fallbackImg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
                    },
                  ].map((club, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="relative w-full h-48 sm:h-52 bg-slate-100 overflow-hidden">
                        <img 
                          src={club.img} 
                          alt={club.title}
                          onError={(e) => {
                            if (club.fallbackImg && (e.currentTarget.src !== club.fallbackImg)) {
                              e.currentTarget.src = club.fallbackImg;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-black/20 to-transparent" />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-md">
                          <SchoolBadgeImg size={24} />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-[#800020]/90 backdrop-blur-sm text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30 shadow-md">
                          {club.tag}
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-bold text-lg font-['Montserrat'] text-[#0A192F] group-hover:text-[#800020] transition-colors">
                            {club.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed mt-2">{club.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5 text-[#800020] font-semibold">
                            <Trophy className="w-3.5 h-3.5" /> STAHIZA Co-Curricular
                          </span>
                          <span className="bg-rose-50 text-[#800020] px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold">Club #{idx + 1}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* PREFECTS SECTION */}
            {(campusSection === 'all' || campusSection === 'prefects') && (
              <div className="space-y-6 pt-2">
                {/* STICKY CATEGORY HEADER */}
                <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                        Prefects Cabinet & Student Leadership
                      </h3>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Cabinet Executives & UNSA Representatives
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('campus-section-filter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>Change Section</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {leaders.filter(l => l.role.toLowerCase().includes('prefect') || l.role.toLowerCase().includes('cabinet') || l.role.toLowerCase().includes('unsa') || l.role.toLowerCase().includes('top')).map((pref, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition hover:-translate-y-1"
                    >
                      <div className="relative w-full h-72 bg-slate-100 overflow-hidden">
                        <img src={pref.img} alt={pref.name} className="w-full h-full object-cover object-top" />
                        <div className="absolute top-3 right-3 bg-white p-2 rounded-xl shadow"><SchoolBadgeImg size={24} /></div>
                        <div className="absolute bottom-3 left-3 bg-[#800020] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          {pref.role}
                        </div>
                      </div>
                      <div className="p-4 bg-white text-center">
                        <h4 className="font-extrabold text-base font-['Montserrat'] text-[#0A192F]">{pref.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* TEACHERS SECTION */}
            {(campusSection === 'all' || campusSection === 'teachers') && (
              <div className="space-y-6 pt-2">
                {/* STICKY CATEGORY HEADER */}
                <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                        Teachers & Administration
                      </h3>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Experienced Academic Faculty & Deans
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('campus-section-filter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>Change Section</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {leaders.map((teacher, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition hover:-translate-y-1"
                    >
                      <div className="relative w-full h-72 bg-slate-100 overflow-hidden">
                        <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover object-top" />
                        <div className="absolute top-3 right-3 bg-white p-2 rounded-xl shadow"><SchoolBadgeImg size={24} /></div>
                        <div className="absolute bottom-3 left-3 bg-[#0A192F] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          {teacher.role}
                        </div>
                      </div>
                      <div className="p-4 bg-white text-center">
                        <h4 className="font-extrabold text-base font-['Montserrat'] text-[#0A192F]">{teacher.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* STAFF SECTION */}
            {(campusSection === 'all' || campusSection === 'staff') && (
              <div className="space-y-6 pt-2">
                {/* STICKY CATEGORY HEADER */}
                <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#800020] text-white flex items-center justify-center font-bold shadow-sm">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                        Staff Members & Department Heads
                      </h3>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Dedicated Academic & Co-Curricular Team
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('campus-section-filter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>Change Section</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {marqueeStaff.map((st, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (idx % 4) * 0.08, ease: "easeOut" }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition hover:-translate-y-1"
                    >
                      <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                        <img src={st.img} alt={st.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="p-3 bg-white text-center">
                        <h4 className="font-bold text-xs sm:text-sm text-[#0A192F] truncate">{st.name}</h4>
                        <span className="text-[10px] text-slate-500">{st.role}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY SECTION */}
            {(campusSection === 'all' || campusSection === 'gallery') && (
              <div className="space-y-6 pt-2">
                {/* STICKY CATEGORY HEADER */}
                <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                        Campus Photo Gallery
                      </h3>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Moments of Excellence & Boarding Life
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('campus-section-filter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#800020] hover:text-[#600018] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>Change Section</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[...marqueeStaff, ...leaders].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (idx % 4) * 0.08, ease: "easeOut" }}
                      className="rounded-2xl overflow-hidden shadow border border-slate-200 group h-48 bg-slate-100 hover:shadow-lg transition"
                    >
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
        </motion.div>
      </main>

      {/* FOOTER */}
      <Footer 
        setActiveTab={setActiveTab} 
        setApplyModalOpen={setApplyModalOpen} 
      />

      {/* ADMISSIONS APPLICATION MODAL */}
      <ApplyModal 
        isOpen={applyModalOpen} 
        onClose={() => setApplyModalOpen(false)} 
      />

      {/* FLOATING BACK TO TOP BUTTON (ALL PAGES) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 rounded-full bg-[#800020] hover:bg-[#600018] text-white shadow-2xl border-2 border-amber-300/80 flex items-center justify-center group hover:scale-110 active:scale-95 transition transform"
          >
            <ChevronUp className="w-5 h-5 text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
            <span className="sr-only">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
