import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, ChevronRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { FooterVideoReel } from './FooterVideoReel';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface FooterProps {
  setActiveTab: (tab: any) => void;
  setApplyModalOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setApplyModalOpen }) => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pb-12 border-t border-slate-800">
      {/* VIDEO REEL AT THE TOP OF FOOTER */}
      <FooterVideoReel />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 pb-12 border-b border-slate-800">
        
        {/* COLUMN 1: ADDRESS & CONTACT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="p-2 bg-white rounded-xl shadow cursor-pointer"
            >
              <SchoolBadgeImg size={38} className="w-9 h-9" />
            </motion.div>
            <h3 className="font-extrabold text-lg text-white font-['Montserrat']">Standard High School Zzana</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {SCHOOL_CONTACTS.box}
          </p>
          <div className="space-y-2 text-sm text-slate-300">
            <a href="tel:+256772831704" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4 text-[#8A1C24]" /> {SCHOOL_CONTACTS.phone1}
            </a>
            <a href="tel:+256782316838" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4 text-[#8A1C24]" /> {SCHOOL_CONTACTS.phone2}
            </a>
            <a href={`mailto:${SCHOOL_CONTACTS.email}`} className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <Mail className="w-4 h-4 text-[#8A1C24]" /> {SCHOOL_CONTACTS.email}
            </a>
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
                <motion.button
                  whileHover={{ x: 4, color: "#FCD34D" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (link.tab) setActiveTab(link.tab);
                    if (link.modal === 'apply') setApplyModalOpen(true);
                  }}
                  className="transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A1C24]" />
                  <span>{link.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: HOW TO REACH US / LOCATION DIRECTIONS */}
        <div className="space-y-4">
          <h4 className="font-bold text-white text-base font-['Montserrat']">How to Reach Us</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            {SCHOOL_CONTACTS.location}. Easily accessible by public and private transport.
          </p>
          <div className="space-y-1 text-xs text-slate-400 pt-2">
            <p className="font-semibold text-slate-300">Office Hours:</p>
            <p>{SCHOOL_CONTACTS.hours}</p>
          </div>
          <div className="pt-2">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://maps.google.com/?q=Zzana+Entebbe+Road+Kampala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#600018] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find us on Google Maps</span>
            </motion.a>
          </div>
        </div>

        {/* COLUMN 4: CONNECT & SOCIALS */}
        <div className="space-y-4">
          <h4 className="font-bold text-white text-base font-['Montserrat']">Connect & Socials</h4>
          <p className="text-slate-400 text-sm">Follow our daily updates, sports matches, and school events.</p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Youtube, label: 'YouTube' }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#800020] text-white flex items-center justify-center transition shadow-sm"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          <div className="pt-2">
            <form onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing to STAHIZA newsletter!'); }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none flex-1"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow"
              >
                Join
              </motion.button>
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
  );
};
