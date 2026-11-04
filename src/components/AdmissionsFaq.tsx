import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, GraduationCap, DollarSign, ShieldCheck, Trophy, Sparkles, PhoneCall } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface FaqItem {
  id: string;
  category: 'requirements' | 'fees' | 'boarding' | 'sports' | 'general';
  question: string;
  answer: string;
  badge: string;
  icon: React.ElementType;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'requirements',
    question: 'What are the entry requirements for S.1 (O-Level) and S.5 (A-Level)?',
    answer: 'For Senior One (S.1), parents provide PLE result slips or primary school recommendations. For Senior Five (S.5), candidates require UNEB UCE result slips with relevant passes in chosen Science or Arts subjects. Vacancy applications can be submitted online or directly at our Entebbe Road admissions desk.',
    badge: 'Admissions Requirements',
    icon: GraduationCap
  },
  {
    id: 'faq-2',
    category: 'fees',
    question: 'How are school fees structured, and what payment plans exist?',
    answer: 'STAHIZA maintains highly competitive, affordable tuition fees for both Day and Boarding students. Fees cover academic tuition, meals, laboratory practicals, and facility access. Flexible termly installment plans are accepted via official school bank pay-slips.',
    badge: 'Fees & Payment',
    icon: DollarSign
  },
  {
    id: 'faq-3',
    category: 'requirements',
    question: 'What subject combinations are available for A-Level students?',
    answer: 'We offer full UNEB-accredited Science combinations (PCM/M, BCM/ICT, PCB/Sub-Math, PEM/ICT) and Arts combinations (HEG/ICT, MEG/ICT, HED/French, B.A.T/Sub-Math), along with mandatory General Paper and Subsidiary Mathematics distinction drilling.',
    badge: 'Curriculum & Combinations',
    icon: GraduationCap
  },
  {
    id: 'faq-4',
    category: 'boarding',
    question: 'Is boarding compulsory, and what safety measures are provided?',
    answer: 'We accommodate both Day and Boarding students. Our secure boarding residences feature 24/7 security guards, resident wardens, clean sanitation, well-balanced dining hall meals, and supervised evening prep study hours.',
    badge: 'Boarding & Safety',
    icon: ShieldCheck
  },
  {
    id: 'faq-5',
    category: 'sports',
    question: 'How does STAHIZA support student-athletes and talent development?',
    answer: 'As USSSA national football and sports champions, we nurture talent through specialized sports academies, professional coaching, and talent sports bursaries—ensuring athletes maintain outstanding academic performance alongside sports dominance.',
    badge: 'Sports & Bursaries',
    icon: Trophy
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'Can parents visit the campus and tour facilities before enrolling?',
    answer: 'Absolutely! Our Entebbe Road campus (Zzana/Nyanama, ~8 km from Kampala) is open for guided visits Monday through Saturday (7:30 AM – 5:00 PM). Parents can inspect science labs, computer rooms, dormitories, and speak with academic deans.',
    badge: 'Campus Visits',
    icon: HelpCircle
  }
];

interface AdmissionsFaqProps {
  onApplyClick?: () => void;
  onContactClick?: () => void;
}

export const AdmissionsFaq: React.FC<AdmissionsFaqProps> = ({ onApplyClick, onContactClick }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = activeCategory === 'all' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* SECTION HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 bg-[#800020]/10 border border-[#800020]/20 text-[#800020] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#800020]" />
          <span>Parent Guidance & Frequently Asked Questions</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A192F]">
          Admissions FAQ & Requirements
        </h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Quick answers to common questions about enrollment, fee payment plans, A-Level combinations, boarding safety, and sports talents.
        </p>
      </motion.div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'requirements', label: 'Requirements' },
          { id: 'fees', label: 'Fees & Payments' },
          { id: 'boarding', label: 'Boarding Life' },
          { id: 'sports', label: 'Sports & Talents' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#0A192F] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ ACCORDION LIST */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openId === faq.id;
          const IconComp = faq.icon;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#800020]/40 shadow-xl'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#800020] text-amber-300 shadow-md' : 'bg-slate-100 text-[#0A192F]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#800020] block mb-0.5">
                      {faq.badge}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base font-['Montserrat'] text-[#0A192F] leading-snug">
                      {faq.question}
                    </h4>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-amber-100 text-[#800020] rotate-180' : 'bg-slate-100 text-slate-500'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                      <p>{faq.answer}</p>
                      <div className="flex items-center justify-between pt-2 text-[11px] font-semibold text-[#0A192F]">
                        <span className="flex items-center gap-1.5 text-[#800020]">
                          <SchoolBadgeImg size={18} /> STAHIZA Admissions Desk
                        </span>
                        <span className="text-slate-400">Office Desk: {SCHOOL_CONTACTS.phone1}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER CALL TO ACTION IN FAQ */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#0A192F] to-[#173860] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-base sm:text-lg font-['Montserrat'] text-white">
            Have additional questions or need fee structure details?
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm">
            Contact our admissions desk directly or fill out our quick online application.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {onApplyClick && (
            <button
              onClick={onApplyClick}
              className="bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
            >
              Apply Online
            </button>
          )}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask Desk</span>
            </button>
          )}
        </div>
      </motion.div>

    </section>
  );
};
