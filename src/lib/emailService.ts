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
  gmailUrl: string;
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

const MAX_MAILTO_URL_LENGTH = 1800;

export function buildApplicationSummary(app: AdmissionApplication, recipient: string): string {
  const lines = [
    'NEW ADMISSION APPLICATION - STANDARD HIGH SCHOOL ZZANA',
    `Reference Code: ${app.id}`,
    `Date Submitted: ${app.submittedAt}`,
    `Submitted Via: ${app.sourceForm || 'Admissions Portal'}`,
    '',
    'STUDENT DETAILS:',
    `Student Name: ${app.studentName}`,
    `Gender: ${app.gender}`,
    ...(app.dob ? [`Date of Birth: ${app.dob}`] : []),
    `Target Class: ${app.targetClass}`,
    `Residence: ${app.residenceType} Section`,
    ...(app.combination && (app.targetClass === 'S.5' || app.targetClass === 'S.6')
      ? [`A-Level Combination: ${app.combination}`]
      : []),
    `Previous School: ${app.previousSchool || 'Not specified'}`,
    `Academic Record: ${app.gradesAggregate || 'N/A'}`,
    ...(app.notes ? [`Notes: ${app.notes}`] : []),
    '',
    'PARENT / GUARDIAN DETAILS:',
    `Parent Name: ${app.parentName}`,
    `Phone Number: ${app.parentPhone}`,
    `Parent Email: ${app.parentEmail}`,
    '',
    `School Email: ${recipient} | Selection Code: ${SCHOOL_CONTACTS.selectionCode} | UNEB Centre: ${SCHOOL_CONTACTS.centerNo}`
  ];

  return lines.join('\n');
}

function buildSafeMailtoUrl(recipient: string, subject: string, body: string): string {
  const base = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=`;
  const maxEncodedBodyLen = Math.max(200, MAX_MAILTO_URL_LENGTH - base.length);
  let encodedBody = encodeURIComponent(body);

  if (encodedBody.length > maxEncodedBodyLen) {
    // Trim cleanly before encoding so Windows/desktop mailto handlers never silently drop oversized URLs
    let trimmed = body;
    while (trimmed.length > 80 && encodeURIComponent(`${trimmed}\n[Truncated - use Copy Summary]`).length > maxEncodedBodyLen) {
      trimmed = trimmed.slice(0, Math.floor(trimmed.length * 0.85));
    }
    encodedBody = encodeURIComponent(`${trimmed}\n[Truncated - use Copy Summary]`);
  }

  return `${base}${encodedBody}`;
}

function buildGmailComposeUrl(recipient: string, subject: string, body: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildAdmissionMailtoUrl(
  app: AdmissionApplication,
  recipient: string,
  payloadSummary: string
): string {
  const subject = `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`;
  return buildSafeMailtoUrl(recipient, subject, payloadSummary);
}

export function buildContactSummary(inquiry: ContactInquiryInput, recipient: string): string {
  const refCode = inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = inquiry.submittedAt || new Date().toLocaleString();

  return [
    'NEW ADMISSIONS & GENERAL INQUIRY - STANDARD HIGH SCHOOL ZZANA',
    `Reference Code: ${refCode}`,
    `Date Submitted: ${timestamp}`,
    `Subject: ${inquiry.subject}`,
    '',
    'SENDER DETAILS:',
    `Full Name: ${inquiry.name}`,
    `Email Address: ${inquiry.email}`,
    `Phone / WhatsApp: ${inquiry.phone || 'Not provided'}`,
    '',
    'MESSAGE:',
    inquiry.message,
    '',
    `School Email: ${recipient} | Selection Code: ${SCHOOL_CONTACTS.selectionCode} | UNEB Centre: ${SCHOOL_CONTACTS.centerNo}`
  ].join('\n');
}

export function buildContactMailtoUrl(
  inquiry: ContactInquiryInput,
  recipient: string,
  payloadSummary: string
): string {
  const subject = `STAHIZA Inquiry: ${inquiry.subject} - ${inquiry.name}`;
  return buildSafeMailtoUrl(recipient, subject, payloadSummary);
}

function triggerMailtoSafely(mailtoUrl: string): void {
  try {
    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    anchor.target = '_top';
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (e) {
    console.warn('Automatic mailto link trigger skipped by browser context:', e);
  }
}

/**
 * Prepares a pre-filled mail template for school administration (hasty0joel@gmail.com),
 * triggers the standard HTML5 mailto: link synchronously in the submit gesture, and
 * also provides a Gmail web compose URL for PC users without a desktop mail client.
 */
export function dispatchApplicationEmail(app: AdmissionApplication): EmailSendResult {
  const recipient = SCHOOL_CONTACTS.email; // hasty0joel@gmail.com
  const now = new Date().toLocaleString();
  const payloadSummary = buildApplicationSummary(app, recipient);
  const subject = `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`;
  const mailtoUrl = buildSafeMailtoUrl(recipient, subject, payloadSummary);
  const gmailUrl = buildGmailComposeUrl(recipient, subject, payloadSummary);

  triggerMailtoSafely(mailtoUrl);

  return {
    success: true,
    message: `Pre-filled email template opened for ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    methodUsed: 'Mail Template',
    mailtoUrl,
    gmailUrl
  };
}

/**
 * Prepares a pre-filled mail template for general contact & admissions desk inquiries,
 * triggers the standard HTML5 mailto: link synchronously, and returns a Gmail web compose URL.
 */
export function dispatchContactInquiryEmail(inquiry: ContactInquiryInput): EmailSendResult {
  const recipient = SCHOOL_CONTACTS.email;
  const now = new Date().toLocaleString();
  const normalizedInquiry: ContactInquiryInput = {
    ...inquiry,
    id: inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: inquiry.submittedAt || now
  };
  const payloadSummary = buildContactSummary(normalizedInquiry, recipient);
  const subject = `STAHIZA Inquiry: ${normalizedInquiry.subject} - ${normalizedInquiry.name}`;
  const mailtoUrl = buildSafeMailtoUrl(recipient, subject, payloadSummary);
  const gmailUrl = buildGmailComposeUrl(recipient, subject, payloadSummary);

  triggerMailtoSafely(mailtoUrl);

  return {
    success: true,
    message: `Pre-filled inquiry email template opened for ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    methodUsed: 'Mail Template',
    mailtoUrl,
    gmailUrl
  };
}
