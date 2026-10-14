import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <SchoolBadgeImg size={56} className="mx-auto" />
        <span className="text-[#800020] font-bold uppercase tracking-wider text-sm block">Let's Connect</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A192F]">
          Get in Touch With STAHIZA
        </h2>
        <p className="text-slate-600 text-base">
          Have a question, need admissions support, or want to plan a visit? We're here to help.
        </p>
      </motion.div>

      {/* SPLIT CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* LEFT PANEL: GET IN TOUCH FORM */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-amber-300 text-xs font-semibold">
              <SchoolBadgeImg size={20} className="w-5 h-5" /> Direct Inquiry Desk
            </div>
            <h3 className="text-3xl font-extrabold font-['Montserrat'] tracking-tight">Get in Touch</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Fill out the form below and our administrative office will respond within 24 hours.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20 }}
                className="py-16 text-center space-y-4 my-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, damping: 12 }}
                  className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full mx-auto flex items-center justify-center border border-emerald-500/40"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <h4 className="text-2xl font-bold font-['Montserrat'] text-white">Message Sent Successfully!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <span className="font-bold text-amber-300">{formData.name}</span>. Your inquiry has been forwarded to the STAHIZA admissions desk. We will call you at <span className="font-bold text-amber-300">{formData.phone}</span> shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form 
                key="form-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-5 pt-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+256 ..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Subject / Program *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. A-Level Admissions"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-[#800020] hover:bg-[#600018] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition flex items-center gap-3 text-sm"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="pt-8 mt-8 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-4">
            <span>Official STAHIZA Portal</span>
            <span>Education Is The Way</span>
            <span>Kampala, Uganda</span>
          </div>
        </div>

        {/* RIGHT PANEL: SCENIC NATURE PHOTO */}
        <div className="lg:col-span-5 relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1511497584788-87676119230a?q=80&w=1200&auto=format&fit=crop" 
              alt="Scenic Nature" 
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/85 to-white/60 backdrop-blur-[1px]"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#800020] uppercase tracking-wider">We're Here To Help</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                Let's Build Safer Tomorrow
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                Our team is always ready to answer your questions and discuss how we can support your academic journey.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                { icon: MapPin, title: "Address", desc: "Entebbe Road, Zzana/Nyanama, Kampala" },
                { icon: Mail, title: "Email", desc: SCHOOL_CONTACTS.email },
                { icon: Phone, title: "Phone", desc: `${SCHOOL_CONTACTS.phone1} / ${SCHOOL_CONTACTS.phone2}` },
                { icon: Clock, title: "Business Hours", desc: "Mon – Fri: 7:30 AM – 5:00 PM | Sat: 9:00 AM – 1:00 PM" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-slate-200 hover:shadow-md transition"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#800020] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">{item.title}</h4>
                    <p className="text-[#0A192F] font-semibold text-xs mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-200/80">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://maps.google.com/?q=Zzana+Entebbe+Road+Kampala"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#0A192F] hover:bg-[#163c6c] text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Open Campus Map Directions</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* LIVE GOOGLE MAP EMBED SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
          <div>
            <span className="text-xs font-bold text-[#800020] uppercase tracking-wider">Interactive Location</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-[#0A192F]">Live Google Map - STAHIZA Zzana</h3>
            <p className="text-slate-500 text-sm">Entebbe Road, Zzana / Nyanama, Kampala - Uganda</p>
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://maps.google.com/?q=Standard+High+School+Zzana+Entebbe+Road+Kampala"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A192F] hover:bg-[#163c6c] text-white text-xs font-bold rounded-xl shadow-lg transition whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 text-amber-300" /> Open Larger Map in Google
          </motion.a>
        </div>
        <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
          <iframe
            title="Standard High School Zzana Map Location"
            src="https://maps.google.com/maps?q=Standard+High+School+Zzana+Entebbe+Road+Kampala&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};
