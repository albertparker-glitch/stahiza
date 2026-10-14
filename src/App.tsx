import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowRight
} from 'lucide-react';
import { SchoolBadgeImg } from './components/SchoolBadgeImg';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { ContactSection } from './components/ContactSection';
import { StaffMarquee } from './components/StaffMarquee';
import { Leader, fetchLeaders, fetchMarqueeStaff, SCHOOL_CONTACTS } from './data/schoolData';
import { getSupabasePublicUrl } from './lib/supabase';

// Animation variants
const tabTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.2, ease: "easeIn" as const } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: custom * 0.1, ease: "easeOut" as const }
  })
};

const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.25, ease: "easeOut" } }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'leadership' | 'academics' | 'sports' | 'campus' | 'contact'>('home');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [marqueeStaff, setMarqueeStaff] = useState<Leader[]>([]);

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

      {/* MAIN CONTENT AREA WITH ANIMATED TAB TRANSITIONS */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* FULL BLEED 100% WIDTH VIDEO BANNER */}
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
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7 space-y-6"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="inline-flex items-center gap-3 bg-[#8A1C24]/30 border border-[#8A1C24]/50 px-4 py-2 rounded-full text-rose-200 text-xs sm:text-sm font-semibold tracking-wide"
                    >
                      <SchoolBadgeImg size={22} className="w-5 h-5" />
                      <span>Official STAHIZA Administrative Portal</span>
                    </motion.div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="text-4xl sm:text-6xl font-black font-['Montserrat'] tracking-tight leading-none"
                    >
                      Standard High School <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Zzana</span>
                    </motion.h1>

                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="text-xl sm:text-2xl font-medium text-amber-200 italic font-serif"
                    >
                      "Education Is The Way"
                    </motion.p>

                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
                    >
                      When the horizon seems uncertain, remember that education is the ultimate guide. It equips you with the strength to rise, the wisdom to choose, and the power to succeed. Walk boldly—because education is the way.
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.5 }}
                      className="flex flex-wrap gap-4 pt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setApplyModalOpen(true)}
                        className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition flex items-center gap-3 text-base"
                      >
                        <SchoolBadgeImg size={22} className="w-5 h-5" />
                        <span>Apply For Admissions</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab('academics')}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl backdrop-blur-md transition flex items-center gap-2 text-base"
                      >
                        <span>Explore Academics</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* HERO STATS / CREST EMBLEM CARD */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.92, y: 25 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 }}
                    className="lg:col-span-5 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/15 p-8 rounded-3xl shadow-2xl space-y-6"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-4 bg-white rounded-2xl shadow-lg border border-slate-200 cursor-pointer"
                    >
                      <SchoolBadgeImg size={100} className="w-28 h-28" />
                    </motion.div>

                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-extrabold font-['Montserrat'] text-white">Standard High School Zzana</h3>
                      <p className="text-xs text-amber-300 font-semibold">{SCHOOL_CONTACTS.box}</p>
                      <p className="text-xs text-slate-300">Office Desk: {SCHOOL_CONTACTS.phone1}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full pt-2">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-black/20 p-4 rounded-xl text-center border border-white/10"
                      >
                        <div className="text-2xl font-black text-amber-300 font-['Montserrat']">USSSA</div>
                        <div className="text-xs text-slate-300 mt-0.5">National Champions</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-black/20 p-4 rounded-xl text-center border border-white/10"
                      >
                        <div className="text-2xl font-black text-rose-300 font-['Montserrat']">100%</div>
                        <div className="text-xs text-slate-300 mt-0.5">UNEB Pass Rate</div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* QUICK HIGHLIGHT TICKER */}
              <div className="bg-[#800020] text-white py-3 px-4 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-[#800020] font-bold px-2.5 py-0.5 rounded text-xs uppercase">Official Notice</span>
                    <span>Term I Admissions & Reporting for 2027 Academic Year are currently ongoing. Visit the admissions office along Entebbe Road or apply online.</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setApplyModalOpen(true)}
                    className="underline underline-offset-4 font-bold hover:text-amber-200 text-xs sm:text-sm whitespace-nowrap"
                  >
                    Secure Your Vacancy &rarr;
                  </motion.button>
                </div>
              </div>

              {/* CORE PILLARS */}
              <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-full mb-2 cursor-pointer"
                  >
                    <SchoolBadgeImg size={36} className="w-9 h-9" />
                  </motion.div>
                  <span className="text-[#800020] font-bold tracking-wider uppercase text-sm block">The STAHIZA Advantage</span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                    Pillars of Excellence
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg">
                    Standard High School Zzana is built upon three foundational pillars ensuring comprehensive student development.
                  </p>
                </motion.div>

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
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      whileHover={{ y: -8 }}
                      className="bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 group flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.15 }}
                          className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-white/10 text-amber-300 border-white/20 transition duration-300"
                        >
                          <pillar.icon className="w-8 h-8" />
                        </motion.div>
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
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 text-center space-y-2"
                >
                  <span className="text-[#800020] font-bold uppercase tracking-wider text-xs">Highlights & Faculty</span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                    STAHIZA IN A BRIEF
                  </h3>
                  <p className="text-slate-600 text-sm max-w-xl mx-auto">
                    A glimpse into our vibrant school community, championship sports teams, academic excellence, and modern facilities.
                  </p>
                </motion.div>

                <StaffMarquee staffList={marqueeStaff} />
              </section>

              {/* HEADTEACHER WELCOME BANNER */}
              <section className="bg-slate-100 py-20 px-4 sm:px-8 border-y border-slate-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-5 relative"
                  >
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[#800020] to-[#0A192F] rounded-3xl opacity-25 blur-lg"></div>
                    <div className="relative bg-[#0A192F] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.05 }}
                          className="p-3 bg-white rounded-2xl shadow"
                        >
                          <SchoolBadgeImg size={50} className="w-12 h-12" />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-lg font-['Montserrat']">Administrative Office</h4>
                          <p className="text-xs text-amber-300">Standard High School, Zzana</p>
                        </div>
                      </div>
                      <blockquote className="italic font-serif text-lg leading-relaxed text-slate-200">
                        "At STAHIZA, we believe every student possesses unique potential. Through disciplined academics, rigorous coaching, and moral guidance, we shape champions for life."
                      </blockquote>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7 space-y-6"
                  >
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
                      <motion.div whileHover={{ scale: 1.04 }} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-[#800020] font-['Montserrat']">100%</div>
                        <div className="text-xs text-slate-600 font-medium mt-1">Boarding Security</div>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.04 }} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-[#0A192F] font-['Montserrat']">50+</div>
                        <div className="text-xs text-slate-600 font-medium mt-1">Trophies & Awards</div>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.04 }} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center col-span-2 sm:col-span-1">
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-[#0A192F] to-[#163c6c] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
                >
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
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setApplyModalOpen(true)}
                      className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 whitespace-nowrap"
                    >
                      <SchoolBadgeImg size={22} className="w-5 h-5" />
                      <span>Apply Online Now</span>
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
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
            </motion.div>
          )}

          {activeTab === 'leadership' && (
            <motion.div
              key="leadership"
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <motion.div whileHover={{ rotate: 10, scale: 1.05 }} className="inline-block cursor-pointer">
                  <SchoolBadgeImg size={56} className="mx-auto" />
                </motion.div>
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
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-2xl transition flex flex-col group"
                  >
                    <div className="relative w-full h-80 bg-slate-100 overflow-hidden">
                      <img 
                        src={leader.img} 
                        alt={leader.name} 
                        className="w-full h-full object-cover object-top shadow-xl transition-transform duration-700 group-hover:scale-108"
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
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg"
                      >
                        <SchoolBadgeImg size={34} />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent flex items-end p-6">
                        <span className="bg-[#800020] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                          {leader.role}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-extrabold font-['Montserrat'] text-[#0A192F] group-hover:text-[#800020] transition-colors">{leader.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'academics' && (
            <motion.div
              key="academics"
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <motion.div whileHover={{ rotate: 10, scale: 1.05 }} className="inline-block cursor-pointer">
                  <SchoolBadgeImg size={56} className="mx-auto" />
                </motion.div>
                <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">UNEB Curriculum</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                  Academic Programs
                </h2>
                <p className="text-slate-600 text-base">
                  Comprehensive lower and upper secondary education designed to unlock your child's highest potential.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6 hover:shadow-xl transition"
                >
                  <div className="flex items-center justify-between">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="w-14 h-14 rounded-2xl bg-rose-50 text-[#800020] flex items-center justify-center shadow-inner"
                    >
                      <BookOpen className="w-7 h-7" />
                    </motion.div>
                    <SchoolBadgeImg size={42} />
                  </div>
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">O-Level (Lower Secondary)</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Full implementation of the Uganda National Examinations Board (UNEB) curriculum with emphasis on sciences (Physics, Chemistry, Biology, Mathematics) and humanities.
                  </p>
                  <ul className="space-y-3 text-sm font-medium text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Practical laboratory sessions in Physics, Chemistry & Biology</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Computer literacy & ICT training for all students</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Remedial evening coaching and continuous assessment</li>
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6 hover:shadow-xl transition"
                >
                  <div className="flex items-center justify-between">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0A192F] flex items-center justify-center shadow-inner"
                    >
                      <GraduationCap className="w-7 h-7" />
                    </motion.div>
                    <SchoolBadgeImg size={42} />
                  </div>
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">A-Level (Upper Secondary)</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Prestigious subject combinations for both Sciences (PCM, BCM, PCB) and Arts (HEG, MEG, B.A.T) ensuring direct government and private university admissions.
                  </p>
                  <ul className="space-y-3 text-sm font-medium text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Science Combinations: PCM/M, BCM, PCB, PEM</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Arts Combinations: HEG/ICT, MEG/ICT, HED/French</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> General Paper & Sub-Math mandatory distinction drilling</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sports' && (
            <motion.div
              key="sports"
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <motion.div whileHover={{ rotate: 10, scale: 1.05 }} className="inline-block cursor-pointer">
                  <SchoolBadgeImg size={56} className="mx-auto" />
                </motion.div>
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
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4 hover:shadow-xl transition flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <motion.div 
                          whileHover={{ rotate: 15, scale: 1.15 }}
                          className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shadow-inner"
                        >
                          <Trophy className="w-6 h-6" />
                        </motion.div>
                        <SchoolBadgeImg size={34} />
                      </div>
                      <span className="text-xs font-bold text-[#800020] bg-rose-50 px-3 py-1 rounded-full inline-block">{item.stat}</span>
                      <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A192F]">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'campus' && (
            <motion.div
              key="campus"
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <motion.div whileHover={{ rotate: 10, scale: 1.05 }} className="inline-block cursor-pointer">
                  <SchoolBadgeImg size={56} className="mx-auto" />
                </motion.div>
                <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Life at STAHIZA</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                  Campus & Boarding Facilities
                </h2>
                <p className="text-slate-600 text-base">
                  A serene, secure, and conducive learning environment along Entebbe Road.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Modern Science Labs", desc: "Fully equipped Physics, Chemistry and Biology laboratories for practical mastery." },
                  { title: "Computer Laboratory", desc: "High-speed internet and modern desktop terminals for ICT research." },
                  { title: "Comfortable Dormitories", desc: "Secure, spacious boarding facilities with 24/7 warden supervision." },
                  { title: "Spacious Dining Hall", desc: "Nutritious, well-prepared meals served in a clean hygienic environment." },
                ].map((fac, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3 hover:shadow-xl transition"
                  >
                    <div className="flex items-center justify-between">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        className="w-10 h-10 rounded-xl bg-[#0A192F]/15 text-[#0A192F] flex items-center justify-center shadow-inner"
                      >
                        <Building2 className="w-5 h-5" />
                      </motion.div>
                      <SchoolBadgeImg size={30} />
                    </div>
                    <h3 className="font-bold text-lg font-['Montserrat'] text-[#0A192F]">{fac.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{fac.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ContactSection />
            </motion.div>
          )}
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
      />

    </div>
  );
}
