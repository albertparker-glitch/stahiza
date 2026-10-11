import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  GraduationCap,
  Trophy,
  BookOpen,
  Users,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  Send,
  Calendar,
  FileText,
  CheckCircle2,
  Building2,
  HeartHandshake,
  Search,
  Lock,
  User,
  ArrowRight,
  Play,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

// Badge Component using badge.png with zoom/scale
const SchoolBadgeImg = ({ className = "w-12 h-12", size = 48, zoom = 1.3 }: { className?: string; size?: number; zoom?: number }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-[#0F2A4A] text-white rounded-xl font-bold font-['Montserrat'] shrink-0 shadow ${className}`} style={{ width: size, height: size }}>
        STH
      </div>
    );
  }

  return (
    <img 
      src="/pages/images/badge.png" 
      alt="Standard High School Zzana Badge" 
      width={Math.round(size * zoom)}
      height={Math.round(size * zoom)}
      className={`object-contain shrink-0 drop-shadow-md transform scale-125 hover:scale-135 transition duration-300 ${className}`}
      onError={(e) => {
        // Fallback to /badge.png if /pages/images/badge.png fails
        const target = e.currentTarget;
        if (target.src.includes('/pages/images/badge.png')) {
          target.src = '/badge.png';
        } else {
          setHasError(true);
        }
      }}
    />
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'leadership' | 'academics' | 'sports' | 'campus' | 'contact'>('home');
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Apply Form State
  const [applyForm, setApplyForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    level: 'o-level',
    combination: 'pcm',
    previousSchool: '',
    notes: ''
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-['Inter',sans-serif] selection:bg-[#800020] selection:text-white">
      
      {/* TOP UTILITY BAR */}
      <div className="bg-[#0A192F] text-slate-300 text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            <a href="tel:+256772831704" className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-[#8A1C24]" />
              <span>Office Desk: +256 772 831 704</span>
            </a>
            <a href="mailto:stahiza2020@gmail.com" className="flex items-center gap-1.5 hover:text-white transition border-2 border-rose-500 shadow-md px-2.5 py-1 rounded-lg bg-slate-800 text-rose-200">
              <Mail className="w-3.5 h-3.5 text-[#8A1C24]" />
              <span>stahiza2020@gmail.com</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#8A1C24]" />
              <span>Entebbe Road, Zzana/Nyanama, Kampala</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-300 font-semibold flex items-center gap-1.5 border-2 border-emerald-500 shadow-lg px-3.5 py-1 rounded-full bg-emerald-950/60">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Admissions 2027 Open
            </span>
          </div>
        </div>
      </div>

      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO & BRANDING */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <SchoolBadgeImg size={46} className="transition group-hover:scale-105" />
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0A192F] font-['Montserrat'] leading-tight">
                STAHIZA <span className="text-[#800020]">ZZANA</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-medium tracking-wider text-slate-500 uppercase">
                Education Is The Way
              </p>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700">
            {[
              { id: 'home', label: 'Home' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'academics', label: 'Academics' },
              { id: 'sports', label: 'Sports & Talent' },
              { id: 'campus', label: 'Campus Life' },
              { id: 'contact', label: 'Contact Us' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === item.id 
                    ? 'bg-[#0A192F] text-white font-semibold shadow-sm' 
                    : 'hover:bg-slate-100 hover:text-[#0A192F]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA APPLY BUTTON */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setApplyModalOpen(true)}
              className="bg-[#800020] hover:bg-[#600018] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 text-sm flex items-center gap-2"
            >
              <SchoolBadgeImg size={22} className="w-5 h-5" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* MOBILE BURGER TOGGLE */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#0A192F]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {[
              { id: 'home', label: 'Home' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'academics', label: 'Academics' },
              { id: 'sports', label: 'Sports & Talent' },
              { id: 'campus', label: 'Campus Life' },
              { id: 'contact', label: 'Contact Us' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                  activeTab === item.id ? 'bg-[#0A192F] text-white' : 'hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setApplyModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 rounded-lg bg-[#800020] text-white font-semibold shadow"
              >
                Apply Now 2027
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main>
        {activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative text-white py-12 sm:py-16 overflow-hidden bg-[#0A192F]">
              {/* Background Video */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/pages/images/back.mp4" type="video/mp4" />
              </video>
              {/* Lighter Overlay for Clarity */}
              <div className="absolute inset-0 bg-[#0A192F]/35 z-0"></div>

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
                    Located along Entebbe Road, Zzana/Nyanama, we offer world-class UNEB O and A-Level education blended with unmatched sports championships, discipline, and holistic character development.
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
                    <p className="text-xs text-amber-300 font-semibold">P.O. Box 22981 Kampala - Uganda</p>
                    <p className="text-xs text-slate-300">Office Desk: +256 772 831 704</p>
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
                    color: "bg-rose-50 text-[#800020] border-rose-200"
                  },
                  {
                    icon: Trophy,
                    title: "Sports",
                    desc: "Undisputed champions in USSSA football, basketball, athletics, and netball. We launch professional athletic careers while instilling teamwork.",
                    color: "bg-amber-50 text-amber-600 border-amber-200"
                  },
                  {
                    icon: ShieldCheck,
                    title: "Discipline",
                    desc: "Instilling moral uprightness, leadership, scouting, and spiritual nourishment to mold well-rounded, responsible citizens.",
                    color: "bg-blue-50 text-[#0A192F] border-blue-200"
                  },
                ].map((pillar, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:-translate-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${pillar.color} group-hover:scale-110 transition duration-300`}>
                        <pillar.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#0A192F] group-hover:text-[#800020]">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                ))}
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
                    Our administrative staff is available Monday to Friday (7:30 AM – 5:00 PM) and Saturday (9:00 AM – 1:00 PM) at our Entebbe Road campus. Call us directly at +256 772 831 704 or submit an online application form.
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
                    <span>+256 772 831 704</span>
                  </a>
                </div>
              </div>
            </section>
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
              {[
                {
                  role: "Headteacher",
                  name: "Mr. Mukasa Ronald",
                  qual: "B.Ed, M.A Educational Management",
                  bio: "Over 20 years of transformative leadership in top Ugandan secondary institutions, championing holistic discipline and academic rigor."
                },
                {
                  role: "Deputy Headteacher (Academics)",
                  name: "Mrs. Namubiru Grace",
                  qual: "B.Sc (Hons), Dip.Ed",
                  bio: "Spearheading our UNEB O & A Level drilling programs with outstanding university progression records."
                },
                {
                  role: "Dean of Sports & Co-Curricular",
                  name: "Coach Kigozi Patrick",
                  qual: "B.A Sports Science, CAF License",
                  bio: "Mastermind behind STAHIZA's legendary USSSA football championships and athletic prowess."
                },
              ].map((leader, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center text-xl font-black font-['Montserrat'] shadow-md">
                      {leader.name.split(' ')[1]?.[0] || 'S'}
                    </div>
                    <SchoolBadgeImg size={38} className="opacity-80" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#800020] uppercase tracking-wider">{leader.role}</span>
                    <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A192F] mt-1">{leader.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{leader.qual}</p>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">UNEB Curriculum</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Academic Programs
              </h2>
              <p className="text-slate-600 text-base">
                Comprehensive lower and upper secondary education designed to unlock your child's highest potential.
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
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0A192F]/15 text-[#0A192F] flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <SchoolBadgeImg size={30} />
                  </div>
                  <h3 className="font-bold text-lg font-['Montserrat'] text-[#0A192F]">{fac.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{fac.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SchoolBadgeImg size={56} className="mx-auto" />
              <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Get in Touch</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Contact Standard High School Zzana
              </h2>
              <p className="text-slate-600 text-base">
                We are eager to answer your inquiries regarding admissions, visits, and school fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A192F]">School Office Contacts</h3>
                  <SchoolBadgeImg size={42} />
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#800020] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Physical Location</h4>
                      <p className="text-slate-600 text-sm">Along Entebbe Road, Zzana / Nyanama (≈8 km from Kampala city center)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#800020] flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Telephone Lines</h4>
                      <p className="text-slate-600 text-sm">+256 772 831 704 / +256 782 316 838</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#800020] flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Email Address</h4>
                      <p className="text-slate-600 text-sm">stahiza2020@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#800020] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Office Working Hours</h4>
                      <p className="text-slate-600 text-sm">Mon – Fri: 7:30 AM – 5:00 PM<br />Sat: 9:00 AM – 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold font-['Montserrat']">Plan Your Visit</h3>
                    <SchoolBadgeImg size={42} />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Parents and prospective students are welcome to tour our campus along Entebbe Road any weekday. Meet our teachers and experience our learning facilities firsthand.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-800 space-y-4">
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="w-full py-4 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-xl shadow transition text-center block"
                  >
                    Start Online Admission Form
                  </button>
                  <a
                    href="https://maps.google.com/?q=Zzana+Entebbe+Road+Kampala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition text-center block"
                  >
                    Open Google Maps Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          
          {/* COLUMN 1: ADDRESS & CONTACT */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow">
                <SchoolBadgeImg size={38} className="w-9 h-9" />
              </div>
              <h3 className="font-extrabold text-lg text-white font-['Montserrat']">Standard High School Zzana</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              P.O. Box 22981<br />
              Kampala - Uganda
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8A1C24]" /> +256 772 831 704
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8A1C24]" /> +256 782 316 838
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8A1C24]" /> stahiza2020@gmail.com
              </p>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-base font-['Montserrat']">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', tab: 'home' },
                { label: 'About Leadership', tab: 'leadership' },
                { label: 'Academics & Curriculum', tab: 'academics' },
                { label: 'Admissions & Apply', modal: 'apply' },
                { label: 'Sports & Talent', tab: 'sports' },
                { label: 'Contact Us', tab: 'contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      if (link.tab) setActiveTab(link.tab as any);
                      if (link.modal === 'apply') setApplyModalOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#8A1C24]" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: HOW TO REACH US / LOCATION DIRECTIONS */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-base font-['Montserrat']">How to Reach Us</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Located along Entebbe Road, Zzana/Nyanama (≈8 km from Kampala city center). Easily accessible by public and private transport.
            </p>
            <div className="space-y-1 text-xs text-slate-400 pt-2">
              <p className="font-semibold text-slate-300">Office Hours:</p>
              <p>Mon – Fri: 7:30 AM – 5:00 PM</p>
              <p>Sat: 9:00 AM – 1:00 PM</p>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Zzana+Entebbe+Road+Kampala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#600018] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Find us on Google Maps</span>
              </a>
            </div>
          </div>

          {/* COLUMN 4: CONNECT & SOCIALS */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-base font-['Montserrat']">Connect & Socials</h4>
            <p className="text-slate-400 text-sm">Follow our daily updates, sports matches, and school events.</p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#800020] text-white flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#800020] text-white flex items-center justify-center transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#800020] text-white flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#800020] text-white flex items-center justify-center transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-2">
              <form onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing to STAHIZA newsletter!'); }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none flex-1"
                />
                <button type="submit" className="bg-[#800020] text-white text-xs font-bold px-4 py-2 rounded-xl">
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Standard High School Zzana (STAHIZA). All rights reserved.</p>
          <p className="text-amber-400/90 font-serif italic font-medium">"Education Is The Way"</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
            <a href="#" className="hover:text-white transition">Office Admin</a>
          </div>
        </div>
      </footer>

      {/* ADMISSIONS APPLICATION MODAL */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative my-8 animate-fadeIn">
            <button
              onClick={() => { setApplyModalOpen(false); setApplySubmitted(false); }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {applySubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-['Montserrat']">Application Received!</h3>
                <p className="text-slate-600 text-base max-w-md mx-auto">
                  Thank you, <span className="font-bold">{applyForm.parentName}</span>. Your application for <span className="font-bold">{applyForm.studentName}</span> has been securely submitted to STAHIZA Admissions Office. Our team will contact you via <span className="font-bold">{applyForm.phone}</span> within 24 hours.
                </p>
                <button
                  onClick={() => { setApplyModalOpen(false); setApplySubmitted(false); }}
                  className="px-8 py-3 bg-[#0A192F] text-white font-bold rounded-xl shadow"
                >
                  Close & Return Home
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-xl">
                    <SchoolBadgeImg size={42} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#800020] uppercase tracking-wider">Admissions 2027</span>
                    <h3 className="text-2xl font-extrabold text-[#0A192F] font-['Montserrat'] mt-0.5">Online Application Form</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applyForm.studentName}
                      onChange={e => setApplyForm({ ...applyForm, studentName: e.target.value })}
                      placeholder="e.g. Mukasa Junior"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={applyForm.parentName}
                      onChange={e => setApplyForm({ ...applyForm, parentName: e.target.value })}
                      placeholder="e.g. Mr. & Mrs. Mukasa"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={applyForm.phone}
                      onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                      placeholder="e.g. +256 772 831 704"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={applyForm.email}
                      onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                      placeholder="parent@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class Level *</label>
                    <select
                      value={applyForm.level}
                      onChange={e => setApplyForm({ ...applyForm, level: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#0A192F]"
                    >
                      <option value="o-level">O-Level (Senior One to Four)</option>
                      <option value="a-level">A-Level (Senior Five & Six)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject Combination / Stream</label>
                    <select
                      value={applyForm.combination}
                      onChange={e => setApplyForm({ ...applyForm, combination: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#0A192F]"
                    >
                      <option value="pcm">PCM / BCM (Sciences)</option>
                      <option value="arts">HEG / MEG / Arts Combination</option>
                      <option value="olevel-general">O-Level General Curriculum</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Previous School Attended</label>
                  <input
                    type="text"
                    value={applyForm.previousSchool}
                    onChange={e => setApplyForm({ ...applyForm, previousSchool: e.target.value })}
                    placeholder="Name of primary or secondary school"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-xl shadow-lg transition text-base"
                >
                  Submit Application to STAHIZA
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
