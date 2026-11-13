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
  ChevronLeft,
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Briefcase,
  Search,
  Camera,
  X,
  Maximize2,
  Target,
  Eye,
  Compass
} from 'lucide-react';
import { SchoolBadgeImg } from './components/SchoolBadgeImg';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { ContactSection } from './components/ContactSection';
import { VideoGallery } from './components/VideoGallery';
import { AcademicsVideos } from './components/AcademicsVideos';
import { SportsVideos } from './components/SportsVideos';
import { CampusLifeVideos } from './components/CampusLifeVideos';
import { AnimatedCounter } from './components/AnimatedCounter';
import { FloatingAdmissionsWidget } from './components/FloatingAdmissionsWidget';
import { AdmissionsFaq } from './components/AdmissionsFaq';
import { SectionDivider } from './components/SectionDivider';
import { AdmissionFormSection } from './components/AdmissionFormSection';
import { Preloader } from './components/Preloader';
import { HeroParallaxVideo } from './components/HeroParallaxVideo';
import { Leader, fetchLeaders, fetchMarqueeStaff, SCHOOL_CONTACTS } from './data/schoolData';
import {
  ALevelCombination,
  ALL_ARTS_COMBINATIONS,
  POPULAR_ARTS_COMBINATIONS,
  OTHER_ARTS_COMBINATIONS,
  ALL_SCIENCE_COMBINATIONS,
  SCIENCE_COMBINATION_GROUPS,
  getCombinationGuidance,
} from './data/aLevelCombinations';
import {
  O_LEVEL_SUBJECTS,
  O_LEVEL_CORE_SUBJECTS,
  O_LEVEL_ELECTIVE_SUBJECTS,
} from './data/oLevelSubjects';
import { useTheme } from './context/ThemeContext';
import { getSupabaseOthersUrl } from './lib/supabase';
import { CAMPUS_FACILITIES, CampusFacility, FacilityPhoto } from './data/campusMediaManifest';
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

export type { FacilityPhoto, CampusFacility };
export { CAMPUS_FACILITIES };

const dropdownContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.01,
    },
  },
};

const dropdownItemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
};

export default function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'home' | 'governance' | 'academics' | 'sports' | 'campus' | 'admissions' | 'contact'>('home');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [marqueeStaff, setMarqueeStaff] = useState<Leader[]>([]);
  const [leadersLoaded, setLeadersLoaded] = useState(false);
  const [marqueeLoaded, setMarqueeLoaded] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [campusSection, setCampusSection] = useState<'all' | 'facilities' | 'clubs' | 'prefects' | 'teachers' | 'videos' | 'gallery'>('all');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [applySuccessAnimation, setApplySuccessAnimation] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<CampusFacility | null>(null);
  const [activeFacilityPhotoIdx, setActiveFacilityPhotoIdx] = useState(0);
  const [selectedArtsComboCode, setSelectedArtsComboCode] = useState<string>(POPULAR_ARTS_COMBINATIONS[0]?.code || 'HEG');
  const [selectedScienceComboCode, setSelectedScienceComboCode] = useState<string>(SCIENCE_COMBINATION_GROUPS.physics[0]?.code || 'PCM');
  const [selectedOLevelSubjectCode, setSelectedOLevelSubjectCode] = useState<string>(O_LEVEL_SUBJECTS[0]?.code || 'ENG');
  const [openComboDropdown, setOpenComboDropdown] = useState<'arts' | 'sciences' | 'olevel' | null>(null);
  const [artsSearchQuery, setArtsSearchQuery] = useState('');
  const [oLevelSearchQuery, setOLevelSearchQuery] = useState('');
  const [activeCombinationModal, setActiveCombinationModal] = useState<ALevelCombination | null>(null);

  const artsDropdownRef = React.useRef<HTMLDivElement>(null);
  const sciencesDropdownRef = React.useRef<HTMLDivElement>(null);
  const oLevelDropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedArtsCombo =
    ALL_ARTS_COMBINATIONS.find((combo) => combo.code === selectedArtsComboCode) || ALL_ARTS_COMBINATIONS[0];
  const selectedScienceCombo =
    ALL_SCIENCE_COMBINATIONS.find((combo) => combo.code === selectedScienceComboCode) || ALL_SCIENCE_COMBINATIONS[0];
  const selectedOLevelSubject =
    O_LEVEL_SUBJECTS.find((subj) => subj.code === selectedOLevelSubjectCode) || O_LEVEL_SUBJECTS[0];

  const handleSelectCombination = (combo: ALevelCombination, stream: 'arts' | 'sciences') => {
    if (stream === 'arts') {
      setSelectedArtsComboCode(combo.code);
    } else {
      setSelectedScienceComboCode(combo.code);
    }
    setOpenComboDropdown(null);
    setActiveCombinationModal(combo);
  };

  useEffect(() => {
    if (!openComboDropdown) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (openComboDropdown === 'arts' && artsDropdownRef.current && !artsDropdownRef.current.contains(target)) {
        setOpenComboDropdown(null);
      }
      if (openComboDropdown === 'sciences' && sciencesDropdownRef.current && !sciencesDropdownRef.current.contains(target)) {
        setOpenComboDropdown(null);
      }
      if (openComboDropdown === 'olevel' && oLevelDropdownRef.current && !oLevelDropdownRef.current.contains(target)) {
        setOpenComboDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [openComboDropdown]);

  useEffect(() => {
    if (!activeCombinationModal && !openComboDropdown) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeCombinationModal) {
          setActiveCombinationModal(null);
        } else if (openComboDropdown) {
          setOpenComboDropdown(null);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeCombinationModal, openComboDropdown]);

  const openFacilityModal = (fac: CampusFacility) => {
    setSelectedFacility(fac);
    setActiveFacilityPhotoIdx(0);
  };

  useEffect(() => {
    if (!selectedFacility) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFacility(null);
      } else if (e.key === 'ArrowRight') {
        setActiveFacilityPhotoIdx((prev) => (prev + 1) % selectedFacility.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveFacilityPhotoIdx((prev) => (prev - 1 + selectedFacility.gallery.length) % selectedFacility.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFacility]);

  const handleHeroApplyClick = () => {
    setApplySuccessAnimation(true);
    setTimeout(() => {
      setApplyModalOpen(true);
    }, 450);
    setTimeout(() => {
      setApplySuccessAnimation(false);
    }, 1800);
  };

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
    fetchLeaders()
      .then((data) => setLeaders(data))
      .finally(() => setLeadersLoaded(true));
    fetchMarqueeStaff()
      .then((data) => setMarqueeStaff(data))
      .finally(() => setMarqueeLoaded(true));
  }, []);

  const dynamicHeroUrls = React.useMemo(
    () => [...marqueeStaff.map((s) => s.img), ...leaders.map((l) => l.img)],
    [marqueeStaff, leaders]
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 font-['Inter',sans-serif] selection:bg-[#800020] selection:text-white ${
      isDark ? 'bg-[#060E1A] text-slate-100 dark' : 'bg-[#F8FAFC] text-slate-800'
    }`}>
      
      {/* STATE-BASED MEDIA PRELOADER (MINIMUM 2s FOR BRAND VISIBILITY) */}
      <Preloader
        minDuration={2000}
        maxDuration={15000}
        dataHydrated={leadersLoaded && marqueeLoaded}
        heroVideoReady={heroVideoReady}
        dynamicHeroUrls={dynamicHeroUrls}
      />

      {/* NAVBAR */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setApplyModalOpen={setApplyModalOpen} 
      />

      {/* MAIN CONTENT AREA */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
          {activeTab === 'home' && (
          <div>
            {/* FULL BLEED 100% WIDTH VIDEO BANNER WITH PARALLAX (Home page only) */}
            <HeroParallaxVideo onReady={() => setHeroVideoReady(true)} />

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
                  <h1 className="text-4xl sm:text-6xl font-black font-['Montserrat'] tracking-tight leading-tight text-[#0A192F]">
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
                    Fostering academic excellence, moral discipline, and championship talent.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <motion.button
                      layout
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleHeroApplyClick}
                      transition={{ layout: { duration: 0.35, type: "spring", stiffness: 400, damping: 28 } }}
                      className={`font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-colors duration-300 flex items-center gap-3 text-base cursor-pointer overflow-hidden ${
                        applySuccessAnimation 
                          ? 'bg-emerald-700 text-white shadow-emerald-900/30' 
                          : 'bg-[#800020] hover:bg-[#600018] text-white'
                      }`}
                    >
                      <motion.div layout className="shrink-0">
                        <SchoolBadgeImg size={22} className="w-5 h-5" />
                      </motion.div>
                      
                      <motion.span layout="position" className="whitespace-nowrap">
                        {applySuccessAnimation ? 'Opening Admissions...' : 'Apply For Admissions'}
                      </motion.span>

                      <AnimatePresence mode="wait">
                        {applySuccessAnimation ? (
                          <motion.span
                            key="checkmark-icon"
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1.15, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 22 }}
                            className="text-amber-300 shrink-0"
                          >
                            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="arrow-icon"
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 6 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
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
                  className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0A192F] text-white border border-slate-700/80 p-8 rounded-3xl shadow-2xl space-y-6"
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
                      <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] px-4 py-2 rounded-xl bg-white/95 border border-white/30 shadow-sm">
                        <span className="text-[#800020]">S</span><span className="text-[#0A192F]">tandard</span>{' '}
                        <span className="text-[#800020]">H</span><span className="text-[#0A192F]">igh</span>{' '}
                        <span className="text-[#800020]">S</span><span className="text-[#0A192F]">chool</span>{' '}
                        <span className="text-[#0A192F]">-</span>{' '}
                        <span className="text-[#800020]">Z</span><span className="text-[#0A192F]">zana</span>
                      </h3>
                    </div>
                    <p className="text-xs text-amber-300 font-bold">{SCHOOL_CONTACTS.box}</p>
                    <p className="text-xs text-slate-300 font-medium">Office Desk: {SCHOOL_CONTACTS.phone1}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full pt-2">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center border border-white/15">
                      <div className="text-2xl font-black text-amber-300 font-['Montserrat']">USSSA</div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">National Champions</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center border border-white/15">
                      <div className="text-2xl font-black text-rose-300 font-['Montserrat']">
                        <AnimatedCounter target={100} suffix="%" />
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">UNEB Pass Rate</div>
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

            <SectionDivider variant="crest" />

            {/* CORE PILLARS */}
            <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
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
                    desc: "Instilling integrity, governance, and moral discipline in every learner.",
                  },
                ].map((pillar, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, scale: 1.015 }}
                    onClick={() => {
                      if (pillar.title === 'Academics') setActiveTab('academics');
                      else if (pillar.title === 'Sports') setActiveTab('sports');
                      else setActiveTab('campus');
                    }}
                    className="bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700/80 group flex flex-col justify-between cursor-pointer"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-white/10 text-amber-300 border-white/20 group-hover:scale-110 group-hover:bg-white/15 transition-transform duration-300 ease-out">
                        <pillar.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-['Montserrat'] text-white group-hover:text-amber-200 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-sm font-semibold text-amber-300 group-hover:text-amber-200">
                      <span>Explore {pillar.title}</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <SectionDivider variant="gold" />

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

            <SectionDivider variant="crest" />

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
                      whileHover={{ scale: 1.04, y: -4 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-200 text-center transition-shadow"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">
                        <AnimatedCounter target={100} suffix="%" />
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Boarding Security</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.04, y: -4 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-200 text-center transition-shadow"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#0A192F] font-['Montserrat']">
                        <AnimatedCounter target={50} suffix="+" />
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Trophies & Awards</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.04, y: -4 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-200 text-center col-span-2 sm:col-span-1 transition-shadow"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">
                        Among <AnimatedCounter target={40} />
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-1">National Ranking</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            <SectionDivider variant="gold" />

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

            <SectionDivider variant="crest" />

            {/* ADMISSIONS FAQ ACCORDION COMPONENT */}
            <AdmissionsFaq 
              onApplyClick={() => setApplyModalOpen(true)}
              onContactClick={() => setActiveTab('contact')}
            />

            <SectionDivider variant="gold" />
            
            {/* VIDEO GALLERY ON HOME PAGE */}
            <VideoGallery />
          </div>
        )}

        {activeTab === 'governance' && (
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
                School Governance
              </h2>
              <p className="text-slate-600 text-base">
                Experienced educators and administrators steering STAHIZA toward academic and moral excellence.
              </p>
            </motion.div>

            {/* MISSION & VISION FLOATING NAVY BLUE CONTAINERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ y: -12, scale: 1.015 }}
                className="relative overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#071426] text-white rounded-3xl p-8 sm:p-10 shadow-[0_22px_50px_rgba(10,25,47,0.38)] border border-amber-300/20 flex flex-col justify-between space-y-5"
              >
                {/* Smooth fluid ambient flow layer */}
                <motion.div
                  aria-hidden="true"
                  animate={{
                    x: ['-20%', '20%', '-20%'],
                    y: ['-10%', '15%', '-10%'],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tr from-[#800020]/30 via-amber-400/15 to-sky-400/20 blur-3xl"
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center shadow-inner shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold font-['Montserrat'] text-white tracking-tight">
                      Mission
                    </h3>
                  </div>
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                    To provide affordable and quality education that produce disciplined, academically sound and successful citizens.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.1 },
                  y: { duration: 6.2, delay: 0.9, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ y: -12, scale: 1.015 }}
                className="relative overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#102E52] to-[#071426] text-white rounded-3xl p-8 sm:p-10 shadow-[0_22px_50px_rgba(10,25,47,0.38)] border border-amber-300/20 flex flex-col justify-between space-y-5"
              >
                {/* Smooth fluid ambient flow layer */}
                <motion.div
                  aria-hidden="true"
                  animate={{
                    x: ['20%', '-20%', '20%'],
                    y: ['15%', '-10%', '15%'],
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-sky-400/20 via-amber-400/15 to-[#800020]/30 blur-3xl"
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center shadow-inner shrink-0">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold font-['Montserrat'] text-white tracking-tight">
                      Vision
                    </h3>
                  </div>
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                    To be the first choice for secondary education in the communities we serve and beyond.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* BIG CORE VALUES MARQUEE CONTAINER */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0F2747] to-[#081529] text-white rounded-3xl p-6 sm:p-8 shadow-[0_22px_55px_rgba(10,25,47,0.35)] border border-slate-700/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-['Montserrat'] text-white">
                      Core Values
                    </h3>
                    <p className="text-xs text-amber-300/90 font-medium">
                      Principles guiding every decision and action at STAHIZA
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden py-2">
                <style>{`
                  @keyframes coreValuesMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-core-values-marquee {
                    display: flex;
                    width: max-content;
                    animation: coreValuesMarquee 36s linear infinite;
                  }
                  .animate-core-values-marquee:hover {
                    animation-play-state: paused;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .animate-core-values-marquee {
                      animation: none;
                      flex-wrap: wrap;
                      width: 100%;
                    }
                  }
                `}</style>
                <div className="animate-core-values-marquee gap-5 items-stretch">
                  {[
                    ...[
                      {
                        num: '1',
                        title: 'Integrity',
                        desc: 'Our decisions and actions reflect honesty, fairness, trust and respect for all.',
                      },
                      {
                        num: '2',
                        title: 'Excellence',
                        desc: 'Our decisions and actions reflect our commitment to accountability, innovation and learning.',
                      },
                      {
                        num: '3',
                        title: 'Openness',
                        desc: 'Our decisions and actions reflect open minded transparent dialogue.',
                      },
                      {
                        num: '4',
                        title: 'Services',
                        desc: 'Our decisions and actions reflect our commitment to deliver curriculum support services and extra curricular activities in an appropriate timely manner.',
                      },
                    ],
                    ...[
                      {
                        num: '1',
                        title: 'Integrity',
                        desc: 'Our decisions and actions reflect honesty, fairness, trust and respect for all.',
                      },
                      {
                        num: '2',
                        title: 'Excellence',
                        desc: 'Our decisions and actions reflect our commitment to accountability, innovation and learning.',
                      },
                      {
                        num: '3',
                        title: 'Openness',
                        desc: 'Our decisions and actions reflect open minded transparent dialogue.',
                      },
                      {
                        num: '4',
                        title: 'Services',
                        desc: 'Our decisions and actions reflect our commitment to deliver curriculum support services and extra curricular activities in an appropriate timely manner.',
                      },
                    ],
                  ].map((val, idx) => (
                    <div
                      key={idx}
                      className="w-72 sm:w-80 shrink-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-3 hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-400 text-[#0A192F] font-black font-mono text-sm flex items-center justify-center shrink-0">
                          {val.num}
                        </span>
                        <h4 className="text-lg font-extrabold font-['Montserrat'] text-amber-300">
                          {val.num}. {val.title}
                        </h4>
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
                Academic Programs & Curriculum
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
                className={`bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6 relative ${openComboDropdown === 'olevel' ? 'z-20' : 'z-0'}`}
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

                {/* O-LEVEL SUBJECTS DROPDOWN */}
                <div ref={oLevelDropdownRef} className={`bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 relative ${openComboDropdown === 'olevel' ? 'z-30' : 'z-10'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">
                      Subjects Taught ({O_LEVEL_SUBJECTS.length})
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">S.1 – S.4 UNEB Curriculum</span>
                  </div>

                  <div className="relative">
                    {(() => {
                      const SelectedOLevelIcon = selectedOLevelSubject.icon;
                      return (
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={openComboDropdown === 'olevel'}
                          onClick={() => setOpenComboDropdown((prev) => (prev === 'olevel' ? null : 'olevel'))}
                          className="w-full bg-white border border-slate-300 rounded-xl pl-3.5 pr-10 py-2.5 text-left text-sm font-semibold text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#800020]/30 focus:border-[#800020] cursor-pointer flex items-center gap-2.5 transition"
                        >
                          <SelectedOLevelIcon className="w-4 h-4 text-[#800020] shrink-0" />
                          <span className="truncate">
                            {selectedOLevelSubject.name} ({selectedOLevelSubject.category})
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                              openComboDropdown === 'olevel' ? 'rotate-180 text-[#800020]' : ''
                            }`}
                          />
                        </button>
                      );
                    })()}

                    <AnimatePresence>
                      {openComboDropdown === 'olevel' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.16 }}
                          role="listbox"
                          aria-label="O-Level Subjects"
                          className="absolute left-0 right-0 mt-2 z-30 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                        >
                          <div className="p-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <input
                              type="text"
                              value={oLevelSearchQuery}
                              onChange={(e) => setOLevelSearchQuery(e.target.value)}
                              placeholder="Search O-Level subject (e.g. Physics, ICT, French)..."
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#800020]"
                            />
                          </div>
                          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                            {(() => {
                              const query = oLevelSearchQuery.trim().toLowerCase();
                              const matchSubject = (s: typeof O_LEVEL_SUBJECTS[number]) =>
                                !query ||
                                s.name.toLowerCase().includes(query) ||
                                s.code.toLowerCase().includes(query);

                              const coreFiltered = O_LEVEL_CORE_SUBJECTS.filter(matchSubject);
                              const electiveFiltered = O_LEVEL_ELECTIVE_SUBJECTS.filter(matchSubject);

                              if (coreFiltered.length === 0 && electiveFiltered.length === 0) {
                                return (
                                  <div className="px-4 py-6 text-center text-xs text-slate-500">
                                    No O-Level subjects match "{oLevelSearchQuery}".
                                  </div>
                                );
                              }

                              return (
                                <>
                                  {coreFiltered.length > 0 && (
                                    <div className="py-1">
                                      <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#800020] bg-rose-50/70">
                                        Compulsory Core Subjects
                                      </div>
                                      {coreFiltered.map((subj, idx) => {
                                        const isActive = subj.code === selectedOLevelSubjectCode;
                                        const SubjectIcon = subj.icon;
                                        return (
                                          <motion.button
                                            type="button"
                                            key={subj.code}
                                            role="option"
                                            aria-selected={isActive}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.16, delay: Math.min(idx, 12) * 0.025, ease: 'easeOut' }}
                                            onClick={() => {
                                              setSelectedOLevelSubjectCode(subj.code);
                                              setOpenComboDropdown(null);
                                            }}
                                            className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                                              isActive
                                                ? 'bg-rose-50 text-[#800020] font-bold'
                                                : 'text-[#0A192F] hover:bg-slate-50 font-medium'
                                            }`}
                                          >
                                            <span className="flex items-center gap-2.5 min-w-0">
                                              <span
                                                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                                  isActive
                                                    ? 'bg-[#800020]/15 text-[#800020]'
                                                    : 'bg-rose-50 text-[#800020]'
                                                }`}
                                              >
                                                <SubjectIcon className="w-3.5 h-3.5" />
                                              </span>
                                              <span className="truncate">{subj.name}</span>
                                            </span>
                                            <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                                              Core
                                            </span>
                                          </motion.button>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {electiveFiltered.length > 0 && (
                                    <div className="py-1">
                                      <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0A192F] bg-blue-50/70">
                                        Elective, Vocational & Language Subjects
                                      </div>
                                      {electiveFiltered.map((subj, idx) => {
                                        const isActive = subj.code === selectedOLevelSubjectCode;
                                        const SubjectIcon = subj.icon;
                                        const staggerIndex = coreFiltered.length + idx;
                                        return (
                                          <motion.button
                                            type="button"
                                            key={subj.code}
                                            role="option"
                                            aria-selected={isActive}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.16, delay: Math.min(staggerIndex, 14) * 0.025, ease: 'easeOut' }}
                                            onClick={() => {
                                              setSelectedOLevelSubjectCode(subj.code);
                                              setOpenComboDropdown(null);
                                            }}
                                            className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                                              isActive
                                                ? 'bg-rose-50 text-[#800020] font-bold'
                                                : 'text-[#0A192F] hover:bg-slate-50 font-medium'
                                            }`}
                                          >
                                            <span className="flex items-center gap-2.5 min-w-0">
                                              <span
                                                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                                  isActive
                                                    ? 'bg-[#800020]/15 text-[#800020]'
                                                    : 'bg-blue-50 text-[#0A192F]'
                                                }`}
                                              >
                                                <SubjectIcon className="w-3.5 h-3.5" />
                                              </span>
                                              <span className="truncate">{subj.name}</span>
                                            </span>
                                            <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                                              Elective
                                            </span>
                                          </motion.button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {selectedOLevelSubject && (() => {
                    const SelectedSummaryIcon = selectedOLevelSubject.icon;
                    return (
                      <div className="text-xs text-slate-600 flex items-start gap-2.5 pt-0.5">
                        <div className="w-7 h-7 rounded-lg bg-[#800020]/10 text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                          <SelectedSummaryIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div>
                            <span className="font-bold text-[#0A192F]">{selectedOLevelSubject.name}:</span>{' '}
                            {selectedOLevelSubject.focus}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Assessment: {selectedOLevelSubject.assessment}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

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
                className={`bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6 relative ${openComboDropdown ? 'z-20' : 'z-0'}`}
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

                <div className="space-y-5 pt-1">
                  {/* ARTS COMBINATIONS DROPDOWN */}
                  <div ref={artsDropdownRef} className={`bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 relative ${openComboDropdown === 'arts' ? 'z-30' : 'z-10'}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">
                        Arts Combinations ({ALL_ARTS_COMBINATIONS.length})
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">Click any combo for career info</span>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={openComboDropdown === 'arts'}
                        onClick={() => setOpenComboDropdown((prev) => (prev === 'arts' ? null : 'arts'))}
                        className="w-full bg-white border border-slate-300 rounded-xl pl-3.5 pr-10 py-2.5 text-left text-sm font-semibold text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#800020]/30 focus:border-[#800020] cursor-pointer flex items-center justify-between transition"
                      >
                        <span className="truncate">
                          {selectedArtsCombo.code} — {selectedArtsCombo.subjects.join(', ')}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                            openComboDropdown === 'arts' ? 'rotate-180 text-[#800020]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openComboDropdown === 'arts' && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.16 }}
                            role="listbox"
                            aria-label="Arts Combinations"
                            className="absolute left-0 right-0 mt-2 z-30 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                          >
                            <div className="p-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <input
                                type="text"
                                value={artsSearchQuery}
                                onChange={(e) => setArtsSearchQuery(e.target.value)}
                                placeholder="Filter by subject or code (e.g. French, Art, HEG)..."
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#800020]"
                              />
                            </div>
                            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                              {(() => {
                                const query = artsSearchQuery.trim().toLowerCase();
                                const filterCombo = (c: ALevelCombination) =>
                                  !query ||
                                  c.code.toLowerCase().includes(query) ||
                                  c.subjects.some((s) => s.toLowerCase().includes(query));

                                const popularFiltered = POPULAR_ARTS_COMBINATIONS.filter(filterCombo);
                                const otherFiltered = OTHER_ARTS_COMBINATIONS.filter(filterCombo);

                                if (popularFiltered.length === 0 && otherFiltered.length === 0) {
                                  return (
                                    <div className="px-4 py-6 text-center text-xs text-slate-500">
                                      No Arts combinations match "{artsSearchQuery}".
                                    </div>
                                  );
                                }

                                return (
                                  <>
                                    {popularFiltered.length > 0 && (
                                      <div className="py-1">
                                        <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#800020] bg-rose-50/70">
                                          Popular UNEB Arts Combinations
                                        </div>
                                        {popularFiltered.map((combo, idx) => {
                                          const isActive = combo.code === selectedArtsComboCode;
                                          return (
                                            <motion.button
                                              type="button"
                                              key={combo.code}
                                              role="option"
                                              aria-selected={isActive}
                                              initial={{ opacity: 0, x: -8 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ duration: 0.16, delay: Math.min(idx, 12) * 0.025, ease: 'easeOut' }}
                                              onClick={() => handleSelectCombination(combo, 'arts')}
                                              className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                                                isActive
                                                  ? 'bg-rose-50 text-[#800020] font-bold'
                                                  : 'text-[#0A192F] hover:bg-slate-50 font-medium'
                                              }`}
                                            >
                                              <span className="truncate">
                                                <span className="font-bold">{combo.code}</span> — {combo.subjects.join(', ')}
                                              </span>
                                              <span className="text-[10px] font-semibold text-[#800020] shrink-0">
                                                View paths
                                              </span>
                                            </motion.button>
                                          );
                                        })}
                                      </div>
                                    )}

                                    {otherFiltered.length > 0 && (
                                      <div className="py-1">
                                        <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50">
                                          All Generated Arts Combinations
                                        </div>
                                        {otherFiltered.map((combo, idx) => {
                                          const isActive = combo.code === selectedArtsComboCode;
                                          const staggerIndex = popularFiltered.length + idx;
                                          return (
                                            <motion.button
                                              type="button"
                                              key={combo.code}
                                              role="option"
                                              aria-selected={isActive}
                                              initial={{ opacity: 0, x: -8 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ duration: 0.16, delay: Math.min(staggerIndex, 14) * 0.02, ease: 'easeOut' }}
                                              onClick={() => handleSelectCombination(combo, 'arts')}
                                              className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                                                isActive
                                                  ? 'bg-rose-50 text-[#800020] font-bold'
                                                  : 'text-[#0A192F] hover:bg-slate-50 font-medium'
                                              }`}
                                            >
                                              <span className="truncate">
                                                <span className="font-bold">{combo.code}</span> — {combo.subjects.join(', ')}
                                              </span>
                                              <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                                                View paths
                                              </span>
                                            </motion.button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {selectedArtsCombo && (
                      <div className="text-xs text-slate-600 flex items-center justify-between gap-2 pt-0.5">
                        <div className="min-w-0">
                          <div className="truncate">
                            <span className="font-bold text-[#0A192F]">{selectedArtsCombo.code}:</span>{' '}
                            {selectedArtsCombo.subjects.join(' • ')}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Subsidiary: {selectedArtsCombo.subsidiary}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveCombinationModal(selectedArtsCombo)}
                          className="text-[11px] font-bold text-[#800020] hover:underline shrink-0 cursor-pointer"
                        >
                          Career Paths →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* SCIENCES COMBINATIONS DROPDOWN */}
                  <div ref={sciencesDropdownRef} className={`bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 relative ${openComboDropdown === 'sciences' ? 'z-30' : 'z-10'}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                        Sciences Combinations ({ALL_SCIENCE_COMBINATIONS.length})
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">Biology & Physics Separated (PCB Only)</span>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={openComboDropdown === 'sciences'}
                        onClick={() => setOpenComboDropdown((prev) => (prev === 'sciences' ? null : 'sciences'))}
                        className="w-full bg-white border border-slate-300 rounded-xl pl-3.5 pr-10 py-2.5 text-left text-sm font-semibold text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#0A192F]/30 focus:border-[#0A192F] cursor-pointer flex items-center justify-between transition"
                      >
                        <span className="truncate">
                          {selectedScienceCombo.code} — {selectedScienceCombo.subjects.join(', ')}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                            openComboDropdown === 'sciences' ? 'rotate-180 text-[#0A192F]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openComboDropdown === 'sciences' && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.16 }}
                            role="listbox"
                            aria-label="Sciences Combinations"
                            className="absolute left-0 right-0 mt-2 z-30 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-100"
                          >
                            {[
                              { label: 'Physics Combinations (No Biology)', items: SCIENCE_COMBINATION_GROUPS.physics },
                              { label: 'Biology Combinations (No Physics)', items: SCIENCE_COMBINATION_GROUPS.biology },
                              { label: 'Physics & Biology Joint (PCB Only)', items: SCIENCE_COMBINATION_GROUPS.pcbOnly },
                              { label: 'Technical, Vocational & Applied Sciences', items: SCIENCE_COMBINATION_GROUPS.other },
                            ].map((group, groupIdx) => (
                              <div key={group.label} className="py-1">
                                <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0A192F] bg-blue-50/70">
                                  {group.label}
                                </div>
                                {group.items.map((combo, itemIdx) => {
                                  const isActive = combo.code === selectedScienceComboCode;
                                  const staggerIndex = groupIdx * 3 + itemIdx;
                                  return (
                                    <motion.button
                                      type="button"
                                      key={combo.code}
                                      role="option"
                                      aria-selected={isActive}
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.16, delay: Math.min(staggerIndex, 13) * 0.025, ease: 'easeOut' }}
                                      onClick={() => handleSelectCombination(combo, 'sciences')}
                                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                                        isActive
                                          ? 'bg-blue-50 text-[#0A192F] font-bold'
                                          : 'text-[#0A192F] hover:bg-slate-50 font-medium'
                                      }`}
                                    >
                                      <span className="truncate">
                                        <span className="font-bold">{combo.code}</span> — {combo.subjects.join(', ')}
                                      </span>
                                      <span className="text-[10px] font-semibold text-[#800020] shrink-0">
                                        View paths
                                      </span>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {selectedScienceCombo && (
                      <div className="text-xs text-slate-600 flex items-center justify-between gap-2 pt-0.5">
                        <div className="min-w-0">
                          <div className="truncate">
                            <span className="font-bold text-[#0A192F]">{selectedScienceCombo.code}</span>{' '}
                            <span className="text-[#800020] font-semibold">({selectedScienceCombo.stream})</span>:{' '}
                            {selectedScienceCombo.subjects.join(' • ')}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Subsidiary: {selectedScienceCombo.subsidiary}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveCombinationModal(selectedScienceCombo)}
                          className="text-[11px] font-bold text-[#800020] hover:underline shrink-0 cursor-pointer"
                        >
                          Career Paths →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 text-sm font-medium text-slate-700 pt-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Sub-Math, Sub-ICT & General Paper coaching</li>
                </ul>
              </motion.div>
            </div>

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
                Explore campus facilities, student clubs, prefects cabinet, teachers, and photo gallery.
              </p>
            </div>

            {/* HORIZONTAL STATS ROW (CAMPUS LIFE) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-br from-[#0A192F] to-[#173860] text-white p-6 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-amber-300">
                    <AnimatedCounter target={2000} suffix="+" />
                  </div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Total Students
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/20 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#800020] to-[#500014] text-white p-6 rounded-2xl border border-rose-900/60 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-amber-200">
                    <AnimatedCounter target={18} suffix="+" />
                  </div>
                  <div className="text-xs font-bold text-rose-200 uppercase tracking-wider">
                    Active Clubs
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-rose-200 flex items-center justify-center border border-white/20 shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0A192F] to-[#173860] text-white p-6 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-amber-300">
                    <AnimatedCounter target={32} suffix="+" />
                  </div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Years of Excellence
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/20 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            {/* CAMPUS SECTION FILTER SELECTOR (WALKER SCHOOL STYLE SLIDING PILLS) */}
            <div id="campus-section-filter" className="max-w-4xl mx-auto space-y-3">
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1.5">
                {[
                  { id: 'all', label: 'All Overview' },
                  { id: 'facilities', label: 'Facilities' },
                  { id: 'clubs', label: 'Clubs' },
                  { id: 'prefects', label: 'Prefects' },
                  { id: 'teachers', label: 'Teachers' },
                  { id: 'videos', label: 'Campus Videos' },
                  { id: 'gallery', label: 'Photo Gallery' },
                ].map((item) => {
                  const isSelected = campusSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCampusSection(item.id as any)}
                      className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                        isSelected ? 'text-white' : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="campusActivePill"
                          className="absolute inset-0 bg-[#0A192F] rounded-xl -z-10 shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        />
                      )}
                      {item.label}
                    </button>
                  );
                })}
              </div>
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
                  {CAMPUS_FACILITIES.map((fac, idx) => (
                    <motion.div 
                      key={fac.id || idx} 
                      onClick={() => openFacilityModal(fac)}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      whileHover={{ scale: 1.025, y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200 flex flex-col transition-shadow duration-300 group cursor-pointer"
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
                        
                        {/* Hover expand badge indicator */}
                        <div className="absolute top-3 left-3 bg-[#0A192F]/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 shadow-md border border-white/15">
                          <Maximize2 className="w-3 h-3 text-amber-300" />
                          <span>Click to expand</span>
                        </div>

                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-md">
                          <SchoolBadgeImg size={24} />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-[#0A192F]/90 backdrop-blur-sm text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30 shadow-md">
                          {fac.tag}
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-lg font-['Montserrat'] text-[#0A192F] group-hover:text-[#800020] transition-colors leading-snug">
                              {fac.title}
                            </h4>
                            <span className="p-1 rounded-lg text-slate-400 group-hover:text-[#800020] group-hover:bg-rose-50 transition-colors shrink-0">
                              <Maximize2 className="w-4 h-4" />
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed mt-2">{fac.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5 text-[#800020] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> STAHIZA Standard
                          </span>
                          <span className="bg-slate-100 px-2.5 py-0.5 rounded-md font-mono text-[11px] text-slate-600 flex items-center gap-1">
                            <Camera className="w-3 h-3 text-slate-500" /> {fac.gallery.length} Photos
                          </span>
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
                      img: getSupabaseOthersUrl("debate.jpeg"),
                      fallbackImg: "/pages/images/odeke.jpeg"
                    },
                    { 
                      title: "Scouts, Guides & Fellowships", 
                      desc: "Character development, campcraft, volunteer service, and governance discipline.",
                      tag: "Governance & Discipline",
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
                        Prefects Cabinet & Student Governance
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
                  {leaders
                    .filter(l => !l.role.toLowerCase().includes('prefect') && !l.role.toLowerCase().includes('cabinet') && !l.role.toLowerCase().includes('unsa') && !l.role.toLowerCase().includes('top'))
                    .map((teacher, idx) => (
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

            {/* CAMPUS VIDEOS SECTION (SUPABASE IMAGES/VIDEOS/LIFE1 TO LIFE8) */}
            {(campusSection === 'all' || campusSection === 'videos') && (
              <CampusLifeVideos />
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

        {activeTab === 'admissions' && (
          <AdmissionFormSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
          </motion.div>
        </AnimatePresence>
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
        onNavigateToAdmissions={() => setActiveTab('admissions')}
      />

      {/* CAMPUS FACILITY EXPANDABLE IMAGE GALLERY MODAL */}
      <AnimatePresence>
        {selectedFacility && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="facility-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedFacility(null)}
              className="fixed inset-0 bg-[#0A192F]/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card (Scaled to not be overly large, displaying the complete uncropped image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl sm:max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 my-auto flex flex-col"
            >
              {/* Header Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#800020] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        {selectedFacility.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                        • Photo {activeFacilityPhotoIdx + 1} of {selectedFacility.gallery.length}
                      </span>
                    </div>
                    <h3 id="facility-modal-title" className="text-base sm:text-lg font-bold font-['Montserrat'] text-[#0A192F] truncate">
                      {selectedFacility.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden sm:block">
                    <SchoolBadgeImg size={28} />
                  </div>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    aria-label="Close modal"
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Frame - Complete full image without cropping or excessive height */}
              <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[220px] max-h-[50vh] sm:max-h-[55vh]">
                <img
                  src={selectedFacility.gallery[activeFacilityPhotoIdx]?.url || selectedFacility.img}
                  alt={selectedFacility.gallery[activeFacilityPhotoIdx]?.caption || selectedFacility.title}
                  onError={(e) => {
                    const fallback = selectedFacility.gallery[activeFacilityPhotoIdx]?.fallbackUrl || selectedFacility.fallbackImg;
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[55vh] object-contain select-none transition-all duration-300"
                />

                {/* Left/Right Gallery Nav Arrows if multiple photos */}
                {selectedFacility.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveFacilityPhotoIdx((prev) => (prev - 1 + selectedFacility.gallery.length) % selectedFacility.gallery.length)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm transition border border-white/20 shadow-lg cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveFacilityPhotoIdx((prev) => (prev + 1) % selectedFacility.gallery.length)}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm transition border border-white/20 shadow-lg cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Subtle caption overlay at bottom of image */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white/95 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="truncate pr-2 font-medium">
                    {selectedFacility.gallery[activeFacilityPhotoIdx]?.caption || selectedFacility.title}
                  </span>
                  <span className="text-[11px] text-amber-300 font-mono shrink-0">
                    Full Image ({activeFacilityPhotoIdx + 1}/{selectedFacility.gallery.length})
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails Strip (if multiple photos) */}
              {selectedFacility.gallery.length > 1 && (
                <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
                  {selectedFacility.gallery.map((photo, pIdx) => {
                    const isPhotoActive = pIdx === activeFacilityPhotoIdx;
                    return (
                      <button
                        key={pIdx}
                        onClick={() => setActiveFacilityPhotoIdx(pIdx)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 w-16 h-12 cursor-pointer ${
                          isPhotoActive ? 'border-amber-400 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (photo.fallbackUrl && e.currentTarget.src !== photo.fallbackUrl) {
                              e.currentTarget.src = photo.fallbackUrl;
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Info & Footer Actions */}
              <div className="p-4 sm:p-5 bg-white space-y-3">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {selectedFacility.desc}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-700">Official STAHIZA Facility</span>
                    <span className="hidden sm:inline">• Verified campus infrastructure</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedFacility(null);
                        setApplyModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply For Admission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedFacility(null)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* A-LEVEL COMBINATION CAREER PATHS & UNIVERSITY COURSES MODAL */}
      <AnimatePresence>
        {activeCombinationModal && (() => {
          const guidance = getCombinationGuidance(activeCombinationModal);
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="combination-modal-title"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveCombinationModal(null)}
                className="fixed inset-0 bg-[#0A192F]/85 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto flex flex-col"
              >
                {/* Header */}
                <div className="px-5 sm:px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#800020] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                          {activeCombinationModal.stream} Stream
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          UNEB A-Level Pathway
                        </span>
                      </div>
                      <h3
                        id="combination-modal-title"
                        className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F] truncate mt-0.5"
                      >
                        {activeCombinationModal.code} — {activeCombinationModal.subjects.join(', ')}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="hidden sm:block">
                      <SchoolBadgeImg size={28} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveCombinationModal(null)}
                      aria-label="Close combination modal"
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors focus:outline-none focus:ring-2 focus:ring-[#800020] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {guidance.overview}
                  </p>

                  {/* Subject Structure Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                        Principal Subjects (3)
                      </span>
                      <span className="font-bold text-[#0A192F] text-sm mt-0.5 block">
                        {activeCombinationModal.subjects.join(' • ')}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                        Subsidiaries & General Paper
                      </span>
                      <span className="font-semibold text-slate-700 text-sm mt-0.5 block">
                        {activeCombinationModal.subsidiary}
                      </span>
                    </div>
                  </div>

                  {/* Courses & Careers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#800020]/10 text-[#800020] flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-[#0A192F]">Typical University Courses</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {guidance.universityCourses.map((course) => (
                          <li key={course} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-900/10 text-[#0A192F] flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-[#0A192F]">Career Paths</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {guidance.careerPaths.map((career) => (
                          <li key={career} className="flex items-start gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                            <span>{career}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Admission Requirement Note */}
                  <div className="bg-amber-500/10 border border-amber-400/40 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-[#0A192F]">University Entry Note: </span>
                    {guidance.admissionNote}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium">
                    Standard High School - Zzana • A-Level Admissions
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCombinationModal(null);
                        setApplyModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply for This Pathway</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCombinationModal(null)}
                      className="px-3.5 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* FLOATING ADMISSIONS WIDGET (WALKER SCHOOL STYLE QUICK DOCK) */}
      <FloatingAdmissionsWidget 
        onApplyClick={() => setApplyModalOpen(true)}
        onContactClick={() => setActiveTab('contact')}
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
