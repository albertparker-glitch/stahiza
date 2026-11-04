import React from 'react';
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface FooterProps {
  setActiveTab: (tab: any) => void;
  setApplyModalOpen: (open: boolean) => void;
}

const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setApplyModalOpen }) => {
  const [subscribed, setSubscribed] = React.useState(false);

  const socialLinks = [
    {
      name: 'Facebook',
      handle: '@STAHIZAZzana',
      url: 'https://facebook.com/STAHIZAZzana',
      icon: Facebook,
      color: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
      badge: 'Official Page'
    },
    {
      name: 'X (Twitter)',
      handle: '@STAHIZAZzana',
      url: 'https://x.com/STAHIZAZzana',
      icon: XIcon,
      color: 'hover:bg-slate-700 hover:border-slate-500',
      badge: 'Official Handle'
    },
    {
      name: 'Instagram',
      handle: '@stahiza_zzana',
      url: 'https://instagram.com/stahiza_zzana',
      icon: Instagram,
      color: 'hover:bg-[#E4405F] hover:border-[#E4405F]',
      badge: 'Campus Highlights'
    },
    {
      name: 'YouTube',
      handle: 'STAHIZA Media',
      url: 'https://youtube.com/@stahizazzana',
      icon: Youtube,
      color: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
      badge: 'Match & Gala Clips'
    }
  ];

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800">
        
        {/* COLUMN 1: ADDRESS & CONTACT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow shrink-0">
              <SchoolBadgeImg size={38} className="w-9 h-9" />
            </div>
            <h3 className="font-extrabold text-lg text-white font-['Montserrat'] leading-tight">Standard High School Zzana</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {SCHOOL_CONTACTS.box}
          </p>
          <div className="space-y-2 text-sm text-slate-300">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8A1C24]" /> {SCHOOL_CONTACTS.phone1}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8A1C24]" /> {SCHOOL_CONTACTS.phone2}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#8A1C24]" /> {SCHOOL_CONTACTS.email}
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
              { label: 'Campus Life & Directory', tab: 'campus' },
              { label: 'Contact Us', tab: 'contact' },
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    if (link.tab) setActiveTab(link.tab);
                    if (link.modal === 'apply') setApplyModalOpen(true);
                  }}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
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
            {SCHOOL_CONTACTS.location}. Easily accessible by public and private transport.
          </p>
          <div className="space-y-1 text-xs text-slate-400 pt-2">
            <p className="font-semibold text-slate-300">Office Hours:</p>
            <p>{SCHOOL_CONTACTS.hours}</p>
          </div>
          <div className="pt-2">
            <a
              href={SCHOOL_CONTACTS.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#600018] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find us on Google Maps</span>
            </a>
          </div>
        </div>

        {/* COLUMN 4: CONNECT & NEWSLETTER */}
        <div className="space-y-4">
          <h4 className="font-bold text-white text-base font-['Montserrat']">Stay Connected</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Follow our official social pages for match results, UNEB updates, and campus events.
          </p>
          
          {/* Quick Social Buttons */}
          <div className="flex items-center gap-2.5 pt-1">
            {socialLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${item.name} (${item.handle})`}
                  className={`w-10 h-10 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <div className="pt-2">
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold p-3 rounded-xl">
                Subscribed to STAHIZA updates!
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubscribed(true); }} className="space-y-2">
                <p className="text-xs text-slate-400 font-medium">STAHIZA Official Newsletter:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="bg-slate-800 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400 flex-1"
                  />
                  <button type="submit" className="bg-[#800020] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#600018] transition shrink-0 cursor-pointer">
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* DEDICATED SOCIAL MEDIA FOOTER STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-b border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#800020]/20 border border-[#800020]/40 text-amber-300 flex items-center justify-center shrink-0">
              <SchoolBadgeImg size={24} />
            </div>
            <div>
              <h5 className="text-xs font-extrabold font-['Montserrat'] text-white uppercase tracking-wider">
                Follow Official STAHIZA Social Channels
              </h5>
              <p className="text-[11px] text-slate-400">
                Join our online community on Facebook, X, Instagram, and YouTube.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {socialLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 hover:text-white transition-all duration-300 group ${item.color}`}
                >
                  <Icon className="w-4 h-4 text-amber-300 group-hover:text-white shrink-0" />
                  <div className="text-left truncate">
                    <div className="font-bold text-[11px] leading-tight truncate">{item.name}</div>
                    <div className="text-[9px] text-slate-400 group-hover:text-slate-200 truncate">{item.handle}</div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white shrink-0 ml-auto" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Standard High School Zzana (STAHIZA). All rights reserved.</p>
        <p className="text-amber-400/90 font-serif italic font-medium">"Education Is The Way"</p>
        <div className="flex items-center gap-6">
          <button onClick={() => setActiveTab('contact')} className="hover:text-white transition cursor-pointer">Admissions Office</button>
          <button onClick={() => setActiveTab('contact')} className="hover:text-white transition cursor-pointer">Contact Desk</button>
        </div>
      </div>
    </footer>
  );
};
