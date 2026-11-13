import { AdmissionApplication } from '../types/admission';
import { SCHOOL_CONTACTS } from '../data/schoolData';
import { getSupabasePublicUrl } from './supabase';

export interface EmailSendResult {
  success: boolean;
  message: string;
  recipient: string;
  sentAt: string;
  payloadSummary: string;
  htmlBody: string;
  deviceType: 'pc' | 'mobile';
  methodUsed: 'Gmail Web' | 'Mail App';
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

function escapeHtml(raw: string): string {
  return String(raw)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getEmailBadgeUrl(): string {
  const url = getSupabasePublicUrl('badge.png');
  if (/^https?:\/\//i.test(url)) return url;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`;
  }
  return url;
}

export function detectDeviceType(): 'pc' | 'mobile' {
  if (typeof navigator === 'undefined') return 'pc';

  const navWithUAData = navigator as Navigator & {
    userAgentData?: { mobile?: boolean };
  };
  if (typeof navWithUAData.userAgentData?.mobile === 'boolean') {
    return navWithUAData.userAgentData.mobile ? 'mobile' : 'pc';
  }

  const ua = navigator.userAgent || '';
  const isTouchMac = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);

  return isMobileUA || isTouchMac ? 'mobile' : 'pc';
}

export function buildApplicationSummary(app: AdmissionApplication, recipient: string): string {
  const combinationText =
    app.targetClass === 'S.5' || app.targetClass === 'S.6'
      ? app.combination || 'Pending Selection'
      : 'O-Level General Curriculum';

  const lines = [
    'STANDARD HIGH SCHOOL ZZANA - NEW ADMISSION APPLICATION',
    `Selection Code: ${SCHOOL_CONTACTS.selectionCode} | UNEB Centre: ${SCHOOL_CONTACTS.centerNo}`,
    '====================================================',
    `APPLICATION REFERENCE: ${app.id}`,
    `Submission Date: ${app.submittedAt}`,
    `Submission Source: ${app.sourceForm || 'Online Admissions Portal'}`,
    '',
    '01. STUDENT INFORMATION',
    `Student Name: ${app.studentName}`,
    `Gender: ${app.gender}`,
    `Date of Birth: ${app.dob || 'Not provided'}`,
    `Class Applying For: ${app.targetClass}`,
    `Residence: ${app.residenceType} Section`,
    `A-Level Combination: ${combinationText}`,
    '',
    '02. PARENT / GUARDIAN INFORMATION',
    `Parent Name: ${app.parentName}`,
    `Phone Number: ${app.parentPhone}`,
    `Email Address: ${app.parentEmail}`,
    '',
    '03. PREVIOUS ACADEMIC INFORMATION',
    `Previous School: ${app.previousSchool || 'Not specified'}`,
    `Academic Results: ${app.gradesAggregate || 'Pending Verification'}`,
    '',
    '04. ADDITIONAL INFORMATION',
    app.notes || 'No additional notes provided.',
    '',
    'ADMINISTRATIVE ACTION REQUIRED — STATUS: PENDING REVIEW',
    `Admissions Desk: ${recipient} | Tel: ${SCHOOL_CONTACTS.phone1}`
  ];

  return lines.join('\n');
}

export function buildAdmissionEmailHtml(app: AdmissionApplication): string {
  const badgeUrl = escapeHtml(getEmailBadgeUrl());
  const ref = escapeHtml(app.id);
  const submittedAt = escapeHtml(app.submittedAt);
  const source = escapeHtml(app.sourceForm || 'Online Admissions Portal');
  const studentName = escapeHtml(app.studentName);
  const gender = escapeHtml(app.gender);
  const dob = escapeHtml(app.dob || 'Not provided');
  const targetClass = escapeHtml(app.targetClass);
  const residenceType = escapeHtml(`${app.residenceType} Section`);
  const combination = escapeHtml(
    app.targetClass === 'S.5' || app.targetClass === 'S.6'
      ? app.combination || 'Pending Selection'
      : 'O-Level General Curriculum'
  );
  const parentName = escapeHtml(app.parentName);
  const parentPhone = escapeHtml(app.parentPhone);
  const parentPhoneHref = escapeHtml(app.parentPhone.replace(/\s+/g, ''));
  const parentEmail = escapeHtml(app.parentEmail);
  const previousSchool = escapeHtml(app.previousSchool || 'Not specified');
  const academicResults = escapeHtml(app.gradesAggregate || 'Pending Verification');
  const additionalNotes = escapeHtml(app.notes || 'No additional notes provided.').replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>STAHIZA Admission Application</title>
</head>
<body style="margin:0;padding:0;background:#f1f3f8;font-family:Arial,Helvetica,sans-serif;color:#263248;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f3f8;padding:25px 10px;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(10,25,47,0.08);">

<!-- HEADER -->
<tr>
<td align="center" style="background:#800020;padding:30px 20px;">
<img src="${badgeUrl}" alt="Standard High School Zzana Badge" width="105" height="105" style="display:block;margin:0 auto 15px;border-radius:50%;border:4px solid #ffffff;background:#ffffff;object-fit:contain;">
<h1 style="color:#ffffff;font-size:24px;margin:8px 0;letter-spacing:1px;font-weight:800;">
STANDARD HIGH SCHOOL ZZANA
</h1>
<p style="color:#ffffff;font-size:13px;margin:5px 0;letter-spacing:0.8px;font-weight:700;">
STAHIZA | ONLINE ADMISSIONS PORTAL
</p>
<p style="color:#f5dce4;font-size:12px;margin:8px 0 0;">
Selection Code: ${escapeHtml(SCHOOL_CONTACTS.selectionCode)} &nbsp; | &nbsp; UNEB Centre: ${escapeHtml(SCHOOL_CONTACTS.centerNo)}
</p>
</td>
</tr>

<!-- TITLE -->
<tr>
<td style="padding:30px 30px 15px;">
<h2 style="color:#800020;font-size:21px;margin:0 0 10px;font-weight:800;">
NEW ADMISSION APPLICATION
</h2>
<p style="font-size:14px;line-height:1.7;color:#555555;margin:0;">
Dear Admissions Administrator,<br><br>
A new student admission application has been submitted through the Standard High School Zzana website. Please review the applicant's details below.
</p>
</td>
</tr>

<!-- REFERENCE -->
<tr>
<td style="padding:10px 30px 20px;">
<table width="100%" cellpadding="14" cellspacing="0" style="background:#f9edf1;border-left:5px solid #800020;border-radius:0 8px 8px 0;">
<tr>
<td style="font-size:13px;line-height:1.6;">
<strong style="color:#800020;letter-spacing:0.5px;">APPLICATION REFERENCE</strong><br>
<span style="font-size:19px;font-weight:bold;color:#1e40af;display:inline-block;margin:4px 0 8px;">${ref}</span><br>
<strong>Submission Date:</strong> ${submittedAt}<br>
<strong>Submission Source:</strong> ${source}
</td>
</tr>
</table>
</td>
</tr>

<!-- STUDENT DETAILS -->
<tr>
<td style="padding:10px 30px;">
<h3 style="color:#800020;border-bottom:2px solid #800020;padding-bottom:8px;margin:0 0 12px;font-size:16px;">
01. STUDENT INFORMATION
</h3>
<table width="100%" cellpadding="10" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid #e6eaf2;">
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;width:42%;font-weight:bold;">Student Name</td><td>${studentName}</td></tr>
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;font-weight:bold;">Gender</td><td>${gender}</td></tr>
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;font-weight:bold;">Date of Birth</td><td>${dob}</td></tr>
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;font-weight:bold;">Class Applying For</td><td><strong>${targetClass}</strong></td></tr>
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;font-weight:bold;">Residence</td><td>${residenceType}</td></tr>
<tr><td style="background:#f5f6fa;font-weight:bold;">A-Level Combination</td><td>${combination}</td></tr>
</table>
</td>
</tr>

<!-- PARENT DETAILS -->
<tr>
<td style="padding:15px 30px;">
<h3 style="color:#800020;border-bottom:2px solid #800020;padding-bottom:8px;margin:0 0 12px;font-size:16px;">
02. PARENT / GUARDIAN INFORMATION
</h3>
<table width="100%" cellpadding="10" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid #e6eaf2;">
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;width:42%;font-weight:bold;">Parent Name</td><td>${parentName}</td></tr>
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;font-weight:bold;">Phone Number</td><td><a href="tel:${parentPhoneHref}" style="color:#1e40af;text-decoration:none;font-weight:bold;">${parentPhone}</a></td></tr>
<tr><td style="background:#f5f6fa;font-weight:bold;">Email Address</td><td><a href="mailto:${parentEmail}" style="color:#1e40af;text-decoration:none;">${parentEmail}</a></td></tr>
</table>
</td>
</tr>

<!-- ACADEMIC DETAILS -->
<tr>
<td style="padding:15px 30px;">
<h3 style="color:#800020;border-bottom:2px solid #800020;padding-bottom:8px;margin:0 0 12px;font-size:16px;">
03. PREVIOUS ACADEMIC INFORMATION
</h3>
<table width="100%" cellpadding="10" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid #e6eaf2;">
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;width:42%;font-weight:bold;">Previous School</td><td>${previousSchool}</td></tr>
<tr><td style="background:#f5f6fa;font-weight:bold;">Academic Results</td><td>${academicResults}</td></tr>
</table>
</td>
</tr>

<!-- ADDITIONAL NOTES -->
<tr>
<td style="padding:15px 30px;">
<h3 style="color:#800020;border-bottom:2px solid #800020;padding-bottom:8px;margin:0 0 12px;font-size:16px;">
04. ADDITIONAL INFORMATION
</h3>
<div style="background:#f5f6fa;padding:16px;border-radius:6px;border:1px solid #e6eaf2;font-size:14px;line-height:1.7;">
${additionalNotes}
</div>
</td>
</tr>

<!-- ADMIN ACTION -->
<tr>
<td style="padding:20px 30px 30px;">
<table width="100%" cellpadding="15" cellspacing="0" style="background:#fff7e8;border-left:5px solid #d49a27;border-radius:0 8px 8px 0;">
<tr>
<td>
<strong style="color:#8a5b00;font-size:15px;display:block;margin-bottom:6px;">
ADMINISTRATIVE ACTION REQUIRED
</strong>
<p style="font-size:13px;line-height:1.7;color:#555555;margin:0 0 10px;">
Please review this application, verify the submitted information and contact the parent or guardian regarding the next admission procedures.
</p>
<strong style="font-size:13px;">Application Status:</strong>
<span style="display:inline-block;background:#fef3c7;color:#b7791f;font-weight:bold;font-size:12px;padding:3px 10px;border-radius:999px;border:1px solid #f59e0b;margin-left:4px;">PENDING REVIEW</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="background:#0a192f;padding:28px 20px;">
<img src="${badgeUrl}" alt="STAHIZA Badge" width="65" height="65" style="display:block;margin:0 auto 12px;border-radius:50%;background:#ffffff;padding:4px;object-fit:contain;">
<h3 style="color:#ffffff;margin:5px 0;font-size:18px;letter-spacing:0.6px;">
STANDARD HIGH SCHOOL ZZANA
</h3>
<p style="color:#d8deeb;font-size:12px;line-height:1.7;margin:6px 0;">
Fostering Academic Excellence, Moral Discipline and Championship Talent.
</p>
<p style="color:#f5dce4;font-size:11px;margin:8px 0;">
${escapeHtml(SCHOOL_CONTACTS.location)} &nbsp; | &nbsp; ${escapeHtml(SCHOOL_CONTACTS.phone1)}
</p>
<p style="color:#aebbd0;font-size:11px;margin:14px 0 4px;">
This is an automatically generated admission notification.
</p>
<p style="color:#aebbd0;font-size:11px;margin:0;">
STAHIZA &copy; 2026 | All Rights Reserved
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
}

function buildSafeMailtoUrl(recipient: string, subject: string, body: string): string {
  const base = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=`;
  const maxEncodedBodyLen = Math.max(200, MAX_MAILTO_URL_LENGTH - base.length);
  let encodedBody = encodeURIComponent(body);

  if (encodedBody.length > maxEncodedBodyLen) {
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
    'STANDARD HIGH SCHOOL ZZANA - ADMISSIONS & GENERAL INQUIRY',
    `Selection Code: ${SCHOOL_CONTACTS.selectionCode} | UNEB Centre: ${SCHOOL_CONTACTS.centerNo}`,
    '=========================================================',
    `INQUIRY REFERENCE: ${refCode}`,
    `Submission Date: ${timestamp}`,
    `Inquiry Subject: ${inquiry.subject}`,
    '',
    '01. SENDER INFORMATION',
    `Full Name: ${inquiry.name}`,
    `Email Address: ${inquiry.email}`,
    `Phone / WhatsApp: ${inquiry.phone || 'Not provided'}`,
    '',
    '02. INQUIRY MESSAGE',
    inquiry.message,
    '',
    `School Email: ${recipient} | Tel: ${SCHOOL_CONTACTS.phone1}`
  ].join('\n');
}

export function buildContactEmailHtml(inquiry: ContactInquiryInput, recipient: string): string {
  const badgeUrl = escapeHtml(getEmailBadgeUrl());
  const refCode = escapeHtml(inquiry.id || 'INQ-2026');
  const submittedAt = escapeHtml(inquiry.submittedAt || new Date().toLocaleString());
  const subject = escapeHtml(inquiry.subject);
  const name = escapeHtml(inquiry.name);
  const email = escapeHtml(inquiry.email);
  const phone = escapeHtml(inquiry.phone || 'Not provided');
  const messageHtml = escapeHtml(inquiry.message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>STAHIZA Contact Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f1f3f8;font-family:Arial,Helvetica,sans-serif;color:#263248;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f3f8;padding:25px 10px;">
<tr>
<td align="center">
<table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
<tr>
<td align="center" style="background:#0a192f;padding:28px 20px;">
<img src="${badgeUrl}" alt="STAHIZA Badge" width="90" height="90" style="display:block;margin:0 auto 12px;border-radius:50%;border:3px solid #ffffff;background:#ffffff;object-fit:contain;">
<h1 style="color:#ffffff;font-size:22px;margin:6px 0;letter-spacing:0.8px;">STANDARD HIGH SCHOOL ZZANA</h1>
<p style="color:#fcd34d;font-size:12px;margin:4px 0 0;font-weight:bold;">ONLINE ADMISSIONS &amp; INQUIRIES DESK • CODE 2624</p>
</td>
</tr>
<tr>
<td style="padding:26px 30px 14px;">
<h2 style="color:#800020;font-size:20px;margin:0 0 10px;">NEW WEBSITE INQUIRY</h2>
<table width="100%" cellpadding="12" cellspacing="0" style="background:#f9edf1;border-left:5px solid #800020;">
<tr>
<td style="font-size:13px;line-height:1.6;">
<strong style="color:#800020;">REFERENCE:</strong> <strong style="color:#1e40af;">${refCode}</strong><br>
<strong>Date:</strong> ${submittedAt}<br>
<strong>Subject:</strong> ${subject}
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:10px 30px;">
<h3 style="color:#800020;border-bottom:2px solid #800020;padding-bottom:8px;font-size:15px;">01. SENDER DETAILS</h3>
<table width="100%" cellpadding="10" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid #e6eaf2;">
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;width:40%;font-weight:bold;">Full Name</td><td>${name}</td></tr>
<tr style="border-bottom:1px solid #e6eaf2;"><td style="background:#f5f6fa;font-weight:bold;">Email Address</td><td><a href="mailto:${email}" style="color:#1e40af;">${email}</a></td></tr>
<tr><td style="background:#f5f6fa;font-weight:bold;">Phone / WhatsApp</td><td>${phone}</td></tr>
</table>
</td>
</tr>
<tr>
<td style="padding:15px 30px 26px;">
<h3 style="color:#800020;border-bottom:2px solid #800020;padding-bottom:8px;font-size:15px;">02. MESSAGE</h3>
<div style="background:#f5f6fa;padding:16px;border-radius:6px;border:1px solid #e6eaf2;font-size:14px;line-height:1.7;">
${messageHtml}
</div>
</td>
</tr>
<tr>
<td align="center" style="background:#800020;padding:20px;color:#ffffff;font-size:11px;">
Standard High School Zzana • Recipient: ${escapeHtml(recipient)} • ${escapeHtml(SCHOOL_CONTACTS.phone1)}
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

export function buildContactMailtoUrl(
  inquiry: ContactInquiryInput,
  recipient: string,
  payloadSummary: string
): string {
  const subject = `STAHIZA Inquiry: ${inquiry.subject} - ${inquiry.name}`;
  return buildSafeMailtoUrl(recipient, subject, payloadSummary);
}

/**
 * Copies the formatted HTML email template (with plain-text fallback) to the clipboard
 * so pasting into Gmail Web compose renders the full maroon & navy branded HTML table.
 */
export async function copyRichEmailToClipboard(htmlBody: string, plainTextBody: string): Promise<boolean> {
  try {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.write === 'function' &&
      typeof ClipboardItem !== 'undefined'
    ) {
      const htmlBlob = new Blob([htmlBody], { type: 'text/html' });
      const textBlob = new Blob([plainTextBody], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        })
      ]);
      return true;
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(plainTextBody);
      return true;
    }
  } catch {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainTextBody);
        return true;
      }
    } catch {
      return false;
    }
  }
  return false;
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

function triggerWebEmailSafely(gmailUrl: string): void {
  try {
    const anchor = document.createElement('a');
    anchor.href = gmailUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (e) {
    console.warn('Automatic web email trigger skipped by browser context:', e);
  }
}

/**
 * Automatically detects whether the user is on PC or Mobile:
 * - PC / Desktop: opens Gmail Web compose directly in a new tab with pre-filled application details.
 * - Mobile: opens the device's default mail app via standard HTML5 mailto: URI.
 * Also builds the branded STAHIZA HTML email template (`htmlBody`) for preview and rich clipboard paste.
 */
export function dispatchApplicationEmail(app: AdmissionApplication): EmailSendResult {
  const recipient = SCHOOL_CONTACTS.email; // hasty0joel@gmail.com
  const now = new Date().toLocaleString();
  const deviceType = detectDeviceType();
  const payloadSummary = buildApplicationSummary(app, recipient);
  const htmlBody = buildAdmissionEmailHtml(app);
  const subject = `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`;
  const mailtoUrl = buildSafeMailtoUrl(recipient, subject, payloadSummary);
  const gmailUrl = buildGmailComposeUrl(recipient, subject, payloadSummary);

  if (deviceType === 'pc') {
    triggerWebEmailSafely(gmailUrl);
  } else {
    triggerMailtoSafely(mailtoUrl);
  }

  return {
    success: true,
    message:
      deviceType === 'pc'
        ? `PC detected: Pre-filled Gmail Web compose opened for ${recipient}`
        : `Mobile detected: Pre-filled mail app opened for ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    htmlBody,
    deviceType,
    methodUsed: deviceType === 'pc' ? 'Gmail Web' : 'Mail App',
    mailtoUrl,
    gmailUrl
  };
}

/**
 * Automatically detects PC vs Mobile for general contact & admissions desk inquiries:
 * - PC / Desktop: opens Gmail Web compose directly.
 * - Mobile: opens the native mail app via mailto:.
 */
export function dispatchContactInquiryEmail(inquiry: ContactInquiryInput): EmailSendResult {
  const recipient = SCHOOL_CONTACTS.email;
  const now = new Date().toLocaleString();
  const deviceType = detectDeviceType();
  const normalizedInquiry: ContactInquiryInput = {
    ...inquiry,
    id: inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: inquiry.submittedAt || now
  };
  const payloadSummary = buildContactSummary(normalizedInquiry, recipient);
  const htmlBody = buildContactEmailHtml(normalizedInquiry, recipient);
  const subject = `STAHIZA Inquiry: ${normalizedInquiry.subject} - ${normalizedInquiry.name}`;
  const mailtoUrl = buildSafeMailtoUrl(recipient, subject, payloadSummary);
  const gmailUrl = buildGmailComposeUrl(recipient, subject, payloadSummary);

  if (deviceType === 'pc') {
    triggerWebEmailSafely(gmailUrl);
  } else {
    triggerMailtoSafely(mailtoUrl);
  }

  return {
    success: true,
    message:
      deviceType === 'pc'
        ? `PC detected: Pre-filled Gmail Web compose opened for ${recipient}`
        : `Mobile detected: Pre-filled inquiry email opened for ${recipient}`,
    recipient,
    sentAt: now,
    payloadSummary,
    htmlBody,
    deviceType,
    methodUsed: deviceType === 'pc' ? 'Gmail Web' : 'Mail App',
    mailtoUrl,
    gmailUrl
  };
}
