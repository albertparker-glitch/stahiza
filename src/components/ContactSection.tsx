import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Building2, 
  ChevronDown, 
  Layers, 
  Activity, 
  BarChart3, 
  Leaf, 
  Globe2,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Trophy,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'O-Level Admissions (Senior 1 - Senior 4)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#EAECE6] py-10 sm:py-16 px-3 sm:px-6 lg:px-8 font-['Inter',sans-serif] text-slate-800 animate-fadeIn">
      
      {/* MASTER CARD CONTAINER - LEAVING EXACT OUTLINE AND STYLING FROM REFERENCE */}
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-slate-200/90 p-4 sm:p-6 lg:p-7 space-y-5">
        
        {/* TOP BRAND & NAVIGATION BAR */}
        <header className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-b border-slate-100">
          {/* LOGO & BRAND */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-rose-50/80 rounded-xl border border-rose-100 shadow-sm">
              <SchoolBadgeImg size={34} />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-[#0D2B20] tracking-tight font-['Montserrat']">
                Standard High School Zzana
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                STAHIZA • Education Is The Way
              </p>
            </div>
          </div>

          {/* CENTER NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-slate-600">
            <span className="hover:text-[#0D2B20] cursor-pointer transition">Home</span>
            <span className="hover:text-[#0D2B20] cursor-pointer transition">Academics</span>
            <span className="hover:text-[#0D2B20] cursor-pointer transition">Leadership</span>
            <span className="hover:text-[#0D2B20] cursor-pointer transition">Sports & Talent</span>
            <span className="hover:text-[#0D2B20] cursor-pointer transition">Campus Life</span>
            <span className="text-[#0D2B20] font-bold border-b-2 border-[#0D2B20] pb-1 cursor-pointer">Contact Us</span>
          </nav>

          {/* RIGHT CTA & STATUS INDICATOR */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('contact-form-heading');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#0D2B20] hover:bg-[#153e30] text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-full transition flex items-center gap-1.5 shadow"
            >
              <span>Admissions Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
            <div 
              title="Admissions 2027 Open"
              className="w-8 h-8 rounded-full bg-[#0D2B20] text-emerald-300 flex items-center justify-center text-xs shadow shrink-0"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </header>

        {/* MAIN BODY: SPLIT PANELS (DARK GREEN LEFT & WARM CREAM RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT PANEL: DARK FOREST GREEN CONTACT FORM */}
          <div className="lg:col-span-6 bg-[#0D2B20] rounded-[24px] sm:rounded-[28px] p-6 sm:p-9 text-white relative overflow-hidden flex flex-col justify-between shadow-lg">
            
            {/* SUBTLE TOPOGRAPHIC CONTOUR WATERMARK IN BACKGROUND */}
            <svg 
              className="absolute -bottom-10 -left-10 w-80 h-80 text-white/[0.04] pointer-events-none select-none" 
              viewBox="0 0 200 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2"
            >
              <ellipse cx="60" cy="140" rx="90" ry="70" />
              <ellipse cx="60" cy="140" rx="75" ry="58" />
              <ellipse cx="60" cy="140" rx="60" ry="46" />
              <ellipse cx="60" cy="140" rx="45" ry="34" />
              <ellipse cx="60" cy="140" rx="30" ry="22" />
              <ellipse cx="60" cy="140" rx="15" ry="10" />
            </svg>

            <div className="relative z-10 space-y-6">
              {/* KICKER & TITLE */}
              <div className="space-y-2">
                <span className="text-[#84A897] font-semibold text-[11px] uppercase tracking-[0.22em] block">
                  LET'S CONNECT
                </span>
                <h3 id="contact-form-heading" className="text-3xl sm:text-4xl lg:text-[40px] font-serif text-white tracking-tight leading-tight">
                  Get in Touch
                </h3>
                <p className="text-[#9DB8AC] text-xs sm:text-[13px] leading-relaxed max-w-md">
                  Have questions regarding S.1 – S.6 admissions, school fees, UNEB curriculum, boarding requirements, or visiting our campus? We're here to help.
                </p>
              </div>

              {/* FORM */}
              {submitted ? (
                <div className="py-10 text-center space-y-4 bg-white/5 rounded-2xl border border-white/10 p-6 my-2">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-300 rounded-full mx-auto flex items-center justify-center border border-emerald-400/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-white">Inquiry Received!</h4>
                  <p className="text-[#9DB8AC] text-xs leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. The STAHIZA Admissions and Administration Office has received your inquiry regarding <span className="text-emerald-300 font-medium">"{formData.subject}"</span> and will reach out promptly.
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Direct line: <span className="text-white font-mono font-bold">{SCHOOL_CONTACTS.phone1}</span>
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                  
                  {/* ROW 1: NAME & EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#A6C0B4]">Your Name</label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Mukasa (Parent)"
                          className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white placeholder-[#688D7E] text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition"
                        />
                        <User className="w-3.5 h-3.5 text-[#688D7E] absolute right-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#A6C0B4]">Your Email</label>
                      <div className="relative flex items-center">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. parent@example.com"
                          className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white placeholder-[#688D7E] text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition"
                        />
                        <Mail className="w-3.5 h-3.5 text-[#688D7E] absolute right-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: PHONE / WHATSAPP NUMBER */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#A6C0B4]">Phone / WhatsApp Number</label>
                    <div className="relative flex items-center">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +256 700 000 000"
                        className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white placeholder-[#688D7E] text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition"
                      />
                      <Phone className="w-3.5 h-3.5 text-[#688D7E] absolute right-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 3: SUBJECT DROPDOWN */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#A6C0B4]">Inquiry Subject</label>
                    <div className="relative flex items-center">
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white text-xs px-3.5 py-2.5 rounded-xl pr-9 appearance-none focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition cursor-pointer"
                      >
                        <option value="O-Level Admissions (Senior 1 - Senior 4)" className="bg-[#0D2B20]">O-Level Admissions (Senior 1 - Senior 4)</option>
                        <option value="A-Level Admissions (Senior 5 - Senior 6)" className="bg-[#0D2B20]">A-Level Admissions (Senior 5 - Senior 6)</option>
                        <option value="School Fees, Bursaries & Bank Slips" className="bg-[#0D2B20]">School Fees, Bursaries & Bank Slips</option>
                        <option value="USSSA Sports Academy & Talent Trials" className="bg-[#0D2B20]">USSSA Sports Academy & Talent Trials</option>
                        <option value="Boarding Facilities & Campus Visit" className="bg-[#0D2B20]">Boarding Facilities & Campus Visit</option>
                        <option value="Academic Inquiries & UNEB Results" className="bg-[#0D2B20]">Academic Inquiries & UNEB Results</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#688D7E] absolute right-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 4: MESSAGE */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#A6C0B4]">Your Message</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the student, entry class, boarding preferences, or any specific inquiries..."
                      className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white placeholder-[#688D7E] text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON WITH ARROW IN CIRCLE */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#DDE5D6] hover:bg-white text-[#0D2B20] text-xs font-bold pl-5 pr-2 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3 transform hover:-translate-y-0.5"
                    >
                      <span>Send Message</span>
                      <div className="w-6 h-6 rounded-full bg-[#0D2B20] text-white flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

          {/* RIGHT PANEL: WARM CREAM CONTACT INFO WITH ARCH-CUTOUT RELEVANT IMAGE */}
          <div className="lg:col-span-6 bg-[#F8F9F5] border border-slate-200/60 rounded-[24px] sm:rounded-[28px] p-6 sm:p-9 flex flex-col justify-between shadow-sm relative overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* LEFT SUB-COLUMN: TEXT & CONTACT LIST */}
              <div className="md:col-span-7 space-y-6">
                
                {/* HEADER */}
                <div className="space-y-2">
                  <span className="text-[#78887F] font-semibold text-[11px] uppercase tracking-[0.22em] block">
                    WE'RE HERE TO HELP
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-[#0D2B20] tracking-tight leading-tight">
                    Empowering Minds,<br />
                    <span className="italic">Building Character</span>
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    Our administrative and admissions team is always available to welcome parents, visitors, and prospective students to our Zzana campus.
                  </p>
                </div>

                {/* CONTACT DETAILS LIST WITH ROUNDED ICON BUTTONS */}
                <div className="space-y-4 pt-1">
                  
                  {/* ADDRESS */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campus Address</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5 leading-snug">
                        {SCHOOL_CONTACTS.location}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {SCHOOL_CONTACTS.box}
                      </span>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Inquiries</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5">
                        <a href={`mailto:${SCHOOL_CONTACTS.email}`} className="hover:underline">
                          {SCHOOL_CONTACTS.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Office Lines</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5 leading-snug">
                        <a href={`tel:${SCHOOL_CONTACTS.phone1.replace(/\s+/g, '')}`} className="hover:underline">
                          {SCHOOL_CONTACTS.phone1}
                        </a>
                        <br />
                        <a href={`tel:${SCHOOL_CONTACTS.phone2.replace(/\s+/g, '')}`} className="hover:underline text-slate-600">
                          {SCHOOL_CONTACTS.phone2}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* BUSINESS HOURS */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Office Hours</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5 leading-snug">
                        {SCHOOL_CONTACTS.hours}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        Sunday: Closed for Services
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* RIGHT SUB-COLUMN: THE ARCH MASK WITH CAMPUS IMAGE */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative w-full max-w-[210px] h-[330px] rounded-t-full rounded-b-[24px] overflow-hidden shadow-2xl border-2 border-white/80 group">
                  
                  {/* ARCH IMAGE (CAMPUS TOWER / ACADEMIC ENVIRONMENT) */}
                  <img
                    src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop"
                    alt="STAHIZA Campus & Academic Halls"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  />

                  {/* AMBIENT GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B20]/75 via-transparent to-transparent pointer-events-none" />

                  {/* FLOATING BADGE INSIDE ARCH */}
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow">
                      🏫 STAHIZA Campus, Zzana
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* MAP EXPAND LINK */}
            <div className="pt-4 mt-6 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Entebbe Road Campus, Zzana / Nyanama
              </span>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-xs font-bold text-[#0D2B20] hover:underline flex items-center gap-1.5"
              >
                <span>{showMap ? 'Hide Campus Map' : 'View Campus Map'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* BOTTOM FULL-WIDTH 4-FEATURE PILL BAR */}
        <div className="bg-[#0D2B20] text-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shadow-md">
          
          {/* ITEM 1 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                UNEB Examination Center
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                Centre U1288 (O & A Level)
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                Academic Mentorship
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                Deans & UNEB distinction coaches
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                Boarding & Discipline
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                24/7 warden-supervised hostels
              </p>
            </div>
          </div>

          {/* ITEM 4 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                USSSA Sports Powerhouse
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                National football & athletics champions
              </p>
            </div>
          </div>

        </div>

        {/* EXPANDABLE GOOGLE MAP SECTION */}
        {showMap && (
          <div className="mt-4 pt-4 border-t border-slate-100 rounded-2xl overflow-hidden p-2 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                STAHIZA Campus Location (Zzana, Entebbe Road, Kampala)
              </h4>
              <a
                href="https://maps.google.com/?q=Standard+High+School+Zzana+Entebbe+Road+Kampala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#0D2B20] hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title="STAHIZA Map"
                src="https://maps.google.com/maps?q=Standard+High+School+Zzana+Entebbe+Road+Kampala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
