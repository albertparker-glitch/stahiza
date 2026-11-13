import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  User, 
  ChevronDown, 
  ExternalLink,
  GraduationCap,
  Trophy,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { dispatchContactInquiryEmail, EmailSendResult } from '../lib/emailService';
import { BrandedEmailReadyCard } from './BrandedEmailReadyCard';
import { getSupabaseVideoUrl, getSupabaseVideosUrl, getSupabasePublicUrl } from '../lib/supabase';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'O-Level Admissions (Senior 1 - Senior 4)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailResult, setEmailResult] = useState<EmailSendResult | null>(null);
  const [showMap, setShowMap] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await dispatchContactInquiryEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setEmailResult(result);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#F8FAFC] py-10 sm:py-16 px-3 sm:px-6 lg:px-8 font-['Inter',sans-serif] text-slate-800"
    >
      
      {/* MASTER CARD CONTAINER - STAHIZA BRAND THEME */}
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-slate-200/90 p-4 sm:p-6 lg:p-7 space-y-6">
        
        {/* TOP BRAND & NAVIGATION BAR */}
        <header className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-b border-slate-100">
          {/* LOGO & BRAND */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <SchoolBadgeImg size={34} />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-[#0A192F] tracking-tight font-['Montserrat']">
                Standard High School Zzana
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#800020] font-semibold">
                STAHIZA • Education Is The Way
              </p>
            </div>
          </div>

          {/* CENTER NAVIGATION STATUS */}
          <nav className="hidden md:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-slate-600">
            <span className="text-slate-500">Admissions Office</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Entebbe Road Campus</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#800020] font-bold border-b-2 border-[#800020] pb-1">Contact & Inquiries</span>
          </nav>

          {/* RIGHT CTA & STATUS INDICATOR */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('contact-form-heading');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-full transition flex items-center gap-1.5 shadow"
            >
              <span>Admissions Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
            <div 
              title="Admissions 2027 Open"
              className="w-8 h-8 rounded-full bg-[#0A192F] text-amber-300 flex items-center justify-center text-xs shadow shrink-0"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </header>

        {/* MAIN BODY: SPLIT PANELS (NAVY BLUE LEFT & CRISP SLATE RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT PANEL: STAHIZA DEEP NAVY BLUE CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] rounded-[24px] sm:rounded-[28px] p-6 sm:p-9 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-slate-700/60"
          >
            
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
                <span className="text-amber-300 font-bold text-[11px] uppercase tracking-[0.22em] block">
                  LET'S CONNECT
                </span>
                <h3 id="contact-form-heading" className="text-3xl sm:text-4xl lg:text-[40px] font-['Montserrat'] font-extrabold text-white tracking-tight leading-tight">
                  Get in Touch
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed max-w-md">
                  Inquire about admissions, school fees, subject combinations, or book a campus visit.
                </p>
              </div>

              {/* FORM */}
              {submitted && emailResult ? (
                <BrandedEmailReadyCard
                  variant="dark"
                  emailResult={emailResult}
                  headline="Inquiry Letter Ready to Send"
                  subline={`Thank you, ${formData.name}. Your branded STAHIZA inquiry regarding "${formData.subject}" to ${SCHOOL_CONTACTS.email} is previewed and copied below.`}
                  resetLabel="New Inquiry"
                  onReset={() => {
                    setSubmitted(false);
                    setEmailResult(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'O-Level Admissions (Senior 1 - Senior 4)',
                      message: ''
                    });
                  }}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                  
                  {/* ROW 1: NAME & EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-300">Your Name</label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Mukasa (Parent)"
                          className="w-full bg-[#0A192F]/80 border border-slate-600/80 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition"
                        />
                        <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-300">Your Email</label>
                      <div className="relative flex items-center">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. parent@example.com"
                          className="w-full bg-[#0A192F]/80 border border-slate-600/80 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition"
                        />
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: PHONE NUMBER */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-300">Phone / WhatsApp Number</label>
                    <div className="relative flex items-center">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +256 700 000 000"
                        className="w-full bg-[#0A192F]/80 border border-slate-600/80 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl pr-9 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition"
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 3: SUBJECT DROPDOWN */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-300">Inquiry Subject</label>
                    <div className="relative flex items-center">
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#0A192F] border border-slate-600/80 text-white text-xs px-3.5 py-2.5 rounded-xl pr-9 appearance-none focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition cursor-pointer"
                      >
                        <option value="O-Level Admissions (Senior 1 - Senior 4)" className="bg-[#0A192F]">O-Level Admissions (Senior 1 - Senior 4)</option>
                        <option value="A-Level Admissions (Senior 5 - Senior 6)" className="bg-[#0A192F]">A-Level Admissions (Senior 5 - Senior 6)</option>
                        <option value="School Fees, Bursaries & Bank Slips" className="bg-[#0A192F]">School Fees, Bursaries & Bank Slips</option>
                        <option value="USSSA Sports Academy & Talent Trials" className="bg-[#0A192F]">USSSA Sports Academy & Talent Trials</option>
                        <option value="Boarding Facilities & Campus Visit" className="bg-[#0A192F]">Boarding Facilities & Campus Visit</option>
                        <option value="Academic Inquiries & UNEB Results" className="bg-[#0A192F]">Academic Inquiries & UNEB Results</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 4: MESSAGE */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-300">Your Message</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the student, entry class, boarding preferences, or any specific inquiries..."
                      className="w-full bg-[#0A192F]/80 border border-slate-600/80 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON WITH ARROW IN CIRCLE */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold pl-5 pr-2 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3 transform hover:-translate-y-0.5 border border-rose-400/30 disabled:opacity-60 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Opening Mail Template...' : 'Send Message'}</span>
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-[#0A192F] flex items-center justify-center font-bold">
                        {isSubmitting ? (
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>
                  </div>

                </form>
              )}
            </div>

          </motion.div>

          {/* RIGHT PANEL: CRISP STAHIZA CONTACT DETAILS WITH ARCH-CUTOUT RELEVANT IMAGE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 bg-slate-50 border border-slate-200/90 rounded-[24px] sm:rounded-[28px] p-6 sm:p-9 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* LEFT SUB-COLUMN: TEXT & CONTACT LIST */}
              <div className="md:col-span-7 space-y-6">
                
                {/* HEADER */}
                <div className="space-y-2">
                  <span className="text-[#800020] font-bold text-[11px] uppercase tracking-[0.22em] block">
                    WE'RE HERE TO HELP
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-['Montserrat'] font-extrabold text-[#0A192F] tracking-tight leading-tight">
                    Empowering Minds,<br />
                    <span className="italic font-serif text-[#800020]">Building Character</span>
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    Our administrative and admissions team is ready to assist parents, guardians, and prospective learners.
                  </p>
                </div>

                {/* CONTACT DETAILS LIST WITH ROUNDED ICON BUTTONS */}
                <div className="space-y-4 pt-1">
                  
                  {/* ADDRESS */}
                  <div className="flex items-start gap-3.5">
                    <a 
                      href={SCHOOL_CONTACTS.mapsSearchUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#800020] hover:bg-[#800020] hover:text-white flex items-center justify-center shrink-0 transition"
                      title="Pinpoint Standard High School Zzana on Google Maps"
                    >
                      <MapPin className="w-4 h-4" />
                    </a>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <span>Campus Address</span>
                        <ExternalLink className="w-2.5 h-2.5 text-[#800020]" />
                      </h5>
                      <a 
                        href={SCHOOL_CONTACTS.mapsSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#0A192F] hover:text-[#800020] mt-0.5 leading-snug block transition"
                      >
                        {SCHOOL_CONTACTS.location}
                      </a>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {SCHOOL_CONTACTS.box}
                      </span>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#800020] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#800020]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Inquiries</h5>
                      <p className="text-xs font-bold text-[#800020] mt-0.5">
                        <a href={`mailto:${SCHOOL_CONTACTS.email}`} className="hover:underline">
                          {SCHOOL_CONTACTS.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#800020] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#800020]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Office Lines</h5>
                      <p className="text-xs font-bold text-[#0A192F] mt-0.5 leading-snug">
                        <a href={`tel:${SCHOOL_CONTACTS.phone1.replace(/\s+/g, '')}`} className="hover:text-[#800020] transition">
                          {SCHOOL_CONTACTS.phone1}
                        </a>
                        <br />
                        <a href={`tel:${SCHOOL_CONTACTS.phone2.replace(/\s+/g, '')}`} className="hover:text-[#800020] text-slate-600 transition">
                          {SCHOOL_CONTACTS.phone2}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* BUSINESS HOURS */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 text-[#800020] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#800020]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Office Hours</h5>
                      <p className="text-xs font-bold text-[#0A192F] mt-0.5 leading-snug">
                        {SCHOOL_CONTACTS.hours}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        Sunday: Closed
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* RIGHT SUB-COLUMN: THE ARCH MASK WITH CAMPUS IMAGE */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative w-full max-w-[210px] h-[330px] rounded-t-full rounded-b-[24px] overflow-hidden shadow-2xl border-2 border-white group">
                  
                  {/* ARCH VIDEO (REPLACED WITH images/video/back4.mp4 FROM SUPABASE) */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 bg-slate-900"
                  >
                    <source src={getSupabaseVideoUrl("video/back4.mp4")} type="video/mp4" />
                    <source src={getSupabaseVideosUrl("back4.mp4")} type="video/mp4" />
                    <source src={getSupabasePublicUrl("back4.mp4")} type="video/mp4" />
                    <source src="/pages/images/back.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* AMBIENT GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-transparent to-transparent pointer-events-none" />

                  {/* FLOATING BADGE INSIDE ARCH */}
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block bg-[#0A192F]/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow">
                      STAHIZA Campus, Zzana
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* MAP EXPAND LINK */}
            <div className="pt-4 mt-6 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Entebbe Road Campus, Zzana
              </span>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-xs font-bold text-[#800020] hover:text-[#600018] flex items-center gap-1.5 transition"
              >
                <span>{showMap ? 'Hide Map' : 'View Campus Map'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>

        </div>

        {/* BOTTOM FULL-WIDTH 4-FEATURE PILL BAR - STAHIZA BRAND GRADIENT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-gradient-to-r from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shadow-xl border border-slate-800"
        >
          
          {/* ITEM 1 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/15">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white font-['Montserrat']">
                UNEB Examination Center
              </h5>
              <p className="text-[11px] text-slate-300">
                Centre {SCHOOL_CONTACTS.centerNo} (O & A Level)
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/15">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white font-['Montserrat']">
                Academic Mentorship
              </h5>
              <p className="text-[11px] text-slate-300">
                Experienced UNEB examiners
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/15">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white font-['Montserrat']">
                Boarding & Discipline
              </h5>
              <p className="text-[11px] text-slate-300">
                Supervised student hostels
              </p>
            </div>
          </div>

          {/* ITEM 4 */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/15">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white font-['Montserrat']">
                USSSA Champions
              </h5>
              <p className="text-[11px] text-slate-300">
                National sports powerhouses
              </p>
            </div>
          </div>

        </motion.div>

        {/* ALWAYS VISIBLE GOOGLE MAP SECTION */}
        {showMap && (
          <div className="mt-4 pt-4 border-t border-slate-200/90 rounded-2xl overflow-hidden p-2 space-y-3 bg-slate-50/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#800020] text-amber-300 flex items-center justify-center font-bold shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0A192F] font-['Montserrat']">
                    Exact Campus Location: Standard High School Zzana
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Along Entebbe Road, Zzana (1 km off Zzana Roundabout), Wakiso District
                  </span>
                </div>
              </div>

              <a
                href={SCHOOL_CONTACTS.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white bg-[#800020] hover:bg-[#600018] px-4 py-2 rounded-full flex items-center gap-1.5 transition shadow-sm shrink-0"
              >
                <span>Pinpoint on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300/80 shadow-md relative group">
              <iframe
                title="Standard High School Zzana Location Map"
                src={SCHOOL_CONTACTS.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full h-full"
              />
              <div className="absolute top-3 right-3 bg-[#0A192F]/90 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-3 py-1.5 rounded-xl border border-white/20 shadow pointer-events-none">
                STAHIZA Campus Pin (Entebbe Road)
              </div>
            </div>
          </div>
        )}

      </div>

    </motion.div>
  );
};
