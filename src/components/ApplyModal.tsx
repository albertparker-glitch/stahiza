import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, MessageCircle, Mail, Clock, Copy, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { ALL_SCIENCE_COMBINATIONS, POPULAR_ARTS_COMBINATIONS } from '../data/aLevelCombinations';
import { ClassLevel, ResidenceType, AdmissionApplication } from '../types/admission';
import { submitNewApplication } from '../lib/admissionStore';
import { dispatchApplicationEmail, EmailSendResult } from '../lib/emailService';
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
  const [isResending, setIsResending] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AdmissionApplication | null>(null);
  const [emailResult, setEmailResult] = useState<EmailSendResult | null>(null);

  const resetModalState = () => {
    setSubmittedRecord(null);
    setEmailResult(null);
    setCopiedSummary(false);
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

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.studentName || !applyForm.phone || !applyForm.email) return;

    setIsSubmitting(true);
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

    const result = dispatchApplicationEmail(created);

    setIsSubmitting(false);
    setEmailResult(result);
    setSubmittedRecord(created);
  };

  const handleResendEmail = () => {
    if (!submittedRecord || isResending) return;
    setIsResending(true);
    const result = dispatchApplicationEmail(submittedRecord);
    setEmailResult(result);
    setIsResending(false);
  };

  const handleCopySummary = async () => {
    if (!emailResult?.payloadSummary) return;
    try {
      await navigator.clipboard.writeText(emailResult.payloadSummary);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
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

            {submittedRecord ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="px-3.5 py-1 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 rounded-full text-xs font-black uppercase font-mono tracking-wider">
                      Pre-filled Mail Template Ready • Approval in 2 Business Days
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                      Ref: {submittedRecord.id} • {emailResult?.methodUsed || 'Mail Template'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-['Montserrat'] pt-2">
                    Application Prepared!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold">{submittedRecord.parentName}</span>. Your pre-filled admission email template for <span className="font-bold text-[#800020] dark:text-amber-400">{submittedRecord.studentName}</span> ({submittedRecord.targetClass}, {submittedRecord.residenceType}) has been opened for your mail app to send to <strong className="text-slate-900 dark:text-white">{SCHOOL_CONTACTS.email}</strong>.
                  </p>
                </div>

                {/* WHATSAPP & MAIL TEMPLATE CARD */}
                <div className="p-5 bg-slate-900 text-white rounded-2xl max-w-md mx-auto border border-slate-800 shadow-xl space-y-3 text-center">
                  <span className="text-[11px] text-amber-300 uppercase tracking-widest font-bold block">
                    We Will Contact You on WhatsApp or Email
                  </span>
                  <p className="text-xs text-slate-300">
                    If your PC does not have a default mail app, click <strong>Compose in Gmail Web</strong> below or follow up on WhatsApp:
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={emailResult?.mailtoUrl || `mailto:${SCHOOL_CONTACTS.email}`}
                      target="_top"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition shadow-md w-full"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Mail App (mailto)</span>
                    </a>
                    {emailResult?.gmailUrl && (
                      <a
                        href={emailResult.gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs transition shadow-md w-full"
                      >
                        <ExternalLink className="w-4 h-4 text-[#800020]" />
                        <span>Compose in Gmail Web</span>
                      </a>
                    )}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-slate-950 font-bold rounded-xl text-xs transition shadow-md w-full"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp ({SCHOOL_CONTACTS.phone1})</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className="px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-amber-300 ${isResending ? 'animate-spin' : ''}`} />
                    <span>{isResending ? 'Opening...' : 'Re-open Mail Template'}</span>
                  </button>

                  {emailResult?.payloadSummary && (
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Details Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Done / Close
                  </button>
                </div>
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
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplyModal;
