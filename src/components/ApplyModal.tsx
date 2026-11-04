import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Printer, FileText } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { motion, AnimatePresence } from 'motion/react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToAdmissions?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ 
  isOpen, 
  onClose,
  onNavigateToAdmissions
}) => {
  const [applyForm, setApplyForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    selectedClass: 'S.1',
    boardingStatus: 'Boarding',
    combination: 'PCM / ICT (Physics, Chemistry, Mathematics)',
    previousSchool: '',
    notes: ''
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
  };

  const isALevel = applyForm.selectedClass === 'S.5' || applyForm.selectedClass === 'S.6';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-['Inter',sans-serif]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => { onClose(); setApplySubmitted(false); }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl relative my-8 z-10 border border-slate-200"
          >
            <button
              onClick={() => { onClose(); setApplySubmitted(false); }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {applySubmitted ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-[#800020]">
                    <SchoolBadgeImg size={20} /> STAHIZA Admissions Office
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0A192F] font-['Montserrat']">
                    Application Successfully Logged!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-[#0A192F]">{applyForm.parentName}</span>. We have received the <span className="font-bold text-[#800020]">{applyForm.selectedClass} ({applyForm.boardingStatus})</span> application for <span className="font-bold text-[#0A192F]">{applyForm.studentName}</span>. Our desk will call you at <span className="font-bold font-mono text-[#0A192F]">{applyForm.phone}</span>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  {onNavigateToAdmissions && (
                    <button
                      onClick={() => {
                        onClose();
                        setApplySubmitted(false);
                        onNavigateToAdmissions();
                      }}
                      className="px-6 py-3 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-xl shadow-lg transition text-xs flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>View Printable Admission Offer Letter</span>
                    </button>
                  )}
                  <button
                    onClick={() => { onClose(); setApplySubmitted(false); }}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                
                {/* MODAL HEADER WITH SCHOOL LOGO */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                    <SchoolBadgeImg size={48} className="w-12 h-12" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-[#800020] uppercase tracking-widest block">
                      Standard High School Zzana
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] font-['Montserrat']">
                      Online Application Form (S.1 – S.6)
                    </h3>
                  </div>
                </div>

                {/* ROW 1: NAMES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applyForm.studentName}
                      onChange={e => setApplyForm({ ...applyForm, studentName: e.target.value })}
                      placeholder="e.g. Mukasa Jonathan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A192F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={applyForm.parentName}
                      onChange={e => setApplyForm({ ...applyForm, parentName: e.target.value })}
                      placeholder="e.g. Dr. Sarah Mukasa"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A192F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* ROW 2: PHONE & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={applyForm.phone}
                      onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                      placeholder="e.g. +256 772 831 704"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A192F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={applyForm.email}
                      onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                      placeholder="e.g. parent@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A192F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* ROW 3: CLASS & BOARDING SELECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class Applying For (S.1 to S.6) *</label>
                    <select
                      value={applyForm.selectedClass}
                      onChange={e => setApplyForm({ ...applyForm, selectedClass: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-bold text-[#0A192F] focus:ring-2 focus:ring-[#0A192F] focus:outline-none cursor-pointer"
                    >
                      <option value="S.1">Senior One (S.1 - O-Level)</option>
                      <option value="S.2">Senior Two (S.2 - O-Level)</option>
                      <option value="S.3">Senior Three (S.3 - O-Level)</option>
                      <option value="S.4">Senior Four (S.4 - O-Level)</option>
                      <option value="S.5">Senior Five (S.5 - A-Level)</option>
                      <option value="S.6">Senior Six (S.6 - A-Level)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Attendance Option *</label>
                    <select
                      value={applyForm.boardingStatus}
                      onChange={e => setApplyForm({ ...applyForm, boardingStatus: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-bold text-[#0A192F] focus:ring-2 focus:ring-[#0A192F] focus:outline-none cursor-pointer"
                    >
                      <option value="Boarding">Boarding Student (Hostel & Meals)</option>
                      <option value="Day">Day Student (Day Scholar)</option>
                    </select>
                  </div>
                </div>

                {/* A-LEVEL COMBINATION (IF S5 OR S6) */}
                {isALevel && (
                  <div>
                    <label className="block text-xs font-bold text-[#0A192F] mb-1">A-Level Combination</label>
                    <select
                      value={applyForm.combination}
                      onChange={e => setApplyForm({ ...applyForm, combination: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-xs font-bold text-[#0A192F] focus:ring-2 focus:ring-[#0A192F] focus:outline-none cursor-pointer"
                    >
                      <option value="PCM / ICT (Physics, Chemistry, Mathematics)">PCM / ICT (Sciences)</option>
                      <option value="BCM / Sub-Math (Biology, Chemistry, Mathematics)">BCM / Sub-Math (Sciences)</option>
                      <option value="PCB / Sub-Math (Physics, Chemistry, Biology)">PCB / Sub-Math (Medical Sciences)</option>
                      <option value="PEM / ICT (Physics, Economics, Mathematics)">PEM / ICT (Engineering)</option>
                      <option value="HEG / Sub-Math (History, Economics, Geography)">HEG / Sub-Math (Arts & Humanities)</option>
                      <option value="MEG / ICT (Mathematics, Economics, Geography)">MEG / ICT (Business & Economics)</option>
                      <option value="HED / Sub-Math (History, Economics, Divinity)">HED / Sub-Math (Arts & Law)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Previous School Attended</label>
                  <input
                    type="text"
                    value={applyForm.previousSchool}
                    onChange={e => setApplyForm({ ...applyForm, previousSchool: e.target.value })}
                    placeholder="Name of primary or secondary school"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A192F] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#800020] hover:bg-[#600018] text-white font-extrabold rounded-xl shadow-lg transition text-xs uppercase tracking-wider font-['Montserrat'] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Submit Application to STAHIZA Desk</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
