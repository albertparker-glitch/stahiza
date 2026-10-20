import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, Search } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setApplyModalOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, setApplyModalOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isExpanded = isSearchFocused || isSearchHovered || searchOpen || searchQuery.trim().length > 0;

  const searchItems = [
    { title: 'Admissions 2027 / Apply Online', category: 'Admissions', tab: 'home', action: () => setApplyModalOpen(true) },
    { title: 'Academics & UNEB Programs (Arts & Sciences)', category: 'Academics', tab: 'academics' },
    { title: 'O-Level & A-Level Curriculum', category: 'Academics', tab: 'academics' },
    { title: 'USSSA Football & Sports Champions', category: 'Sports', tab: 'sports' },
    { title: 'Basketball & Netball Teams', category: 'Sports', tab: 'sports' },
    { title: 'Music, Dance & Drama (MDD)', category: 'Sports', tab: 'sports' },
    { title: 'School Leadership & Administration', category: 'Leadership', tab: 'leadership' },
    { title: 'Headteacher Mr. Kurahuka Ostricast', category: 'Leadership', tab: 'leadership' },
    { title: 'Campus Facilities & Computer Lab', category: 'Campus', tab: 'campus' },
    { title: 'Contact Us & Office Desk', category: 'Contact', tab: 'contact' },
    { title: 'Location along Entebbe Road Zzana', category: 'Contact', tab: 'contact' },
  ];

  const filteredSearch = searchQuery.trim() === '' ? [] : searchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex flex-row flex-nowrap justify-between items-center gap-2 sm:gap-4 w-full">
          
          {/* LOGO & BRANDING */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
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

          {/* DESKTOP NAV LINKS (SINGLE LINE, PREVENTS WRAPPING) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 font-medium text-xs xl:text-sm text-slate-700 whitespace-nowrap flex-nowrap shrink-0">
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
                className={`px-3 xl:px-4 py-2 rounded-lg transition whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'bg-[#0A192F] text-white font-semibold shadow-sm' 
                    : 'hover:bg-slate-100 hover:text-[#0A192F]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* GLOBAL SEARCH & CTA APPLY */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* MINIMIZED SEARCH COMPONENT: EXPANDS ON TAP OR HOVER */}
            <div 
              className="relative" 
              ref={searchRef}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => {
                if (!isSearchFocused && !searchQuery) {
                  setIsSearchHovered(false);
                }
              }}
            >
              <div 
                onClick={() => {
                  setIsSearchFocused(true);
                  setSearchOpen(true);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                className={`flex items-center bg-slate-100 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-[#0A192F] transition-all duration-300 ease-out cursor-pointer h-10 ${
                  isExpanded 
                    ? 'w-44 sm:w-56 lg:w-64 px-3 bg-white shadow-md' 
                    : 'w-10 px-0 justify-center hover:bg-slate-200/80 hover:scale-105'
                }`}
              >
                <Search className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isExpanded ? 'mr-2' : ''}`} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search STAHIZA..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    setSearchOpen(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsSearchFocused(false);
                      if (!searchQuery) setIsSearchHovered(false);
                    }, 200);
                  }}
                  className={`bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                    isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0 pointer-events-none'
                  }`}
                />
                {isExpanded && searchQuery && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                      inputRef.current?.focus();
                    }} 
                    className="text-slate-400 hover:text-slate-600 text-xs shrink-0 ml-1 p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Dropdown Results */}
              {searchOpen && filteredSearch.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Search Results ({filteredSearch.length})
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {filteredSearch.map((res, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab(res.tab);
                          if (res.action) res.action();
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#0A192F] group-hover:text-[#800020] transition">
                            {res.title}
                          </div>
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {res.category}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0A192F] group-hover:translate-x-0.5 transition shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="bg-[#800020] hover:bg-[#600018] text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <SchoolBadgeImg size={20} className="w-5 h-5" />
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
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-6 py-6 space-y-3 shadow-2xl z-50">
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
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition text-sm sm:text-base ${
                  activeTab === item.id ? 'bg-[#0A192F] text-white shadow' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setApplyModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full text-center py-3 rounded-xl bg-[#800020] text-white font-bold shadow-md text-sm sm:text-base"
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
