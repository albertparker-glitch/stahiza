import { AdmissionApplication } from '../types/admission';
import { SCHOOL_CONTACTS } from '../data/schoolData';

export interface EmailSendResult {
  success: boolean;
  message: string;
  recipient: string;
  sentAt: string;
  payloadSummary: string;
  methodUsed: 'Mail Template';
  mailtoUrl: string;
}

export interface ContactInquiryInput {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt?: string;
}

export function buildApplicationSummary(app: AdmissionApplication, recipient: string): string {
  const combinationLine =
    app.combination && (app.targetClass === 'S.5' || app.targetClass === 'S.6')
      ? `\nA-Level Combo  : ${app.combination}`
      : '';
  const dobLine = app.dob ? `\nDate of Birth  : ${app.dob}` : '';
  const notesLine = app.notes ? `\nNotes          : ${app.notes}` : '';

  return `
==================================================
NEW ADMISSION APPLICATION SUBMISSION
Standard High School Zzana - Admissions Portal
==================================================
Reference Code : ${app.id}
Date Submitted : ${app.submittedAt}
Submitted Via  : ${app.sourceForm || 'Admissions Portal'}
Status         : Pending Administrative Approval

STUDENT DETAILS:
--------------------------------------------------
Student Name   : ${app.studentName}
Gender         : ${app.gender}${dobLine}
Target Class   : ${app.targetClass}
Residence      : ${app.residenceType} Section${combinationLine}
Previous School: ${app.previousSchool || 'Not specified'}
Academic Record: ${app.gradesAggregate || 'N/A'}${notesLine}

PARENT / GUARDIAN DETAILS:
--------------------------------------------------
Parent Name    : ${app.parentName}
Contact Phone  : ${app.parentPhone}
Parent Email   : ${app.parentEmail}

RECIPIENT:
--------------------------------------------------
School Admin Email: ${recipient}
Selection Code    : ${SCHOOL_CONTACTS.selectionCode}
UNEB Centre Code  : ${SCHOOL_CONTACTS.centerNo}
==================================================
  `.trim();
}

export function buildAdmissionMailtoUrl(
  app: AdmissionApplication,
  recipient: string,
  payloadSummary: string
): string {
  const mailtoSubject = encodeURIComponent(
    `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`
  );
  const mailtoBody = encodeURIComponent(payloadSummary);
  return `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
}

export function buildContactSummary(inquiry: ContactInquiryInput, recipient: string): string {
  const refCode = inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = inquiry.submittedAt || new Date().toLocaleString();

  return `
==================================================
NEW ADMISSIONS & GENERAL INQUIRY
Standard High School Zzana - Contact Desk
==================================================
Reference Code : ${refCode}
Date Submitted : ${timestamp}
Subject        : ${inquiry.subject}

SENDER DETAILS:
--------------------------------------------------
Full Name      : ${inquiry.name}
Email Address  : ${inquiry.email}
Phone/WhatsApp : ${inquiry.phone || 'Not provided'}

MESSAGE:
--------------------------------------------------
${inquiry.message}

RECIPIENT:
--------------------------------------------------
School Admin Email: ${recipient}
Selection Code    : ${SCHOOL_CONTACTS.selectionCode}
UNEB Centre Code  : ${SCHOOL_CONTACTS.centerNo}
==================================================
  `.trim();
}

export function buildContactMailtoUrl(
  inquiry: ContactInquiryInput,
  recipient: string,
  payloadSummary: string
): string {
  const mailtoSubject = encodeURIComponent(
    `STAHIZA Inquiry: ${inquiry.subject} - ${inquiry.name}`
  );
  const mailtoBody = encodeURIComponent(payloadSummary);
  return `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
}

function triggerMailtoSafely(mailtoUrl: string): void {
  try {
    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (e) {
    console.warn('Automatic mailto link trigger skipped by browser context:', e);
  }
}

/**
 * Prepares a pre-filled mail template for school administration (hasty0joel@gmail.com)
 * and launches the user's default mail client directly via mailto:.
 */
export async function dispatchApplicationEmail(app: AdmissionApplication): Promise<EmailSendResult> {
  const recipient = SCHOOL_CONTACTS.email; // hasty0joel@gmail.com
  const now = new Date().toLocaleString();
  const payloadSummary = buildApplicationSummary(app, recipient);
  const mailtoUrl = buildAdmissionMailtoUrl(app, recipient, payloadSummary);

  triggerMailtoSafely(mailtoUrl);

  return {
    success: true,
    message: `Pre-filled email template opened for ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    methodUsed: 'Mail Template',
    mailtoUrl
  };
}

/**
 * Prepares a pre-filled mail template for general contact & admissions desk inquiries
 * and launches the user's default mail client directly via mailto:.
 */
export async function dispatchContactInquiryEmail(inquiry: ContactInquiryInput): Promise<EmailSendResult> {
  const recipient = SCHOOL_CONTACTS.email;
  const now = new Date().toLocaleString();
  const normalizedInquiry: ContactInquiryInput = {
    ...inquiry,
    id: inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: inquiry.submittedAt || now
  };
  const payloadSummary = buildContactSummary(normalizedInquiry, recipient);
  const mailtoUrl = buildContactMailtoUrl(normalizedInquiry, recipient, payloadSummary);

  triggerMailtoSafely(mailtoUrl);

  return {
    success: true,
    message: `Pre-filled inquiry email template opened for ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    methodUsed: 'Mail Template',
    mailtoUrl
  };
}
