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
  SlidersHorizontal
} from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [themeMode, setThemeMode] = useState<'reference' | 'school'>('reference');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Structural Health Monitoring',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isRef = themeMode === 'reference';

  return (
    <div className="w-full bg-[#EAECE6] py-10 sm:py-16 px-3 sm:px-6 lg:px-8 font-['Inter',sans-serif] text-slate-800 animate-fadeIn">
      
      {/* MODE TOGGLE BANNER */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>Interactive UI Replica based on reference design</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 shadow-sm text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-500 font-medium">Text Preset:</span>
          <button
            onClick={() => setThemeMode('reference')}
            className={`px-3 py-1 rounded-full font-bold transition ${
              isRef ? 'bg-[#0D2B20] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Exact Reference
          </button>
          <button
            onClick={() => setThemeMode('school')}
            className={`px-3 py-1 rounded-full font-bold transition ${
              !isRef ? 'bg-[#800020] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            STAHIZA Zzana
          </button>
        </div>
      </div>

      {/* MASTER CARD CONTAINER - MATCHING THE ATTACHED SCREENSHOT */}
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-slate-200/90 p-3.5 sm:p-5 space-y-4">
        
        {/* TOP BRAND & NAVIGATION BAR */}
        <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-100">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            {isRef ? (
              <div className="w-8 h-8 rounded-lg bg-[#0D2B20] text-emerald-300 flex items-center justify-center shadow">
                <Layers className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1 bg-rose-50 rounded-lg">
                <SchoolBadgeImg size={28} />
              </div>
            )}
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#0D2B20] tracking-tight font-['Montserrat']">
                {isRef ? 'Enviro Structural Monitoring' : 'Standard High School Zzana'}
              </h2>
            </div>
          </div>

          {/* CENTER NAVIGATION LINKS (HIDDEN ON VERY SMALL SCREENS) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
            <span className="cursor-pointer hover:text-[#0D2B20] transition">Home</span>
            <span className="cursor-pointer hover:text-[#0D2B20] transition">{isRef ? 'Solutions' : 'Academics'}</span>
            <span className="cursor-pointer hover:text-[#0D2B20] transition">{isRef ? 'Industries' : 'Sports'}</span>
            <span className="cursor-pointer hover:text-[#0D2B20] transition">About Us</span>
            <span className="cursor-pointer font-bold text-[#0D2B20] border-b-2 border-[#0D2B20] pb-1">Contact</span>
          </nav>

          {/* RIGHT CTA & ACTION BUTTON */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('contact-form-heading');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#0D2B20] hover:bg-[#153e30] text-white text-xs font-medium px-4 py-2 sm:py-2.5 rounded-full transition flex items-center gap-1.5 shadow"
            >
              <span>{isRef ? 'Request a Demo' : 'Apply For Admissions'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#0D2B20] text-emerald-300 flex items-center justify-center text-xs shadow cursor-pointer hover:opacity-90 transition">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>
        </header>

        {/* MAIN BODY: SPLIT PANELS (DARK GREEN LEFT & WARM CREAM RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* LEFT PANEL: DARK FOREST GREEN CONTACT FORM */}
          <div className="lg:col-span-6 bg-[#0D2B20] rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-lg">
            
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
                  {isRef 
                    ? "Have a question, need support, or want to learn more about our solutions? We're here to help."
                    : "Have a question, need admissions support, or want to learn more about STAHIZA? We're here to help."}
                </p>
              </div>

              {/* FORM */}
              {submitted ? (
                <div className="py-12 text-center space-y-4 bg-white/5 rounded-2xl border border-white/10 p-6 my-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-300 rounded-full mx-auto flex items-center justify-center border border-emerald-400/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-white">Message Received!</h4>
                  <p className="text-[#9DB8AC] text-xs leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. Our desk has received your note regarding <span className="text-emerald-300 font-medium">"{formData.subject}"</span> and will respond promptly.
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
                          placeholder="Enter your full name"
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
                          placeholder="Enter your email"
                          className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white placeholder-[#688D7E] text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition"
                        />
                        <Mail className="w-3.5 h-3.5 text-[#688D7E] absolute right-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: COMPANY / INSTITUTION */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#A6C0B4]">
                      {isRef ? 'Company Name' : 'Parent / Student Name'}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isRef ? "Enter your company name" : "Enter parent or student name"}
                        className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white placeholder-[#688D7E] text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition"
                      />
                      <Building2 className="w-3.5 h-3.5 text-[#688D7E] absolute right-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 3: SUBJECT DROPDOWN */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#A6C0B4]">Subject</label>
                    <div className="relative flex items-center">
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#13372B]/80 border border-[#214F3F] text-white text-xs px-3.5 py-2.5 rounded-xl pr-9 appearance-none focus:outline-none focus:border-[#86EFAC] focus:ring-1 focus:ring-[#86EFAC]/40 transition"
                      >
                        {isRef ? (
                          <>
                            <option value="Structural Health Monitoring" className="bg-[#0D2B20]">Structural Health Monitoring</option>
                            <option value="Environmental Compliance" className="bg-[#0D2B20]">Environmental Compliance</option>
                            <option value="Sensor Installation & IoT" className="bg-[#0D2B20]">Sensor Installation & IoT</option>
                            <option value="Request Customized Demo" className="bg-[#0D2B20]">Request Customized Demo</option>
                          </>
                        ) : (
                          <>
                            <option value="O-Level Admissions (S.1 - S.4)" className="bg-[#0D2B20]">O-Level Admissions (S.1 - S.4)</option>
                            <option value="A-Level Admissions (S.5 - S.6)" className="bg-[#0D2B20]">A-Level Admissions (S.5 - S.6)</option>
                            <option value="School Fees & Bursary Inquiry" className="bg-[#0D2B20]">School Fees & Bursary Inquiry</option>
                            <option value="USSSA Sports Academy & Talents" className="bg-[#0D2B20]">USSSA Sports Academy & Talents</option>
                            <option value="Boarding & Campus Visit" className="bg-[#0D2B20]">Boarding & Campus Visit</option>
                          </>
                        )}
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
                      placeholder="Write your message here..."
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
          <div className="lg:col-span-6 bg-[#F8F9F5] border border-slate-200/60 rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* LEFT SUB-COLUMN: TEXT & CONTACT LIST */}
              <div className="md:col-span-7 space-y-6">
                
                {/* HEADER */}
                <div className="space-y-2">
                  <span className="text-[#78887F] font-semibold text-[11px] uppercase tracking-[0.22em] block">
                    WE'RE HERE TO HELP
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-[#0D2B20] tracking-tight leading-tight">
                    Let's Build<br />
                    <span className="italic">Safer Tomorrow</span>
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    {isRef
                      ? "Our team is always ready to answer your questions and discuss how we can support your projects."
                      : "Our team is always ready to answer your questions and discuss how we can support your child's education."}
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
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Address</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5 leading-snug">
                        {isRef ? "3350 Virginia Street\nMiami, FL 33133" : SCHOOL_CONTACTS.location}
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5">
                        {isRef ? "info@envirostruct.com" : SCHOOL_CONTACTS.email}
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5">
                        {isRef ? "+1 (305) 123-4567" : `${SCHOOL_CONTACTS.phone1} / ${SCHOOL_CONTACTS.phone2}`}
                      </p>
                    </div>
                  </div>

                  {/* BUSINESS HOURS */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#0D2B20] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#0D2B20]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Hours</h5>
                      <p className="text-xs font-semibold text-[#0D2B20] mt-0.5 leading-snug">
                        {isRef ? (
                          <>Mon – Fri: 9:00 AM – 6:00 PM<br />Sat – Sun: Closed</>
                        ) : (
                          <>{SCHOOL_CONTACTS.hours}</>
                        )}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* RIGHT SUB-COLUMN: THE ARCH MASK WITH RELEVANT IMAGE */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative w-full max-w-[210px] h-[330px] rounded-t-full rounded-b-[24px] overflow-hidden shadow-2xl border-2 border-white/80 group">
                  
                  {/* ARCH IMAGE (MISTY EVERGREEN PINE FOREST & TOWER / SCENIC NATURE RELEVANT IMAGE) */}
                  <img
                    src="https://images.unsplash.com/photo-1511497584788-87676119230a?q=80&w=1200&auto=format&fit=crop"
                    alt="Scenic tower over misty pine forest"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  />

                  {/* AMBIENT GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B20]/60 via-transparent to-transparent pointer-events-none" />

                  {/* FLOATING BADGE INSIDE ARCH */}
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20 shadow">
                      {isRef ? '📡 Structural Station' : '🏫 STAHIZA Campus'}
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* MAP EXPAND LINK */}
            <div className="pt-4 mt-6 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {isRef ? "Miami Operations Center" : "Entebbe Road Campus, Zzana"}
              </span>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-xs font-bold text-[#0D2B20] hover:underline flex items-center gap-1.5"
              >
                <span>{showMap ? 'Hide Live Map' : 'View Campus Map'}</span>
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
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                {isRef ? 'Real-Time Monitoring' : 'UNEB Examination Center'}
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                {isRef ? 'Track. Detect. Act.' : 'Centre U1288 (O & A Level)'}
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                {isRef ? 'Reliable Insights' : 'Reliable Academic Mentorship'}
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                {isRef ? 'Data you can trust' : 'Deans & Distinction coaching'}
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                {isRef ? 'Built for the Future' : 'Built for the Future'}
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                {isRef ? 'Sustainable by design' : 'Holistic science & arts excellence'}
              </p>
            </div>
          </div>

          {/* ITEM 4 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/10">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">
                {isRef ? 'Global Impact' : 'USSSA Sports Powerhouse'}
              </h5>
              <p className="text-[11px] text-[#8EAFA0]">
                {isRef ? 'Solutions that make a difference' : 'National champions & leaders'}
              </p>
            </div>
          </div>

        </div>

        {/* EXPANDABLE GOOGLE MAP SECTION */}
        {showMap && (
          <div className="mt-4 pt-4 border-t border-slate-100 rounded-2xl overflow-hidden p-2 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Campus Location (Zzana, Entebbe Road)
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
