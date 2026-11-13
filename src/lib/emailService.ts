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

interface ServerEmailDispatchPayload {
  ok?: boolean;
  method?: 'emailjs_rest' | 'fallback_required';
  configured?: boolean;
  fallbackRequired?: boolean;
  recipient?: string;
  message?: string;
  error?: string;
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

export function buildAdmissionMailtoUrl(app: AdmissionApplication, recipient: string, payloadSummary: string): string {
  const mailtoSubject = encodeURIComponent(
    `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`
  );
  const mailtoBody = encodeURIComponent(payloadSummary);
  return `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
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
    const response = await fetch('/api/send-admission-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        application: app,
        payloadSummary
      })
    });

    let data: ServerEmailDispatchPayload | null = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (response.ok && data?.ok) {
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
      data?.error || `HTTP ${response.status}`
    );
  } catch (err) {
    console.warn('[Admission Email Fallback] Network error contacting server email route:', err);
  }

  try {
    window.location.href = mailtoUrl;
  } catch (e) {
    console.warn('Automatic mailto trigger skipped by browser context:', e);
  }

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
