import { AdmissionApplication } from '../types/admission';
import { SCHOOL_CONTACTS } from '../data/schoolData';

export interface EmailSendResult {
  success: boolean;
  message: string;
  recipient: string;
  sentAt: string;
  payloadSummary: string;
  methodUsed: 'EmailJS Server API' | 'Direct Mailto Fallback';
  mailtoUrl: string;
  fallbackTriggered: boolean;
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

interface ServerEmailDispatchPayload {
  ok?: boolean;
  method?: 'emailjs_rest' | 'fallback_required';
  configured?: boolean;
  fallbackRequired?: boolean;
  recipient?: string;
  message?: string;
  error?: string;
}

const CLIENT_FETCH_TIMEOUT_MS = 15000;

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

async function postJsonWithTimeout(url: string, body: unknown): Promise<{ ok: boolean; status: number; data: ServerEmailDispatchPayload | null }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CLIENT_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    let data: ServerEmailDispatchPayload | null = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    return { ok: response.ok, status: response.status, data };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

function triggerMailtoSafely(mailtoUrl: string): void {
  try {
    window.location.href = mailtoUrl;
  } catch (e) {
    console.warn('Automatic mailto trigger skipped by browser context:', e);
  }
}

/**
 * Dispatches completed application form details to school administration (hasty0joel@gmail.com)
 * via the server-side EmailJS REST API route, with automatic mailto fallback if keys are missing
 * or if an upstream network/API error occurs.
 */
export async function dispatchApplicationEmail(app: AdmissionApplication): Promise<EmailSendResult> {
  const recipient = SCHOOL_CONTACTS.email; // hasty0joel@gmail.com
  const now = new Date().toLocaleString();
  const payloadSummary = buildApplicationSummary(app, recipient);
  const mailtoUrl = buildAdmissionMailtoUrl(app, recipient, payloadSummary);

  try {
    const { ok, status, data } = await postJsonWithTimeout('/api/send-admission-email', {
      application: app,
      payloadSummary
    });

    if (ok && data?.ok) {
      return {
        success: true,
        message: data.message || `Application dispatched automatically via EmailJS to ${recipient}`,
        recipient,
        sentAt: now,
        payloadSummary,
        methodUsed: 'EmailJS Server API',
        mailtoUrl,
        fallbackTriggered: false
      };
    }

    console.warn(
      '[Admission Email Fallback] Server EmailJS unavailable or unconfigured:',
      data?.error || `HTTP ${status}`
    );
  } catch (err) {
    console.warn('[Admission Email Fallback] Network error contacting server email route:', err);
  }

  triggerMailtoSafely(mailtoUrl);

  return {
    success: true,
    message: `EmailJS fallback opened a pre-filled email draft to ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    methodUsed: 'Direct Mailto Fallback',
    mailtoUrl,
    fallbackTriggered: true
  };
}

/**
 * Dispatches general contact & admissions desk inquiries to school administration (hasty0joel@gmail.com)
 * via the server-side EmailJS REST API route, with automatic mailto fallback.
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

  try {
    const { ok, status, data } = await postJsonWithTimeout('/api/send-contact-email', {
      inquiry: normalizedInquiry,
      payloadSummary
    });

    if (ok && data?.ok) {
      return {
        success: true,
        message: data.message || `Inquiry dispatched automatically via EmailJS to ${recipient}`,
        recipient,
        sentAt: now,
        payloadSummary,
        methodUsed: 'EmailJS Server API',
        mailtoUrl,
        fallbackTriggered: false
      };
    }

    console.warn(
      '[Contact Email Fallback] Server EmailJS unavailable or unconfigured:',
      data?.error || `HTTP ${status}`
    );
  } catch (err) {
    console.warn('[Contact Email Fallback] Network error contacting server email route:', err);
  }

  triggerMailtoSafely(mailtoUrl);

  return {
    success: true,
    message: `EmailJS fallback opened a pre-filled email draft to ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    methodUsed: 'Direct Mailto Fallback',
    mailtoUrl,
    fallbackTriggered: true
  };
}
