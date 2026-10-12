import React, { useState } from 'react';
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
                onClick={() => setActiveTab(item.id)}
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
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
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
    </>
  );
};
