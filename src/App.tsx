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
  Camera,
  Sparkles
} from 'lucide-react';
import { SchoolBadgeImg } from './components/SchoolBadgeImg';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { ContactSection } from './components/ContactSection';
import { VideoGallery } from './components/VideoGallery';
import { Leader, TopStudent, fetchLeaders, fetchMarqueeStaff, fetchTopStudents, SCHOOL_CONTACTS } from './data/schoolData';
import { getSupabasePublicUrl } from './lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

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

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
            <section className="relative text-white py-12 sm:py-16 overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860]">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-3 bg-[#8A1C24]/30 border border-[#8A1C24]/50 px-4 py-2 rounded-full text-rose-200 text-xs sm:text-sm font-semibold tracking-wide">
                    <SchoolBadgeImg size={22} className="w-5 h-5" />
                    <span>Official STAHIZA Administrative Portal</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black font-['Montserrat'] tracking-tight leading-none">
                    Standard High School <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Zzana</span>
                  </h1>
                  <p className="text-xl sm:text-2xl font-medium text-amber-200 italic font-serif">
                    "Education Is The Way"
                  </p>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                    When the horizon seems uncertain, remember that education is the ultimate guide. It equips you with the strength to rise, the wisdom to choose, and the power to succeed. Walk boldly—because education is the way.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => setApplyModalOpen(true)}
                      className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-3 text-base"
                    >
                      <SchoolBadgeImg size={22} className="w-5 h-5" />
                      <span>Apply For Admissions</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveTab('academics')}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl backdrop-blur-md transition flex items-center gap-2 text-base"
                    >
                      <span>Explore Academics</span>
                    </button>
                  </div>
                </div>

                {/* HERO STATS / CREST EMBLEM CARD */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/15 p-8 rounded-3xl shadow-2xl space-y-6">
                  <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <SchoolBadgeImg size={100} className="w-28 h-28" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-extrabold font-['Montserrat'] text-white">Standard High School Zzana</h3>
                    <p className="text-xs text-amber-300 font-semibold">{SCHOOL_CONTACTS.box}</p>
                    <p className="text-xs text-slate-300">Office Desk: {SCHOOL_CONTACTS.phone1}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full pt-2">
                    <div className="bg-black/20 p-4 rounded-xl text-center border border-white/10">
                      <div className="text-2xl font-black text-amber-300 font-['Montserrat']">USSSA</div>
                      <div className="text-xs text-slate-300 mt-0.5">National Champions</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl text-center border border-white/10">
                      <div className="text-2xl font-black text-rose-300 font-['Montserrat']">100%</div>
                      <div className="text-xs text-slate-300 mt-0.5">UNEB Pass Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK HIGHLIGHT TICKER / ANNOUNCEMENT BAR */}
            <div className="bg-[#800020] text-white py-3 px-4 shadow-inner">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-[#800020] font-bold px-2.5 py-0.5 rounded text-xs uppercase">Official Notice</span>
                  <span>Term I Admissions & Reporting for 2027 Academic Year are currently ongoing. Visit the admissions office along Entebbe Road or apply online.</span>
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
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-full mb-2">
                  <SchoolBadgeImg size={36} className="w-9 h-9" />
                </div>
                <span className="text-[#800020] font-bold tracking-wider uppercase text-sm block">The STAHIZA Advantage</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                  Pillars of Excellence
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Standard High School Zzana is built upon three foundational pillars ensuring comprehensive student development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: BookOpen,
                    title: "Academics",
                    desc: "Comprehensive UNEB O & A Level drilling in Arts and Sciences. Our dedicated faculty ensures exceptional grades and university admissions.",
                  },
                  {
                    icon: Trophy,
                    title: "Sports",
                    desc: "Undisputed champions in USSSA football, basketball, athletics, and netball. We launch professional athletic careers while instilling teamwork.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Discipline",
                    desc: "Instilling moral uprightness, leadership, scouting, and spiritual nourishment to mold well-rounded, responsible citizens.",
                  },
                ].map((pillar, idx) => (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 group hover:-translate-y-2 flex flex-col justify-between"
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
                  </div>
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
                <div className="lg:col-span-5 relative">
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
                      "At STAHIZA, we believe every student possesses unique potential. Through disciplined academics, rigorous coaching, and moral guidance, we shape champions for life."
                    </blockquote>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <span className="text-[#800020] font-bold uppercase tracking-wider text-sm">Headteacher's Welcome</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                    Welcome to Standard High School Zzana
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Situated conveniently along Entebbe Road in Zzana/Nyanama, STAHIZA is more than just a school—it is a community of achievers. Our comprehensive curriculum covers both Science and Arts combinations for A-Level, and full UNEB syllabus mastery for O-Level.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Whether your child aspires to excel in national science examinations, represent Uganda in USSSA sports tournaments, or become a stellar orator and leader, STAHIZA provides the ideal fertile ground.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">100%</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Boarding Security</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-[#0A192F] font-['Montserrat']">50+</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Trophies & Awards</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center col-span-2 sm:col-span-1">
                      <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">Top 10</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">National Ranking</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* OFFICIAL ADMISSIONS DESK INQUIRY SECTION */}
            <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
              <div className="bg-gradient-to-r from-[#0A192F] to-[#163c6c] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-amber-300 text-xs font-semibold">
                    <SchoolBadgeImg size={20} className="w-5 h-5" /> Official Admissions Desk & Office Hours
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat']">
                    Need assistance with school fees or subject combinations?
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Our administrative staff is available Monday to Friday (7:30 AM – 5:00 PM) and Saturday (9:00 AM – 1:00 PM) at our Entebbe Road campus. Call us directly at {SCHOOL_CONTACTS.phone1} or submit an online application form.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    <SchoolBadgeImg size={22} className="w-5 h-5" />
                    <span>Apply Online Now</span>
                  </button>
                  <a
                    href="tel:+256772831704"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Phone className="w-5 h-5 text-amber-300" />
                    <span>{SCHOOL_CONTACTS.phone1}</span>
                  </a>
                </div>
              </div>
            </section>
            
            {/* VIDEO GALLERY ON HOME PAGE */}
            <VideoGallery />
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Administration & Faculty</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                School Leadership
              </h2>
              <p className="text-slate-600 text-base">
                Dedicated professionals steering Standard High School Zzana towards unprecedented academic and moral excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition flex flex-col">
                  <div className="relative w-full h-80 bg-slate-100 overflow-hidden">
                    <img 
                      src={leader.img} 
                      alt={leader.name} 
                      className="w-full h-full object-cover object-top shadow-xl transition-transform duration-500 hover:scale-110 active:scale-110 cursor-pointer"
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
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">UNEB Curriculum</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Academic Programs & Top Achievers
              </h2>
              <p className="text-slate-600 text-base">
                Comprehensive lower and upper secondary education designed to unlock your child's highest potential, celebrating our top 10 academic champions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#800020] flex items-center justify-center">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <SchoolBadgeImg size={42} />
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">O-Level (Lower Secondary)</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Full implementation of the Uganda National Examinations Board (UNEB) curriculum with emphasis on sciences (Physics, Chemistry, Biology, Mathematics) and humanities.
                </p>
                <ul className="space-y-3 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Practical laboratory sessions in Physics, Chemistry & Biology</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Computer literacy & ICT training for all students</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Remedial evening coaching and continuous assessment</li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0A192F] flex items-center justify-center">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <SchoolBadgeImg size={42} />
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">A-Level (Upper Secondary)</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Prestigious subject combinations for both Sciences (PCM, BCM, PCB) and Arts (HEG, MEG, B.A.T) ensuring direct government and private university admissions.
                </p>
                <ul className="space-y-3 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Science Combinations: PCM/M, BCM, PCB, PEM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Arts Combinations: HEG/ICT, MEG/ICT, HED/French</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> General Paper & Sub-Math mandatory distinction drilling</li>
                </ul>
              </div>
            </div>

            {/* A-LEVEL TOP 10 HIGH ACHIEVERS (MAROON BACKGROUND THEME) */}
            <div className="bg-[#800020] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-2">
                <span className="bg-amber-300 text-[#800020] font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider inline-block">Upper Secondary Excellence</span>
                <h3 className="text-3xl sm:text-4xl font-black font-['Montserrat']">A-Level Top 10 High Achievers</h3>
                <p className="text-rose-100 text-sm max-w-xl mx-auto">Celebrating our brilliant scholars who scored top points in their UNEB A-Level combinations.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {topStudents.filter(s => s.level === 'A-Level').map((student, idx) => (
                  <div key={idx} className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-rose-300/30 flex flex-col justify-between group hover:scale-105 transition duration-300">
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
                  </div>
                ))}
              </div>
            </div>

            {/* O-LEVEL TOP 10 HIGH ACHIEVERS (NAVY BLUE BACKGROUND THEME) */}
            <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-2">
                <span className="bg-amber-300 text-[#0A192F] font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider inline-block">Lower Secondary Excellence</span>
                <h3 className="text-3xl sm:text-4xl font-black font-['Montserrat']">O-Level Top 10 High Achievers</h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">Honoring our outstanding UNEB O-Level candidates with exceptional distinctions.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {topStudents.filter(s => s.level === 'O-Level').map((student, idx) => (
                  <div key={idx} className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-blue-300/30 flex flex-col justify-between group hover:scale-105 transition duration-300">
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
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'sports' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Champions of Uganda</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Sports & Talent Powerhouse
              </h2>
              <p className="text-slate-600 text-base">
                At STAHIZA, talent is nurtured alongside academics. We are reigning USSSA football and ball games champions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "USSSA Football Champions",
                  desc: "Legendary victories in national football competitions, producing Uganda Cranes and premier league stars.",
                  stat: "National Champions"
                },
                {
                  title: "Basketball & Netball",
                  desc: "Top-tier indoor and outdoor court dominance across Kampala district and national championship levels.",
                  stat: "District & National Winners"
                },
                {
                  title: "Music, Dance & Drama (MDD)",
                  desc: "Showcasing Ugandan cultural heritage, original plays, traditional dances, and choral excellence.",
                  stat: "Gold Medalists 2025"
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4 hover:shadow-lg transition">
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
              ))}
            </div>
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
                <Sparkles className="w-4 h-4 text-[#800020]" />
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
                    { title: "Modern Science Labs", desc: "Fully equipped Physics, Chemistry and Biology laboratories for practical mastery." },
                    { title: "Computer Laboratory", desc: "High-speed internet and modern desktop terminals for ICT research." },
                    { title: "Comfortable Dormitories", desc: "Secure, spacious boarding facilities with 24/7 warden supervision." },
                    { title: "Spacious Dining Hall", desc: "Nutritious, well-prepared meals served in a clean hygienic environment." },
                    { title: "Sports Grounds", desc: "Standard football pitch, basketball and netball courts for athletics and championships." },
                    { title: "School Library", desc: "Extensive collection of textbooks, UNEB past papers, and reading quiet zones." },
                  ].map((fac, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3 hover:shadow-md transition hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#0A192F]/15 text-[#0A192F] flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <SchoolBadgeImg size={30} />
                      </div>
                      <h4 className="font-bold text-lg font-['Montserrat'] text-[#0A192F]">{fac.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{fac.desc}</p>
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
                        5 Active Co-Curricular & Championship Teams
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
                  {[
                    { title: "Scrabble & Board Games Club", desc: "National champions in competitive scrabble, sharpening cognitive agility." },
                    { title: "Music, Dance & Drama (MDD)", desc: "Cultural preservation, choral music, traditional dance, and theatrical plays." },
                    { title: "Debate & Writers Society", desc: "Developing eloquent speakers and analytical thinkers for national debate circuits." },
                    { title: "Science & Innovation Club", desc: "Hands-on projects, coding, robotics, and scientific experiments." },
                    { title: "Scouts & Girl Guides", desc: "Leadership, survival skills, community service, and discipline." },
                  ].map((club, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3 hover:shadow-md transition hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <h4 className="font-bold text-lg font-['Montserrat'] text-[#0A192F]">{club.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{club.desc}</p>
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
