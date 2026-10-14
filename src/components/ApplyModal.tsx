import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [applyForm, setApplyForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    level: 'o-level',
    combination: 'pcm',
    previousSchool: '',
    notes: ''
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  if (!isOpen) return null;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative my-8 animate-fadeIn">
        <button
          onClick={() => { onClose(); setApplySubmitted(false); }}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {applySubmitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-['Montserrat']">Application Received!</h3>
            <p className="text-slate-600 text-base max-w-md mx-auto">
              Thank you, <span className="font-bold">{applyForm.parentName}</span>. Your application for <span className="font-bold">{applyForm.studentName}</span> has been securely submitted to STAHIZA Admissions Office. Our team will contact you via <span className="font-bold">{applyForm.phone}</span> or office desk ({SCHOOL_CONTACTS.phone1}) within 24 hours.
            </p>
            <button
              onClick={() => { onClose(); setApplySubmitted(false); }}
              className="px-8 py-3 bg-[#0A192F] text-white font-bold rounded-xl shadow"
            >
              Close & Return Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 rounded-xl">
                <SchoolBadgeImg size={42} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#800020] uppercase tracking-wider">Admissions 2027</span>
                <h3 className="text-2xl font-extrabold text-[#0A192F] font-['Montserrat'] mt-0.5">Online Application Form</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={applyForm.studentName}
                  onChange={e => setApplyForm({ ...applyForm, studentName: e.target.value })}
                  placeholder="e.g. Mukasa Junior"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={applyForm.parentName}
                  onChange={e => setApplyForm({ ...applyForm, parentName: e.target.value })}
                  placeholder="e.g. Mr. & Mrs. Mukasa"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={applyForm.phone}
                  onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                  placeholder="e.g. +256 772 831 704"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={applyForm.email}
                  onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                  placeholder="parent@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Level *</label>
                <select
                  value={applyForm.level}
                  onChange={e => setApplyForm({ ...applyForm, level: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#0A192F]"
                >
                  <option value="o-level">O-Level (Senior One to Four)</option>
                  <option value="a-level">A-Level (Senior Five & Six)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Combination / Stream</label>
                <select
                  value={applyForm.combination}
                  onChange={e => setApplyForm({ ...applyForm, combination: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#0A192F]"
                >
                  <option value="pcm">PCM / BCM (Sciences)</option>
                  <option value="arts">HEG / MEG / Arts Combination</option>
                  <option value="olevel-general">O-Level General Curriculum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Previous School Attended</label>
              <input
                type="text"
                value={applyForm.previousSchool}
                onChange={e => setApplyForm({ ...applyForm, previousSchool: e.target.value })}
                placeholder="Name of primary or secondary school"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-xl shadow-lg transition text-base"
            >
              Submit Application to STAHIZA
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
