import React, { useState, useEffect } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { ClassLevel, ResidenceType, AdmissionApplication } from '../types/admission';
import { submitNewApplication } from '../lib/admissionStore';
import { dispatchApplicationEmail } from '../lib/emailService';
import { 
  Printer, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Check,
  Clock,
  Send,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CLASS_TUITION_MAP: Record<ClassLevel, { boarding: number; day: number }> = {
  'S.1': { boarding: 1316000, day: 726000 },
  'S.2': { boarding: 1316000, day: 726000 },
  'S.3': { boarding: 1316000, day: 726000 },
  'S.4': { boarding: 1416000, day: 826000 },
  'S.5': { boarding: 1362000, day: 772000 },
  'S.6': { boarding: 1416000, day: 826000 }
};

export const OFFICIAL_ITEMIZED_FEES = {
  admissionFee: 50000,
  uniform: 275000, // Labelling inclusive
  idCard: 10000,
  sportsWear: 50000,
  requirements: 50000,
};

export const A_LEVEL_COMBINATIONS = [
  'PCM / ICT (Physics, Chemistry, Mathematics)',
  'BCM / Sub-Math (Biology, Chemistry, Mathematics)',
  'PCB / Sub-Math (Physics, Chemistry, Biology)',
  'PEM / ICT (Physics, Economics, Mathematics)',
  'MEG / ICT (Mathematics, Economics, Geography)',
  'HEG / Sub-Math (History, Economics, Geography)',
  'HED / Sub-Math (History, Economics, Divinity)',
  'DEG / Sub-Math (Divinity, Economics, Geography)',
  'A-Level Entrepreneurship & Vocational Combinations'
];

export const HOUSES_LIST = [
  'Lumumba House',
  'Nyerere House',
  'Mandela House',
  'Nkurumah House'
];

interface AdmissionFormSectionProps {
  initialAppToPrint?: AdmissionApplication | null;
}

export const AdmissionFormSection: React.FC<AdmissionFormSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'structure'>('apply');
  
  // Apply Form State
  const [studentName, setStudentName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dob, setDob] = useState('2010-05-15');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('S.1');
  const [residenceType, setResidenceType] = useState<ResidenceType>('Boarding');
  const [previousSchool, setPreviousSchool] = useState('');
  const [gradesAggregate, setGradesAggregate] = useState('');
  const [house, setHouse] = useState('Lumumba House');
  const [combination, setCombination] = useState(A_LEVEL_COMBINATIONS[0]);

  // Submission Flow & Email Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AdmissionApplication | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const isALevel = selectedClass === 'S.5' || selectedClass === 'S.6';
  const tuitionObj = CLASS_TUITION_MAP[selectedClass] || CLASS_TUITION_MAP['S.1'];
  const tuition = residenceType === 'Boarding' ? tuitionObj.boarding : tuitionObj.day;
  
  const totalFees = 
    OFFICIAL_ITEMIZED_FEES.admissionFee +
    tuition +
    OFFICIAL_ITEMIZED_FEES.uniform +
    OFFICIAL_ITEMIZED_FEES.idCard +
    OFFICIAL_ITEMIZED_FEES.sportsWear +
    OFFICIAL_ITEMIZED_FEES.requirements;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentPhone || !parentEmail) return;

    setIsSubmitting(true);

    // Save to local persistence application store
    const appRecord = submitNewApplication({
      studentName,
      gender,
      dob,
      targetClass: selectedClass,
      residenceType,
      parentName,
      parentPhone,
      parentEmail,
      previousSchool: previousSchool || 'Primary/Secondary School',
      gradesAggregate: gradesAggregate || 'Standard Entry Record'
    });

    // Auto-dispatch form via email service payload
    await dispatchApplicationEmail(appRecord);

    setIsSubmitting(false);
    setSubmittedRecord(appRecord);
    setShowToast(true);
  };

  const getWhatsAppUrl = () => {
    if (!submittedRecord) return 'https://wa.me/256772831704';
    const text = `Hello STAHIZA Admissions Office, I have submitted an online application for ${submittedRecord.studentName} (${submittedRecord.targetClass}, ${submittedRecord.residenceType} Section). Reference Code: ${submittedRecord.id}.`;
    return `https://wa.me/256772831704?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 font-['Inter',sans-serif] relative">
      
      {/* FLOATING SUCCESS TOAST BANNER */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-full bg-slate-900 text-white p-4.5 rounded-2xl shadow-2xl border-2 border-emerald-500/80 flex items-start justify-between gap-3 print:hidden"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">Application Sent!</h4>
                  <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded uppercase font-mono">
                    PENDING APPROVAL
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Application sent, pending approval in <strong>2 business days</strong>. We will contact you on WhatsApp or Email ({SCHOOL_CONTACTS.email}).
                </p>
                <div className="pt-1">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1ebd59] text-slate-950 font-bold rounded-lg text-xs transition shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Follow up on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION HEADER WITH OFFICIAL SCHOOL CREST & SELECTION CODE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4 print:hidden"
      >
        <div className="inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-1 shadow-xs border border-slate-200 dark:border-slate-700">
          <SchoolBadgeImg size={56} className="w-14 h-14" />
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-extrabold uppercase tracking-widest">
          <span className="text-[#800020] dark:text-rose-400">Standard High School Zzana</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="bg-[#0A192F] text-amber-300 px-3 py-1 rounded-full shadow-xs">
            Selection Code: 2624
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="bg-rose-50 text-[#800020] dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-900 px-2.5 py-1 rounded-full">
            UNEB Centre: U1288
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Admissions & Application Portal
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Fill in your online application form below. Application details are dispatched directly to school administration (<span className="font-bold text-slate-900 dark:text-white">{SCHOOL_CONTACTS.email}</span>) for review.
        </p>

        {/* NAVIGATION TAB CONTROLS */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'apply'
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>1. Online Application Form</span>
            </button>

            <button
              onClick={() => setActiveTab('structure')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'structure'
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2. Tuition & Requirements</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* TAB 1: SUBMIT APPLICATION FORM */}
      {activeTab === 'apply' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:hidden">
          
          {/* LEFT FORM COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6"
          >
            {submittedRecord ? (
              /* SUBMISSION CONFIRMATION SUCCESS CARD */
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 rounded-full text-xs font-black uppercase font-mono tracking-wider">
                    Application Sent, Pending Approval in 2 Business Days
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white pt-2">
                    Thank You, {submittedRecord.parentName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your application for <strong className="text-slate-900 dark:text-white">{submittedRecord.studentName}</strong> ({submittedRecord.targetClass}, {submittedRecord.residenceType} Section) has been sent directly to school administration (<strong className="text-slate-900 dark:text-white">{SCHOOL_CONTACTS.email}</strong>).
                  </p>
                </div>

                {/* WHATSAPP & CONTACT ACTION CARD */}
                <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3 max-w-md mx-auto border border-slate-800 shadow-xl text-center">
                  <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider block">
                    We Will Contact You on WhatsApp or Email
                  </span>
                  <p className="text-xs text-slate-300">
                    Need immediate assistance or want to send additional documents? Contact our admissions office directly:
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-slate-950 font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp ({SCHOOL_CONTACTS.phone1})</span>
                    </a>

                    <a
                      href={`mailto:${SCHOOL_CONTACTS.email}`}
                      className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-amber-300" />
                      <span>Email Office</span>
                    </a>
                  </div>
                </div>

                {/* SUBMIT ANOTHER BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedRecord(null);
                      setStudentName('');
                      setParentPhone('');
                      setParentEmail('');
                    }}
                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-200 transition"
                  >
                    Submit Another Student Application
                  </button>
                </div>
              </div>
            ) : (
              /* APPLICATION ENTRY FORM */
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Online Student Admission Form
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Directly sent to {SCHOOL_CONTACTS.email} (Code: 2624)</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-50 text-[#800020] dark:bg-rose-950 dark:text-rose-300 font-bold px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
                    2027 Entry
                  </span>
                </div>

                {/* CLASS SELECTOR (ALL 6 CLASSES S1 to S6) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      1. Select Target Class (S.1 – S.6)
                    </label>
                    <span className="text-[11px] font-bold text-[#800020] dark:text-amber-400">
                      Tuition: UGX {tuitionObj.boarding.toLocaleString()}/= (Boarding)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {(['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'] as ClassLevel[]).map((cls) => {
                      const isSelected = selectedClass === cls;
                      return (
                        <button
                          type="button"
                          key={cls}
                          onClick={() => setSelectedClass(cls)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            isSelected
                              ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-md dark:bg-amber-500 dark:text-slate-950'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ATTENDANCE OPTION */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    2. Select Residence Option
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Boarding', 'Day'] as ResidenceType[]).map((status) => {
                      const isSelected = residenceType === status;
                      const isBoarding = status === 'Boarding';
                      const currentTuition = isBoarding ? tuitionObj.boarding : tuitionObj.day;
                      return (
                        <button
                          type="button"
                          key={status}
                          onClick={() => setResidenceType(status)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isBoarding
                              ? isSelected
                                ? 'bg-[#800020] text-white border-[#5c0017] shadow-md ring-2 ring-[#800020]/50 dark:bg-[#800020] dark:text-white dark:border-[#a31438]'
                                : 'bg-[#800020] hover:bg-[#6b001b] text-white border-[#6b001b] dark:bg-[#800020] dark:hover:bg-[#6b001b] dark:text-white dark:border-[#a31438]'
                              : isSelected
                                ? 'bg-yellow-400 text-[#0A192F] border-yellow-600 shadow-md ring-2 ring-yellow-500/60 dark:bg-yellow-400 dark:text-slate-950 dark:border-yellow-500'
                                : 'bg-yellow-100 hover:bg-yellow-200 text-[#0A192F] border-yellow-300 dark:bg-yellow-200 dark:hover:bg-yellow-300 dark:text-slate-900 dark:border-yellow-400'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-xs">{status} Section</div>
                            <div
                              className={`text-[10px] mt-0.5 font-medium ${
                                isBoarding
                                  ? 'text-rose-100'
                                  : isSelected
                                    ? 'text-slate-900'
                                    : 'text-slate-700'
                              }`}
                            >
                              UGX {currentTuition.toLocaleString()}/=
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                              isBoarding
                                ? isSelected
                                  ? 'bg-white text-[#800020]'
                                  : 'bg-[#5c0017] border border-rose-200/50 text-transparent'
                                : isSelected
                                  ? 'bg-[#0A192F] text-yellow-300'
                                  : 'bg-yellow-200 border border-yellow-400 text-transparent'
                            }`}
                          >
                            {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* A-LEVEL COMBINATIONS */}
                {isALevel && (
                  <div className="space-y-2 bg-amber-500/10 p-4 rounded-xl border border-amber-300/40">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-amber-300">
                      3. A-Level Subject Combination
                    </label>
                    <select
                      value={combination}
                      onChange={(e) => setCombination(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-semibold px-3 py-2 rounded-lg"
                    >
                      {A_LEVEL_COMBINATIONS.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* STUDENT DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mukasa Jonathan"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Mukasa"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Parent Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +256 772 831 704"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Parent Email Address * (Receives Updates)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. parent@gmail.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">Previous School Attended</label>
                    <input
                      type="text"
                      placeholder="e.g. Kampala Parents"
                      value={previousSchool}
                      onChange={(e) => setPreviousSchool(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">PLE / UCE Aggregates</label>
                    <input
                      type="text"
                      placeholder="e.g. Aggregate 8 or 18 Points"
                      value={gradesAggregate}
                      onChange={(e) => setGradesAggregate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#800020] hover:bg-[#600018] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Sending Application to {SCHOOL_CONTACTS.email}...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-300" />
                        <span>Submit Application Form to School Admin ({selectedClass})</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Application details are sent directly to <strong className="text-slate-700 dark:text-slate-300">{SCHOOL_CONTACTS.email}</strong>. Approval takes 2 business days.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* RIGHT SUMMARY COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-2 bg-white rounded-xl shadow shrink-0">
                  <SchoolBadgeImg size={34} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Official Fee Breakdown
                  </h3>
                  <span className="text-xs text-amber-300 font-semibold">
                    {selectedClass} • {residenceType} Section • Code: 2624
                  </span>
                </div>
              </div>

              {/* ITEMIZED FEES */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Admission Fee</span>
                  <span className="font-mono font-bold text-white">UGX {OFFICIAL_ITEMIZED_FEES.admissionFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 bg-white/5 px-2 rounded-lg">
                  <span className="text-amber-300 font-bold">Tuition ({selectedClass} {residenceType})</span>
                  <span className="font-mono font-bold text-amber-300">UGX {tuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">School Uniform (Labelling inc.)</span>
                  <span className="font-mono font-bold text-white">UGX {OFFICIAL_ITEMIZED_FEES.uniform.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">ID Card</span>
                  <span className="font-mono font-bold text-white">UGX {OFFICIAL_ITEMIZED_FEES.idCard.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Sports Wear</span>
                  <span className="font-mono font-bold text-white">UGX {OFFICIAL_ITEMIZED_FEES.sportsWear.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Requirements</span>
                  <span className="font-mono font-bold text-white">UGX {OFFICIAL_ITEMIZED_FEES.requirements.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#800020] border border-rose-400/30 text-center">
                <span className="text-[10px] uppercase tracking-wider text-rose-200 font-bold block">
                  Total Term 1 Fee ({selectedClass})
                </span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  UGX {totalFees.toLocaleString()}/=
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <p className="text-amber-300 font-medium">✨ Application sent, pending approval in 2 business days.</p>
              <p>School administration will contact you directly via Email or WhatsApp.</p>
              <a 
                href={`https://wa.me/256772831704?text=${encodeURIComponent('Hello STAHIZA Admissions Office, I would like to inquire about student admissions.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline font-bold pt-1"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Admissions Desk WhatsApp ({SCHOOL_CONTACTS.phone1})</span>
              </a>
            </div>
          </motion.div>

        </div>
      )}

      {/* TAB 2: TUITION & REQUIREMENTS BREAKDOWN */}
      {activeTab === 'structure' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 print:hidden"
        >
          {/* ALL CLASSES TUITION COMPARISON MATRIX */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Class Tuition Structure Matrix (S.1 to S.6)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Official termly rates for Day and Boarding scholars (Selection Code: 2624)</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3">Class Level</th>
                    <th className="p-3">Curriculum Level</th>
                    <th className="p-3 text-right">Boarding Tuition</th>
                    <th className="p-3 text-right">Day Tuition</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {(['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'] as ClassLevel[]).map(cls => {
                    const t = CLASS_TUITION_MAP[cls];
                    return (
                      <tr key={cls} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-slate-900 dark:text-white font-mono text-sm">{cls}</td>
                        <td className="p-3 text-slate-500">{cls === 'S.5' || cls === 'S.6' ? 'A-Level (Upper Secondary)' : 'O-Level (Lower Secondary)'}</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-white">UGX {t.boarding.toLocaleString()}/=</td>
                        <td className="p-3 text-right font-mono font-semibold text-slate-600 dark:text-slate-400">UGX {t.day.toLocaleString()}/=</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedClass(cls);
                              setActiveTab('apply');
                            }}
                            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:text-slate-950 rounded-md font-bold text-[11px]"
                          >
                            Apply for {cls}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* REQUIREMENTS LIST & UNIFORM COMPONENT BREAKDOWN */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-[#800020] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Standard Uniform & Requirements Guidelines
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Official STAHIZA dress code and dormitory regulations (Selection Code: 2624)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-700 dark:text-slate-300">
              
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#800020] dark:text-amber-400" />
                  <span>a) i) In-Class School Uniform (UGX 275,000/=)</span>
                </h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Girls:</strong> Navy blue skirt, short-sleeved white blouse, navy blue cardigan, low-heeled black shoes, white stockings.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Boys:</strong> Navy blue trousers, short-sleeved white shirt, navy blue cardigan, low-heeled black shoes, white stockings.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#800020] dark:text-amber-400" />
                  <span>a) ii) Out-of-Class Uniform</span>
                </h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Girls:</strong> 2 black skirts, 4 red T-shirts.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Boys:</strong> 2 black trousers, 4 blue T-shirts.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#800020] dark:text-amber-400" />
                  <span>b) Boarding Items (Boarders Only)</span>
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  A basin, a jerrycan, a mattress, two pairs of bed sheets, a blanket, cutlery, pocket money, and a passport photograph for the parent/guardian.
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default AdmissionFormSection;
