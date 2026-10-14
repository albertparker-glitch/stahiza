import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Menu, X, ArrowRight } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setApplyModalOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, setApplyModalOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'academics', label: 'Academics' },
    { id: 'sports', label: 'Sports & Talent' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className="bg-[#0A192F] text-slate-300 text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            <a href="tel:+256772831704" className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-[#8A1C24]" />
              <span>Office Desk: {SCHOOL_CONTACTS.phone1}</span>
            </a>
            <a href={`mailto:${SCHOOL_CONTACTS.email}`} className="flex items-center gap-1.5 hover:text-white transition border-2 border-rose-500 shadow-md px-2.5 py-1 rounded-lg bg-slate-800 text-rose-200">
              <Mail className="w-3.5 h-3.5 text-[#8A1C24]" />
              <span>{SCHOOL_CONTACTS.email}</span>
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
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700 relative">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg transition-colors relative ${
                    isActive ? 'text-white font-semibold' : 'text-slate-700 hover:text-[#0A192F]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[#0A192F] rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA APPLY BUTTON */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setApplyModalOpen(true)}
              className="bg-[#800020] hover:bg-[#600018] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition text-sm flex items-center gap-2"
            >
              <SchoolBadgeImg size={22} className="w-5 h-5" />
              <span>Apply Now</span>
            </motion.button>
          </div>

          {/* MOBILE BURGER TOGGLE */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#0A192F]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* MOBILE MENU DROPDOWN WITH MOTION */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl overflow-hidden"
            >
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                    activeTab === item.id ? 'bg-[#0A192F] text-white' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setApplyModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2.5 rounded-lg bg-[#800020] text-white font-semibold shadow"
                >
                  Apply Now 2027
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
