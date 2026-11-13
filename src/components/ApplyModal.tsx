import React, { useState } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { ALL_SCIENCE_COMBINATIONS, POPULAR_ARTS_COMBINATIONS } from '../data/aLevelCombinations';
import { ClassLevel, ResidenceType, AdmissionApplication } from '../types/admission';
import { submitNewApplication } from '../lib/admissionStore';
import { dispatchApplicationEmail, EmailSendResult } from '../lib/emailService';
import { BrandedEmailReadyCard } from './BrandedEmailReadyCard';
import { motion, AnimatePresence } from 'motion/react';

const SCIENCE_COMBO_OPTIONS = ALL_SCIENCE_COMBINATIONS.map(
  (c) => `${c.code} (${c.subjects.join(', ')})`
);
const ARTS_COMBO_OPTIONS = POPULAR_ARTS_COMBINATIONS.map(
  (c) => `${c.code} (${c.subjects.join(', ')})`
);

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
    gender: 'Male' as 'Male' | 'Female',
    parentName: '',
    phone: '',
    email: '',
    selectedClass: 'S.1' as ClassLevel,
    boardingStatus: 'Boarding' as ResidenceType,
    combination: SCIENCE_COMBO_OPTIONS[0],
    previousSchool: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AdmissionApplication | null>(null);
  const [emailResult, setEmailResult] = useState<EmailSendResult | null>(null);

  const resetModalState = () => {
    setSubmittedRecord(null);
    setEmailResult(null);
    setApplyForm({
      studentName: '',
      gender: 'Male',
      parentName: '',
      phone: '',
      email: '',
      selectedClass: 'S.1',
      boardingStatus: 'Boarding',
      combination: SCIENCE_COMBO_OPTIONS[0],
      previousSchool: '',
      notes: ''
    });
  };

  const handleClose = () => {
    onClose();
    resetModalState();
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.studentName || !applyForm.phone || !applyForm.email) return;

    setIsSubmitting(true);
    try {
      const isUpperSecondary = applyForm.selectedClass === 'S.5' || applyForm.selectedClass === 'S.6';

      const created = submitNewApplication({
        studentName: applyForm.studentName,
        gender: applyForm.gender,
        targetClass: applyForm.selectedClass,
        residenceType: applyForm.boardingStatus,
        combination: isUpperSecondary ? applyForm.combination : undefined,
        parentName: applyForm.parentName,
        parentPhone: applyForm.phone,
        parentEmail: applyForm.email,
        previousSchool: applyForm.previousSchool || 'Primary/Secondary School',
        sourceForm: 'Quick Apply Modal',
        notes: applyForm.notes || undefined
      });

      const result = await dispatchApplicationEmail(created);

      setEmailResult(result);
      setSubmittedRecord(created);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    if (!submittedRecord) return 'https://wa.me/256772831704';
    const text = `Hello STAHIZA Admissions Office, I have submitted an online application for ${submittedRecord.studentName} (${submittedRecord.targetClass}, ${submittedRecord.residenceType} Section). Reference Code: ${submittedRecord.id}.`;
    return `https://wa.me/256772831704?text=${encodeURIComponent(text)}`;
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl relative my-8 z-10 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedRecord && emailResult ? (
              <div className="pt-2">
                <BrandedEmailReadyCard
                  variant="modal"
                  emailResult={emailResult}
                  headline={`Application Ready — ${submittedRecord.studentName}`}
                  subline={`Your branded STAHIZA admission email (${submittedRecord.targetClass}, ${submittedRecord.residenceType}) for ${SCHOOL_CONTACTS.email} is ready below.`}
                  whatsappUrl={getWhatsAppUrl()}
                  resetLabel="New Form"
                  onReset={resetModalState}
                  onClose={handleClose}
                />
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                
                {/* MODAL HEADER */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                    <SchoolBadgeImg size={44} className="w-11 h-11" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-[#800020] dark:text-rose-400 uppercase tracking-widest block">
                      Standard High School Zzana (Code: 2624)
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      Online Application Form (S.1 – S.6)
                    </h3>
                  </div>
                </div>

                {/* NAMES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applyForm.studentName}
                      onChange={e => setApplyForm({ ...applyForm, studentName: e.target.value })}
                      placeholder="e.g. Mukasa Jonathan"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={applyForm.parentName}
                      onChange={e => setApplyForm({ ...applyForm, parentName: e.target.value })}
                      placeholder="e.g. Dr. Sarah Mukasa"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* PHONE & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={applyForm.phone}
                      onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                      placeholder="e.g. +256 772 831 704"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Parent Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                      placeholder="e.g. parent@gmail.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* CLASS, ATTENDANCE & GENDER */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Class (S.1 to S.6) *</label>
                    <select
                      value={applyForm.selectedClass}
                      onChange={e => setApplyForm({ ...applyForm, selectedClass: e.target.value as ClassLevel })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      <option value="S.1">Senior One (S.1)</option>
                      <option value="S.2">Senior Two (S.2)</option>
                      <option value="S.3">Senior Three (S.3)</option>
                      <option value="S.4">Senior Four (S.4)</option>
                      <option value="S.5">Senior Five (S.5)</option>
                      <option value="S.6">Senior Six (S.6)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Attendance Option *</label>
                    <select
                      value={applyForm.boardingStatus}
                      onChange={e => setApplyForm({ ...applyForm, boardingStatus: e.target.value as ResidenceType })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      <option value="Boarding">Boarding Section</option>
                      <option value="Day">Day Section</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gender *</label>
                    <select
                      value={applyForm.gender}
                      onChange={e => setApplyForm({ ...applyForm, gender: e.target.value as 'Male' | 'Female' })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Previous School Attended</label>
                  <input
                    type="text"
                    value={applyForm.previousSchool}
                    onChange={e => setApplyForm({ ...applyForm, previousSchool: e.target.value })}
                    placeholder="e.g. Kampala Parents / Previous Secondary School"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                {/* A-LEVEL COMBINATION */}
                {isALevel && (
                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-amber-300 mb-1">A-Level Combination</label>
                    <select
                      value={applyForm.combination}
                      onChange={e => setApplyForm({ ...applyForm, combination: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      <optgroup label="Sciences & Technical Combinations">
                        {SCIENCE_COMBO_OPTIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Arts & Humanities Combinations">
                        {ARTS_COMBO_OPTIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#800020] hover:bg-[#600018] text-white font-extrabold rounded-xl shadow-lg transition text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Sending Application to {SCHOOL_CONTACTS.email}...</span>
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Submit Application Form to School Admin</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                  Submitting copies the finished STAHIZA badge email and opens Gmail (PC) or Mail (Mobile) — press <strong className="text-slate-700 dark:text-slate-200">Ctrl+V</strong> / <strong className="text-slate-700 dark:text-slate-200">Paste</strong> inside the empty draft to send.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplyModal;
