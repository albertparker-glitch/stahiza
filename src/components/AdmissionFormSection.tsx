import React, { useState } from 'react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { 
  Printer, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  BookOpen, 
  Award,
  ChevronRight,
  Download,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type ClassLevel = 'S.1' | 'S.2' | 'S.3' | 'S.4' | 'S.5' | 'S.6';
export type BoardingStatus = 'Day' | 'Boarding';

export const OFFICIAL_FEE_STRUCTURE = {
  admissionFee: 50000,
  tuitionDay: 726000,
  tuitionBoarding: 1316000,
  uniform: 287000, // Labelling inclusive
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
  'Kabalega House',
  'Mutesa House',
  'Nyerere House',
  'Mandela House',
  'Nkurumah House'
];

export const AdmissionFormSection: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('S.1');
  const [boardingStatus, setBoardingStatus] = useState<BoardingStatus>('Boarding');
  const [house, setHouse] = useState('Lumumba House');
  const [combination, setCombination] = useState(A_LEVEL_COMBINATIONS[0]);
  const [reportingDate, setReportingDate] = useState('First Term 2027');
  const [textbookTitle, setTextbookTitle] = useState('Uganda Secondary UNEB Companion');
  const [textbookAuthor, setTextbookAuthor] = useState('Senior Academic Panel');
  
  const [generated, setGenerated] = useState(false);

  const isALevel = selectedClass === 'S.5' || selectedClass === 'S.6';
  const tuition = boardingStatus === 'Boarding' ? OFFICIAL_FEE_STRUCTURE.tuitionBoarding : OFFICIAL_FEE_STRUCTURE.tuitionDay;
  
  const totalFees = 
    OFFICIAL_FEE_STRUCTURE.admissionFee +
    tuition +
    OFFICIAL_FEE_STRUCTURE.uniform +
    OFFICIAL_FEE_STRUCTURE.idCard +
    OFFICIAL_FEE_STRUCTURE.sportsWear +
    OFFICIAL_FEE_STRUCTURE.requirements;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 font-['Inter',sans-serif]">
      
      {/* SECTION HEADER WITH OFFICIAL SCHOOL BADGE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4 print:hidden"
      >
        <div className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-2xl mb-1 shadow-xs border border-slate-200">
          <SchoolBadgeImg size={56} className="w-14 h-14" />
        </div>
        <span className="text-[#800020] font-extrabold uppercase tracking-widest text-xs sm:text-sm block">
          Standard High School Zzana
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-['Montserrat'] text-[#0A192F]">
          Official Admission Form & Fees Structure
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select entry class (<span className="font-bold text-[#0A192F]">S.1 to S.6</span>) and Day/Boarding status to calculate termly fees, review requirements, and generate an official printable <span className="font-bold text-[#800020]">Admission Offer Letter</span>.
        </p>
      </motion.div>

      {/* DUAL COLUMN: INTERACTIVE FORM SELECTOR & LIVE FEES CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:hidden">
        
        {/* LEFT COLUMN: CLASS, STATUS & STUDENT DETAILS FORM */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                  Student Admission Details
                </h3>
                <p className="text-xs text-slate-500">Applicable for S.1, S.2, S.3, S.4, S.5 & S.6</p>
              </div>
            </div>
            <span className="text-[10px] bg-rose-50 text-[#800020] font-extrabold px-3 py-1 rounded-full border border-rose-200 uppercase">
              2027 Entry
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setGenerated(true); }} className="space-y-5">
            
            {/* CLASS SELECTOR (ALL 6 CLASSES S1 to S6) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Class Level (S.1 – S.6)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'] as ClassLevel[]).map((cls) => {
                  const isSelected = selectedClass === cls;
                  return (
                    <button
                      type="button"
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`py-3 rounded-2xl text-xs sm:text-sm font-extrabold font-['Montserrat'] transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A192F] text-amber-300 border-[#0A192F] shadow-md scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 font-medium pt-1">
                {isALevel ? 'Upper Secondary (A-Level Curriculum)' : 'Lower Secondary (O-Level UNEB Curriculum)'}
              </p>
            </div>

            {/* DAY VS BOARDING STATUS TOGGLE */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Select Attendance Option
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['Boarding', 'Day'] as BoardingStatus[]).map((status) => {
                  const isSelected = boardingStatus === status;
                  return (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setBoardingStatus(status)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#800020] text-white border-[#800020] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm font-['Montserrat']">{status} Student</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                          {status === 'Boarding' ? 'Full hostel lodging & meals' : 'Day scholar attendance'}
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-amber-400 text-[#0A192F]' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* A-LEVEL COMBINATION SELECTOR (IF S.5 OR S.6) */}
            {isALevel && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 bg-amber-500/10 p-4 rounded-2xl border border-amber-300/40"
              >
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                  3. A-Level Subject Combination (Sciences / Arts)
                </label>
                <select
                  value={combination}
                  onChange={(e) => setCombination(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-xs text-[#0A192F] font-bold px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#800020]"
                >
                  {A_LEVEL_COMBINATIONS.map((c, idx) => (
                    <option key={idx} value={c}>{c}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* STUDENT & PARENT INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mukasa Jonathan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Parent / Guardian Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Mukasa"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Parent Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +256 772 000 000"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">School House Assignment</label>
                <select
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#0A192F]"
                >
                  {HOUSES_LIST.map((h, i) => (
                    <option key={i} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* LIBRARY TEXTBOOK CONTRIBUTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-600">Contributed Library Textbook Title</label>
                <input
                  type="text"
                  value={textbookTitle}
                  onChange={(e) => setTextbookTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-600">Book Author</label>
                <input
                  type="text"
                  value={textbookAuthor}
                  onChange={(e) => setTextbookAuthor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>
            </div>

            {/* SUBMIT / GENERATE BUTTON */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#800020] hover:bg-[#600018] text-white font-extrabold py-3.5 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-['Montserrat']"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Official STAHIZA Admission Letter ({selectedClass})</span>
              </button>
            </div>

          </form>
        </motion.div>

        {/* RIGHT COLUMN: ITEMIZED OFFICIAL FEES STRUCTURE SUMMARY */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 bg-gradient-to-br from-[#0A192F] via-[#0F2A4A] to-[#173860] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
              <div className="p-2 bg-white rounded-xl shadow shrink-0">
                <SchoolBadgeImg size={34} />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg font-['Montserrat'] text-white">
                  Term 1 Official Fees Breakdown
                </h3>
                <span className="text-xs text-amber-300 font-semibold">
                  {selectedClass} • {boardingStatus} Option
                </span>
              </div>
            </div>

            {/* ITEMIZED FEES TABLE */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-700/80">
                <span className="text-slate-300">Admission Fee</span>
                <span className="font-mono font-bold text-white">UGX {OFFICIAL_FEE_STRUCTURE.admissionFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700/80 bg-white/5 px-2 rounded-lg">
                <span className="text-amber-200 font-bold">Tuition Fee ({boardingStatus})</span>
                <span className="font-mono font-bold text-amber-300">UGX {tuition.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700/80">
                <span className="text-slate-300">School Uniform (Labelling inclusive)</span>
                <span className="font-mono font-bold text-white">UGX {OFFICIAL_FEE_STRUCTURE.uniform.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700/80">
                <span className="text-slate-300">Identity Card</span>
                <span className="font-mono font-bold text-white">UGX {OFFICIAL_FEE_STRUCTURE.idCard.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700/80">
                <span className="text-slate-300">Sports Wear</span>
                <span className="font-mono font-bold text-white">UGX {OFFICIAL_FEE_STRUCTURE.sportsWear.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700/80">
                <span className="text-slate-300">Requirements Fee</span>
                <span className="font-mono font-bold text-white">UGX {OFFICIAL_FEE_STRUCTURE.requirements.toLocaleString()}</span>
              </div>
            </div>

            {/* TOTAL FEES SUM BANNER */}
            <div className="p-4 rounded-2xl bg-[#800020] border border-rose-400/30 space-y-1 shadow-lg text-center">
              <span className="text-[11px] uppercase tracking-wider text-rose-200 font-bold block">
                Total Payable for Term 1 ({selectedClass})
              </span>
              <div className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-white">
                UGX {totalFees.toLocaleString()}/=
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700 space-y-2 text-[11px] text-slate-300">
            <p className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Fees payable on acceptance of place by parent/guardian.</span>
            </p>
            <p className="text-slate-400">
              Official Headteacher Sign-off: <span className="text-white font-bold">KURAHUKA OSTRICAST</span>
            </p>
          </div>
        </motion.div>

      </div>

      {/* REQUIREMENTS LIST & UNIFORM COMPONENT BREAKDOWN */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8 print:hidden">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-2xl bg-[#800020] text-amber-300 flex items-center justify-center font-bold shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Montserrat'] text-[#0A192F]">
              Standard Uniform & Requirements Guidelines
            </h3>
            <p className="text-xs text-slate-500">Official STAHIZA dress code and dormitory regulations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-700">
          
          {/* IN-CLASS UNIFORM */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-sm text-[#0A192F] font-['Montserrat'] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#800020]" />
              <span>a) i) In-Class School Uniform</span>
            </h4>
            <ul className="space-y-2 text-slate-600 leading-relaxed">
              <li>
                <strong className="text-[#0A192F]">Girls:</strong> Navy blue skirt, short-sleeved white blouse, navy blue cardigan, low-heeled black shoes, white stockings.
              </li>
              <li>
                <strong className="text-[#0A192F]">Boys:</strong> Navy blue trousers, short-sleeved white shirt, navy blue cardigan, low-heeled black shoes, white stockings.
              </li>
            </ul>
          </div>

          {/* OUT OF CLASS UNIFORM */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-sm text-[#0A192F] font-['Montserrat'] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#800020]" />
              <span>a) ii) Out-of-Class Uniform</span>
            </h4>
            <ul className="space-y-2 text-slate-600 leading-relaxed">
              <li>
                <strong className="text-[#0A192F]">Girls:</strong> 2 black skirts, 4 red T-shirts.
              </li>
              <li>
                <strong className="text-[#0A192F]">Boys:</strong> 2 black trousers, 4 blue T-shirts.
              </li>
            </ul>
          </div>

          {/* BOARDING REQUIREMENTS */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-sm text-[#0A192F] font-['Montserrat'] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#800020]" />
              <span>b) Boarding Items (Boarders Only)</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              A basin, a jerrycan, a mattress, two pairs of bed sheets, a blanket, cutlery, pocket money, and a passport photograph for the parent/guardian.
            </p>
          </div>

        </div>
      </div>

      {/* PRINTABLE OFFICIAL ADMISSION OFFER LETTER DOCUMENT */}
      <div id="printable-admission-letter" className="space-y-4">
        
        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900 text-white rounded-2xl shadow-lg print:hidden">
          <div className="flex items-center gap-3">
            <SchoolBadgeImg size={32} />
            <div>
              <h4 className="font-bold text-sm font-['Montserrat'] text-amber-300">
                Official Admission Letter Document Preview
              </h4>
              <p className="text-xs text-slate-300">Formatted exactly as per official STAHIZA school administration records</p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer shrink-0"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print / Save as Official PDF</span>
          </button>
        </div>

        {/* PAPER SHEET DOCUMENT (STANDALONE OFFICIAL ADMISSION FORM REPLICA) */}
        <div className="bg-white text-slate-900 border-2 border-slate-300 shadow-2xl p-6 sm:p-12 rounded-2xl max-w-4xl mx-auto space-y-6 print:shadow-none print:border-none print:p-0 print:max-w-none">
          
          {/* OFFICIAL HEADER WITH SCHOOL CREST LOGO */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-2 relative">
            <div className="flex items-center justify-center gap-4 mb-2">
              <SchoolBadgeImg size={72} className="w-16 h-16 sm:w-20 sm:h-20" />
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-black font-['Montserrat'] tracking-tight text-[#0A192F] uppercase">
                  Standard High School - Zzana
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  P.O. Box 22981 KAMPALA, Tel: 0772-428034 / 0782-316 838 / 0772-345928 / 0777 772283
                </p>
                <p className="text-xs font-bold text-[#800020]">
                  E-mail: {SCHOOL_CONTACTS.email}
                </p>
                <p className="text-xs font-extrabold font-serif italic text-[#0A192F] tracking-widest mt-1">
                  "EDUCATION IS THE WAY"
                </p>
              </div>
            </div>
          </div>

          {/* DOCUMENT TITLE & REF */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs sm:text-sm font-bold pt-2 border-b border-slate-200 pb-3">
            <div>
              Our ref: <span className="underline">{selectedClass}/2027/OFFER</span>
            </div>
            <div className="text-base font-extrabold font-['Montserrat'] text-[#800020] uppercase underline decoration-2">
              {selectedClass} ADMISSION FORM
            </div>
            <div>
              Date: <span className="underline">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* LETTER BODY */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800">
            <p>
              Dear <span className="font-extrabold text-[#0A192F] uppercase border-b border-slate-400 px-2">{studentName || '........................................................'}</span>,
            </p>
            <p>
              I am glad to inform you that you have been offered a place at the above-mentioned school in <span className="font-bold underline">{selectedClass}</span> ({boardingStatus} option) assigned to <span className="font-bold underline">{house}</span>.
              {isALevel && <span> Combination offered: <strong className="underline">{combination}</strong>.</span>}
            </p>
            <p>
              You should report on <span className="font-bold underline">{reportingDate}</span>. The offer will be cancelled if you fail to report to the school within two weeks' time. The following are required:
            </p>

            {/* REQUIREMENTS SUMMARY */}
            <div className="space-y-3 pl-2 sm:pl-4">
              <div>
                <strong className="text-[#0A192F]">a) i) School Uniform:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li><strong>Girls:</strong> Navy blue skirt, short-sleeved white blouse, navy blue cardigan, low-heeled black shoes and white stockings.</li>
                  <li><strong>Boys:</strong> Navy blue trousers, short-sleeved white shirt, navy blue cardigan, low-heeled black shoes and white stockings.</li>
                </ul>
              </div>

              <div>
                <strong className="text-[#0A192F]">ii) Out of class uniform:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li><strong>Girls:</strong> 2 black skirts, 4 red T-shirts.</li>
                  <li><strong>Boys:</strong> 2 black trousers, 4 blue T-shirts.</li>
                </ul>
              </div>

              {boardingStatus === 'Boarding' && (
                <div>
                  <strong className="text-[#0A192F]">b) Boarding requirements: (Applicable to boarders only)</strong>
                  <p className="mt-1">
                    A basin, a jerrycan, a mattress, two pairs of bed sheets, a blanket, cutlery and some pocket money.
                  </p>
                </div>
              )}
            </div>

            {/* OFFICIAL FEES TABLE */}
            <div className="pt-2">
              <strong className="text-[#0A192F] block mb-2">c) Termly School Fees Breakdown:</strong>
              <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-800 font-bold">
                      <th className="p-2 border-r border-slate-800">Fee Item</th>
                      <th className="p-2 border-r border-slate-800 text-right">Amount (UGX)</th>
                      <th className="p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-2 border-r border-slate-800">Admission Fee</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">50,000/=</td>
                      <td className="p-2">One-time admission charge</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-800 font-bold">Tuition ({boardingStatus})</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono font-bold">{tuition.toLocaleString()}/=</td>
                      <td className="p-2 font-semibold">{boardingStatus === 'Boarding' ? 'Includes lodging & meals' : 'Day scholar tuition'}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-800">School Uniform</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">287,000/=</td>
                      <td className="p-2">(Labelling inclusive)</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-800">Identity Card</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">10,000/=</td>
                      <td className="p-2">Student ID pass</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-800">Sports Wear</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">50,000/=</td>
                      <td className="p-2">Official sports kit</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-800">Requirements</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">50,000/=</td>
                      <td className="p-2">Development & utilities</td>
                    </tr>
                    <tr className="bg-slate-100 font-black text-sm">
                      <td className="p-2 border-r border-slate-800 font-['Montserrat']">TOTAL PAYABLE TERM 1</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono text-[#800020]">{totalFees.toLocaleString()}/=</td>
                      <td className="p-2 text-slate-700">(Passport photograph for parent - Boarders only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TEXTBOOK CONTRIBUTION */}
            <div className="pt-2">
              <strong className="text-[#0A192F]">d) A text book titled:</strong> <span className="underline font-bold px-2">{textbookTitle}</span> By: <span className="underline font-bold px-2">{textbookAuthor}</span>
              <p className="text-slate-600 text-xs italic mt-0.5">(This serves as a contribution to the school library)</p>
            </div>

            {/* OFFICIAL NOTE & RULES */}
            <div className="pt-3 border-t border-slate-300 space-y-1.5 text-xs text-slate-800">
              <strong className="text-[#0A192F] block">NOTE:</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fees in respect of the first term attended by a student is due on the date of acceptance of the place by the parent or guardian for his/her child.</li>
                <li>The management reserves the right to request the withdrawal of a child from the school should his/her continuance here be likely not to be of benefit to him/her or to the school community.</li>
                <li>The moment you accept the offer and pay school fees, no refund will be made.</li>
                <li>Every student must abide by school rules and regulations a setoff which is hereby attached.</li>
              </ul>
            </div>

            <p className="pt-2 font-serif italic text-sm font-extrabold text-[#0A192F]">
              I wish you a happy stay at Standard High School - Zzana
            </p>

            {/* SIGNATURE & SIGN-OFF */}
            <div className="pt-6 flex items-end justify-between">
              <div>
                <p className="text-xs">Yours faithfully,</p>
                <div className="my-2 font-serif italic text-lg text-[#800020] font-bold border-b border-slate-400 w-48">
                  Kurahuka Ostricast
                </div>
                <p className="font-extrabold text-xs text-[#0A192F] uppercase tracking-wider">
                  KURAHUKA OSTRICAST<br />
                  HEADTEACHER
                </p>
              </div>

              <div className="text-center p-3 border border-slate-300 rounded-xl bg-slate-50 text-[10px]">
                <SchoolBadgeImg size={40} className="mx-auto mb-1" />
                <span className="font-bold text-[#0A192F] block">STAHIZA Official Stamp</span>
                <span className="text-slate-500">Entebbe Road Campus</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
