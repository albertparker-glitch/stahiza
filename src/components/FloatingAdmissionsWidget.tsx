import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { Phone, GraduationCap, X, ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface FloatingAdmissionsWidgetProps {
  onApplyClick: () => void;
  onContactClick: () => void;
}

export const FloatingAdmissionsWidget: React.FC<FloatingAdmissionsWidgetProps> = ({
  onApplyClick,
  onContactClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: 300, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 300, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-l-3xl p-5 mr-0 w-72 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SchoolBadgeImg size={24} className="w-6 h-6" />
                <span className="font-extrabold text-xs font-['Montserrat'] text-[#0A192F] uppercase tracking-wider">
                  Admissions Hub
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 transition"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Start your journey at STAHIZA. 2027 enrollment is open for O-Level & A-Level.
            </p>

            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onApplyClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#800020] text-white font-bold text-xs shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply For Admissions</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${SCHOOL_CONTACTS.phone1}`}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A192F] text-white font-semibold text-xs shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Call Admissions Desk</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onContactClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#800020]" />
                  <span>Inquire / Campus Visit</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -4, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-b from-[#800020] to-[#600018] text-white py-3.5 px-4 rounded-l-2xl shadow-2xl cursor-pointer group border-l-2 border-y-2 border-amber-400/30"
          >
            <ChevronLeft className="w-4 h-4 text-amber-300 group-hover:-translate-x-0.5 transition-transform" />
            <div className="flex items-center gap-2">
              <SchoolBadgeImg size={20} className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <div className="text-[11px] font-black uppercase tracking-wider font-['Montserrat'] leading-tight">
                  Inquire & Apply
                </div>
                <div className="text-[9px] text-amber-200/90 font-medium leading-none">
                  Admissions 2027
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
