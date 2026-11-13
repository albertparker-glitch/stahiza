import { AdmissionApplication } from '../types/admission';
import { SCHOOL_CONTACTS, computeTerm1FeeBreakdown } from '../data/schoolData';
import { getSupabasePublicUrl } from './supabase';

export interface EmailSendResult {
  success: boolean;
  message: string;
  recipient: string;
  subject: string;
  refCode: string;
  emailKind: 'admission' | 'contact';
  sentAt: string;
  payloadSummary: string;
  htmlBody: string;
  emlContent: string;
  emlFilename: string;
  deviceType: 'pc' | 'mobile';
  methodUsed: 'Gmail Web' | 'Mail App';
  mailtoUrl: string;
  gmailUrl: string;
  popupBlocked?: boolean;
  autoCopyPromise: Promise<boolean>;
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

function getLocalOriginBadgeUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/pages/images/badge.png`;
  }
  return '/pages/images/badge.png';
}

export function getEmailBadgeUrl(): string {
  const url = getSupabasePublicUrl('badge.png');
  if (/^https?:\/\//i.test(url)) return url;
  return getLocalOriginBadgeUrl();
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

  const fees = computeTerm1FeeBreakdown(app.targetClass, app.residenceType);

  const lines = [
    'STANDARD HIGH SCHOOL ZZANA (STAHIZA) - OFFICIAL ADMISSION APPLICATION',
    `Selection Code: ${SCHOOL_CONTACTS.selectionCode} | UNEB Centre: ${SCHOOL_CONTACTS.centerNo}`,
    '====================================================================',
    `APPLICATION REFERENCE: ${app.id}`,
    `Submission Date: ${app.submittedAt}`,
    `Submission Source: ${app.sourceForm || 'Online Admissions Portal'}`,
    '',
    '01. STUDENT INFORMATION',
    `Student Name: ${app.studentName}`,
    `Gender: ${app.gender}`,
    `Date of Birth: ${app.dob || 'Not provided'}`,
    `Class Applying For: ${app.targetClass}`,
    `Residence Option: ${app.residenceType} Section`,
    `Curriculum / Combination: ${combinationText}`,
    '',
    '02. PARENT / GUARDIAN INFORMATION',
    `Parent / Guardian Name: ${app.parentName}`,
    `Phone Number: ${app.parentPhone}`,
    `Email Address: ${app.parentEmail}`,
    '',
    '03. PREVIOUS ACADEMIC RECORD',
    `Previous School: ${app.previousSchool || 'Not specified'}`,
    `Academic Results / Aggregates: ${app.gradesAggregate || 'Pending Verification'}`,
    '',
    `04. ESTIMATED TERM 1 FEE SUMMARY (${app.targetClass} ${app.residenceType})`,
    `Tuition Fee: UGX ${fees.tuition.toLocaleString()}/=`,
    `Admission Fee: UGX ${fees.admissionFee.toLocaleString()}/=`,
    `Uniform (Labelling Inc.): UGX ${fees.uniform.toLocaleString()}/=`,
    `ID Card, Sportswear & Requirements: UGX ${(fees.idCard + fees.sportsWear + fees.requirements).toLocaleString()}/=`,
    `TOTAL TERM 1 ESTIMATE: UGX ${fees.total.toLocaleString()}/=`,
    '',
    '05. ADDITIONAL INFORMATION',
    app.notes || 'No additional notes provided.',
    '',
    'STATUS: PENDING ADMISSIONS REVIEW',
    `Admissions Office: ${recipient} | Tel: ${SCHOOL_CONTACTS.phone1}`
  ];

  return lines.join('\n');
}

function renderEmailHeaderHtml(params: {
  badgeUrl: string;
  fallbackBadgeUrl: string;
  ribbonText: string;
}): string {
  const { badgeUrl, fallbackBadgeUrl, ribbonText } = params;
  return `<!-- EXECUTIVE NAVY, MAROON & GOLD CREST HEADER -->
<tr>
<td style="background:#d4af37;height:4px;font-size:0;line-height:0;">&nbsp;</td>
</tr>
<tr>
<td align="center" style="background:#0a192f;padding:28px 24px 24px;">
<table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
<tr>
<td align="center">
<div style="width:94px;height:94px;border-radius:50%;background:#ffffff;border:3px solid #d4af37;padding:5px;box-sizing:border-box;margin:0 auto 14px;overflow:hidden;">
<img src="${badgeUrl}" alt="Standard High School Zzana School Badge" width="80" height="80" onerror="this.onerror=null;this.src='${fallbackBadgeUrl}';" style="display:block;width:80px;height:80px;object-fit:contain;border-radius:50%;">
</div>
</td>
</tr>
<tr>
<td align="center">
<h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:0.8px;line-height:1.25;">
STANDARD HIGH SCHOOL ZZANA
</h1>
<p style="margin:6px 0 0;color:#fcd34d;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:13px;letter-spacing:0.4px;">
&ldquo;Education Is The Way&rdquo;
</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td align="center" style="background:#800020;padding:10px 20px;border-top:1px solid #d4af37;border-bottom:1px solid #630018;">
<p style="margin:0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">
${ribbonText}
</p>
</td>
</tr>`;
}

function renderEmailFooterHtml(params: {
  badgeUrl: string;
  fallbackBadgeUrl: string;
  recipient: string;
}): string {
  const { badgeUrl, fallbackBadgeUrl, recipient } = params;
  return `<!-- EXECUTIVE NAVY FOOTER SEAL -->
<tr>
<td style="background:#d4af37;height:2px;font-size:0;line-height:0;">&nbsp;</td>
</tr>
<tr>
<td align="center" style="background:#0a192f;padding:24px 28px;">
<table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
<tr>
<td align="center" style="padding-bottom:10px;">
<img src="${badgeUrl}" alt="STAHIZA Crest" width="46" height="46" onerror="this.onerror=null;this.src='${fallbackBadgeUrl}';" style="display:block;width:46px;height:46px;border-radius:50%;background:#ffffff;border:2px solid #d4af37;padding:3px;object-fit:contain;">
</td>
</tr>
<tr>
<td align="center">
<p style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:700;letter-spacing:0.5px;">
Standard High School Zzana (STAHIZA)
</p>
<p style="margin:6px 0 0;color:#cbd5e1;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;">
${escapeHtml(SCHOOL_CONTACTS.location)}
</p>
<p style="margin:4px 0 0;color:#fcd34d;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;">
Admissions: ${escapeHtml(recipient)} &nbsp;&middot;&nbsp; Tel: ${escapeHtml(SCHOOL_CONTACTS.phone1)} &nbsp;&middot;&nbsp; ${escapeHtml(SCHOOL_CONTACTS.phone2)}
</p>
<p style="margin:12px 0 0;color:#94a3b8;font-family:Arial,Helvetica,sans-serif;font-size:11px;">
${escapeHtml(SCHOOL_CONTACTS.box)} &nbsp;&middot;&nbsp; Official School Correspondence
</p>
</td>
</tr>
</table>
</td>
</tr>`;
}

export function buildAdmissionEmailHtml(app: AdmissionApplication): string {
  const badgeUrl = escapeHtml(getEmailBadgeUrl());
  const fallbackBadgeUrl = escapeHtml(getLocalOriginBadgeUrl());
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
  const fees = computeTerm1FeeBreakdown(app.targetClass, app.residenceType);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>STAHIZA Official Admission Application - ${ref}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6fa;padding:24px 12px;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #cbd5e1;">

${renderEmailHeaderHtml({
  badgeUrl,
  fallbackBadgeUrl,
  ribbonText: `Official Admission Dispatch &nbsp;&middot;&nbsp; Selection Code ${escapeHtml(SCHOOL_CONTACTS.selectionCode)} &nbsp;&middot;&nbsp; UNEB Centre ${escapeHtml(SCHOOL_CONTACTS.centerNo)}`,
})}

<!-- FORMAL SALUTATION & REFERENCE HEADER -->
<tr>
<td style="padding:28px 32px 18px;border-bottom:1px solid #e2e8f0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#800020;">
Admissions Registry Filing
</p>
<h2 style="margin:0;color:#0a192f;font-size:21px;font-weight:700;line-height:1.3;">
New Student Admission Application
</h2>
</td>
<td align="right" valign="top" style="font-variant-numeric:tabular-nums;">
<p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#64748b;">
Reference No.
</p>
<p style="margin:3px 0 0;font-size:15px;font-weight:700;color:#0a192f;font-family:'Courier New',monospace;">
${ref}
</p>
</td>
</tr>
</table>

<p style="margin:14px 0 0;font-size:13px;color:#475569;line-height:1.65;">
Dear Admissions Office, please find below an official application submitted via the Standard High School Zzana online portal for review and placement processing.
</p>

<p style="margin:14px 0 0;padding-top:12px;border-top:1px solid #f1f5f9;font-size:12px;color:#475569;font-variant-numeric:tabular-nums;">
<strong style="color:#0a192f;">Submitted:</strong> ${submittedAt} &nbsp;&middot;&nbsp;
<strong style="color:#0a192f;">Channel:</strong> ${source} &nbsp;&middot;&nbsp;
<strong style="color:#800020;">Status:</strong> Pending Review
</p>
</td>
</tr>

<!-- 01. STUDENT INFORMATION -->
<tr>
<td style="padding:22px 32px 10px;">
<h3 style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #0a192f;color:#0a192f;font-size:13px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
01. Student Applicant Particulars
</h3>
<table width="100%" cellpadding="9" cellspacing="0" border="0" style="font-size:13px;border-collapse:collapse;border:1px solid #e2e8f0;">
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;width:40%;font-weight:700;color:#334155;">Full Student Name</td><td style="color:#0f172a;font-weight:700;">${studentName}</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;font-weight:700;color:#334155;">Gender &amp; Date of Birth</td><td style="color:#1e293b;font-variant-numeric:tabular-nums;">${gender} &nbsp;&middot;&nbsp; ${dob}</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;font-weight:700;color:#334155;">Class Applying For</td><td style="color:#800020;font-weight:700;">${targetClass} (${residenceType})</td></tr>
<tr><td style="background:#f8fafc;font-weight:700;color:#334155;">Curriculum / Combination</td><td style="color:#1e293b;">${combination}</td></tr>
</table>
</td>
</tr>

<!-- 02. PARENT / GUARDIAN INFORMATION -->
<tr>
<td style="padding:14px 32px 10px;">
<h3 style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #0a192f;color:#0a192f;font-size:13px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
02. Parent / Guardian Contact Details
</h3>
<table width="100%" cellpadding="9" cellspacing="0" border="0" style="font-size:13px;border-collapse:collapse;border:1px solid #e2e8f0;">
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;width:40%;font-weight:700;color:#334155;">Parent / Guardian</td><td style="color:#0f172a;font-weight:700;">${parentName}</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;font-weight:700;color:#334155;">Telephone / WhatsApp</td><td style="font-variant-numeric:tabular-nums;"><a href="tel:${parentPhoneHref}" style="color:#0a192f;text-decoration:none;font-weight:700;">${parentPhone}</a></td></tr>
<tr><td style="background:#f8fafc;font-weight:700;color:#334155;">Email Address</td><td><a href="mailto:${parentEmail}" style="color:#800020;text-decoration:none;font-weight:600;">${parentEmail}</a></td></tr>
</table>
</td>
</tr>

<!-- 03. PREVIOUS ACADEMIC RECORD -->
<tr>
<td style="padding:14px 32px 10px;">
<h3 style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #0a192f;color:#0a192f;font-size:13px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
03. Previous Academic Background
</h3>
<table width="100%" cellpadding="9" cellspacing="0" border="0" style="font-size:13px;border-collapse:collapse;border:1px solid #e2e8f0;">
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;width:40%;font-weight:700;color:#334155;">Previous School</td><td style="color:#1e293b;">${previousSchool}</td></tr>
<tr><td style="background:#f8fafc;font-weight:700;color:#334155;">Academic Grades / Aggregate</td><td style="color:#1e293b;">${academicResults}</td></tr>
</table>
</td>
</tr>

<!-- 04. OFFICIAL TERM 1 FEE ESTIMATE SUMMARY -->
<tr>
<td style="padding:14px 32px 10px;">
<h3 style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #0a192f;color:#0a192f;font-size:13px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
04. Term 1 Official Fee Estimate (${targetClass} ${escapeHtml(app.residenceType)})
</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size:12.5px;border-collapse:collapse;border:1px solid #e2e8f0;font-variant-numeric:tabular-nums;">
<tr style="border-bottom:1px solid #e2e8f0;"><td style="color:#334155;">Tuition Fee (${targetClass} ${escapeHtml(app.residenceType)})</td><td align="right" style="font-weight:700;color:#0f172a;">UGX ${fees.tuition.toLocaleString()}/=</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="color:#334155;">Admission &amp; Registration Fee</td><td align="right" style="color:#334155;">UGX ${fees.admissionFee.toLocaleString()}/=</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="color:#334155;">School Uniform (Labelling Inclusive)</td><td align="right" style="color:#334155;">UGX ${fees.uniform.toLocaleString()}/=</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="color:#334155;">ID Card, Sportswear &amp; Entry Requirements</td><td align="right" style="color:#334155;">UGX ${(fees.idCard + fees.sportsWear + fees.requirements).toLocaleString()}/=</td></tr>
<tr style="background:#0a192f;color:#ffffff;"><td style="font-weight:700;padding:10px 8px;">Total Estimated Term 1 Reporting Fee</td><td align="right" style="font-weight:700;color:#fcd34d;padding:10px 8px;font-size:14px;">UGX ${fees.total.toLocaleString()}/=</td></tr>
</table>
</td>
</tr>

<!-- 05. NOTES & ADMINISTRATIVE NOTICE -->
<tr>
<td style="padding:14px 32px 28px;">
<h3 style="margin:0 0 8px;color:#0a192f;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
05. Additional Notes
</h3>
<div style="background:#f8fafc;padding:12px 14px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;line-height:1.6;color:#334155;">
${additionalNotes}
</div>

<table width="100%" cellpadding="14" cellspacing="0" border="0" style="margin-top:16px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;">
<tr>
<td style="font-size:12.5px;line-height:1.6;color:#78350f;">
<strong style="color:#0a192f;display:block;margin-bottom:4px;font-size:13px;">Next Steps for Admissions Review</strong>
Please verify the candidate&rsquo;s academic records and contact the parent or guardian within 2 business days regarding interview scheduling and official admission clearance.
</td>
</tr>
</table>
</td>
</tr>

${renderEmailFooterHtml({
  badgeUrl,
  fallbackBadgeUrl,
  recipient: SCHOOL_CONTACTS.email,
})}

</table>

</td>
</tr>
</table>
</body>
</html>`;
}

export function buildContactSummary(inquiry: ContactInquiryInput, recipient: string): string {
  const refCode = inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = inquiry.submittedAt || new Date().toLocaleString();

  return [
    'STANDARD HIGH SCHOOL ZZANA (STAHIZA) - OFFICIAL INQUIRY DISPATCH',
    `Selection Code: ${SCHOOL_CONTACTS.selectionCode} | UNEB Centre: ${SCHOOL_CONTACTS.centerNo}`,
    '====================================================================',
    `INQUIRY REFERENCE: ${refCode}`,
    `Submission Date: ${timestamp}`,
    `Subject: ${inquiry.subject}`,
    '',
    '01. SENDER CONTACT DETAILS',
    `Full Name: ${inquiry.name}`,
    `Email Address: ${inquiry.email}`,
    `Phone / WhatsApp: ${inquiry.phone || 'Not provided'}`,
    '',
    '02. INQUIRY MESSAGE',
    inquiry.message,
    '',
    `Official Desk: ${recipient} | Tel: ${SCHOOL_CONTACTS.phone1}`
  ].join('\n');
}

export function buildContactEmailHtml(inquiry: ContactInquiryInput, recipient: string): string {
  const badgeUrl = escapeHtml(getEmailBadgeUrl());
  const fallbackBadgeUrl = escapeHtml(getLocalOriginBadgeUrl());
  const refCode = escapeHtml(inquiry.id || 'INQ-2026');
  const submittedAt = escapeHtml(inquiry.submittedAt || new Date().toLocaleString());
  const subject = escapeHtml(inquiry.subject);
  const name = escapeHtml(inquiry.name);
  const email = escapeHtml(inquiry.email);
  const phone = escapeHtml(inquiry.phone || 'Not provided');
  const phoneHref = escapeHtml((inquiry.phone || '').replace(/\s+/g, ''));
  const messageHtml = escapeHtml(inquiry.message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>STAHIZA Official Inquiry - ${refCode}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6fa;padding:24px 12px;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #cbd5e1;">

${renderEmailHeaderHtml({
  badgeUrl,
  fallbackBadgeUrl,
  ribbonText: `Admissions &amp; Inquiries Desk &nbsp;&middot;&nbsp; Selection Code ${escapeHtml(SCHOOL_CONTACTS.selectionCode)} &nbsp;&middot;&nbsp; UNEB Centre ${escapeHtml(SCHOOL_CONTACTS.centerNo)}`,
})}

<!-- FORMAL HEADER ROW -->
<tr>
<td style="padding:28px 32px 18px;border-bottom:1px solid #e2e8f0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#800020;">
Website Inquiry Correspondence
</p>
<h2 style="margin:0;color:#0a192f;font-size:21px;font-weight:700;line-height:1.3;">
${subject}
</h2>
</td>
<td align="right" valign="top" style="font-variant-numeric:tabular-nums;">
<p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#64748b;">
Inquiry Ref.
</p>
<p style="margin:3px 0 0;font-size:15px;font-weight:700;color:#0a192f;font-family:'Courier New',monospace;">
${refCode}
</p>
</td>
</tr>
</table>

<p style="margin:12px 0 0;font-size:12px;color:#475569;font-variant-numeric:tabular-nums;">
<strong style="color:#0a192f;">Submitted:</strong> ${submittedAt} &nbsp;&middot;&nbsp;
<strong style="color:#0a192f;">Recipient Desk:</strong> ${escapeHtml(recipient)}
</p>
</td>
</tr>

<!-- 01. SENDER DETAILS -->
<tr>
<td style="padding:22px 32px 10px;">
<h3 style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #0a192f;color:#0a192f;font-size:13px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
01. Sender Contact Particulars
</h3>
<table width="100%" cellpadding="9" cellspacing="0" border="0" style="font-size:13px;border-collapse:collapse;border:1px solid #e2e8f0;">
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;width:40%;font-weight:700;color:#334155;">Full Name</td><td style="color:#0f172a;font-weight:700;">${name}</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="background:#f8fafc;font-weight:700;color:#334155;">Email Address</td><td><a href="mailto:${email}" style="color:#800020;text-decoration:none;font-weight:600;">${email}</a></td></tr>
<tr><td style="background:#f8fafc;font-weight:700;color:#334155;">Phone / WhatsApp</td><td style="font-variant-numeric:tabular-nums;">${
  inquiry.phone
    ? `<a href="tel:${phoneHref}" style="color:#0a192f;text-decoration:none;font-weight:700;">${phone}</a>`
    : phone
}</td></tr>
</table>
</td>
</tr>

<!-- 02. MESSAGE -->
<tr>
<td style="padding:14px 32px 28px;">
<h3 style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #0a192f;color:#0a192f;font-size:13px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
02. Inquiry Message
</h3>
<div style="background:#f8fafc;padding:16px 18px;border:1px solid #e2e8f0;border-radius:6px;font-size:13.5px;line-height:1.7;color:#1e293b;">
${messageHtml}
</div>

<p style="margin:14px 0 0;font-size:12px;color:#64748b;line-height:1.6;">
Please reply directly to <a href="mailto:${email}" style="color:#800020;font-weight:700;text-decoration:none;">${email}</a>${inquiry.phone ? ` or reach out via telephone/WhatsApp at <strong style="color:#0a192f;">${phone}</strong>` : ''}.
</p>
</td>
</tr>

${renderEmailFooterHtml({
  badgeUrl,
  fallbackBadgeUrl,
  recipient,
})}

</table>

</td>
</tr>
</table>
</body>
</html>`;
}

export function buildEmlFileContent(params: {
  recipient: string;
  subject: string;
  htmlBody: string;
  plainTextBody: string;
  replyTo?: string;
}): string {
  const { recipient, subject, htmlBody, plainTextBody, replyTo } = params;
  const boundary = `----=_STAHIZA_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const dateHeader = new Date().toUTCString();

  const lines = [
    `To: ${recipient}`,
    `Subject: ${subject}`,
    `Date: ${dateHeader}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    'X-Unsent: 1',
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    plainTextBody,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    htmlBody,
    '',
    `--${boundary}--`,
  ];

  return lines.join('\r\n');
}

export function downloadEmlFile(emlContent: string, filename: string): void {
  const blob = new Blob([emlContent], { type: 'message/rfc822;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildSafeMailtoUrl(recipient: string, subject: string, body?: string): string {
  if (!body) {
    return `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
  }
  const base = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=`;
  const maxEncodedBodyLen = Math.max(200, MAX_MAILTO_URL_LENGTH - base.length);
  let encodedBody = encodeURIComponent(body);

  if (encodedBody.length > maxEncodedBodyLen) {
    let trimmed = body;
    while (trimmed.length > 80 && encodeURIComponent(`${trimmed}\n[Truncated - paste copied branded email]`).length > maxEncodedBodyLen) {
      trimmed = trimmed.slice(0, Math.floor(trimmed.length * 0.85));
    }
    encodedBody = encodeURIComponent(`${trimmed}\n[Truncated - paste copied branded email]`);
  }

  return `${base}${encodedBody}`;
}

function buildGmailComposeUrl(recipient: string, subject: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}`;
}

export function buildAdmissionMailtoUrl(
  app: AdmissionApplication,
  recipient: string,
  _payloadSummary: string
): string {
  const subject = `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`;
  return buildSafeMailtoUrl(recipient, subject);
}

export function buildContactMailtoUrl(
  inquiry: ContactInquiryInput,
  recipient: string,
  _payloadSummary: string
): string {
  const subject = `STAHIZA Inquiry: ${inquiry.subject} - ${inquiry.name}`;
  return buildSafeMailtoUrl(recipient, subject);
}

function extractEmailFragmentForClipboard(htmlBody: string): string {
  const bodyMatch = htmlBody.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const fragment = bodyMatch ? bodyMatch[1].trim() : htmlBody;
  // Strip inline JS handlers so Gmail / Mail compose rich-text sanitizers preserve <img> and layout cleanly
  return fragment.replace(/\sonerror="[^"]*"/gi, '');
}

function copyHtmlViaDomSelection(htmlFragment: string): boolean {
  if (typeof document === 'undefined') return false;
  const container = document.createElement('div');
  container.setAttribute('contenteditable', 'true');
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '0';
  container.style.pointerEvents = 'none';
  container.innerHTML = htmlFragment;
  document.body.appendChild(container);

  let copied = false;
  try {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(container);
    selection?.removeAllRanges();
    selection?.addRange(range);
    copied = document.execCommand('copy');
    selection?.removeAllRanges();
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(container);
  }
  return copied;
}

/**
 * Copies the branded HTML email fragment (with plain-text fallback) to the clipboard
 * so pasting into Gmail Web compose or mobile Mail App renders the full Navy, Maroon & Gold STAHIZA crest layout.
 */
export async function copyRichEmailToClipboard(htmlBody: string, plainTextBody: string): Promise<boolean> {
  const htmlFragment = extractEmailFragmentForClipboard(htmlBody);
  try {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.write === 'function' &&
      typeof ClipboardItem !== 'undefined'
    ) {
      const htmlBlob = new Blob([htmlFragment], { type: 'text/html' });
      const textBlob = new Blob([plainTextBody], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        })
      ]);
      return true;
    }

    if (copyHtmlViaDomSelection(htmlFragment)) {
      return true;
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(plainTextBody);
      return true;
    }
  } catch {
    if (copyHtmlViaDomSelection(htmlFragment)) {
      return true;
    }
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

/**
 * Performs synchronous DOM-selection HTML copy FIRST (0ms, preserves browser user-gesture activation
 * so window.open isn't blocked by popup blockers), with ClipboardItem fallback when needed.
 */
function copyRichEmailPreservingGesture(htmlBody: string, plainTextBody: string): Promise<boolean> {
  const htmlFragment = extractEmailFragmentForClipboard(htmlBody);
  const syncCopied = copyHtmlViaDomSelection(htmlFragment);
  if (syncCopied) {
    return Promise.resolve(true);
  }
  return copyRichEmailToClipboard(htmlBody, plainTextBody);
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

function triggerWebEmailSafely(gmailUrl: string): boolean {
  try {
    const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (opened) {
      return true;
    }
    const anchor = document.createElement('a');
    anchor.href = gmailUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return false;
  } catch (e) {
    console.warn('Automatic web email trigger skipped by browser context:', e);
    return false;
  }
}

let originalDocTitleCache: string | null = null;
let restoreTitleTimer: ReturnType<typeof setTimeout> | null = null;

function showTemporaryPasteTabReminder(deviceType: 'pc' | 'mobile'): void {
  if (typeof document === 'undefined') return;
  if (originalDocTitleCache === null) {
    originalDocTitleCache = document.title;
  }
  document.title =
    deviceType === 'pc'
      ? '✓ Copied! Press Ctrl+V in Gmail — STAHIZA'
      : '✓ Copied! Tap Paste in Mail — STAHIZA';

  if (restoreTitleTimer) clearTimeout(restoreTitleTimer);
  restoreTitleTimer = setTimeout(() => {
    if (originalDocTitleCache !== null) {
      document.title = originalDocTitleCache;
      originalDocTitleCache = null;
    }
  }, 15000);
}

export async function openGmailAndCopyStyledEmail(result: EmailSendResult): Promise<boolean> {
  const copyPromise = copyRichEmailPreservingGesture(result.htmlBody, result.payloadSummary);
  showTemporaryPasteTabReminder('pc');
  triggerWebEmailSafely(result.gmailUrl);
  return copyPromise;
}

export async function openMailAppAndCopyStyledEmail(result: EmailSendResult): Promise<boolean> {
  const copyPromise = copyRichEmailPreservingGesture(result.htmlBody, result.payloadSummary);
  showTemporaryPasteTabReminder('mobile');
  triggerMailtoSafely(result.mailtoUrl);
  return copyPromise;
}

/**
 * Automatically detects PC vs Mobile:
 * 1. Copies the live finished branded HTML email (with STAHIZA badge) to clipboard while focused.
 * 2. On PC: opens clean Gmail Web compose (ready to Ctrl+V / Cmd+V & send).
 * 3. On Mobile: opens the device's Mail App directly (ready to tap Paste & send).
 */
export async function dispatchApplicationEmail(app: AdmissionApplication): Promise<EmailSendResult> {
  const recipient = SCHOOL_CONTACTS.email;
  const now = new Date().toLocaleString();
  const deviceType = detectDeviceType();
  const payloadSummary = buildApplicationSummary(app, recipient);
  const htmlBody = buildAdmissionEmailHtml(app);
  const subject = `STAHIZA Admission Application - ${app.studentName} (${app.targetClass}) [${app.id}]`;
  const mailtoUrl = buildSafeMailtoUrl(recipient, subject);
  const gmailUrl = buildGmailComposeUrl(recipient, subject);
  const emlContent = buildEmlFileContent({
    recipient,
    subject,
    htmlBody,
    plainTextBody: payloadSummary,
    replyTo: app.parentEmail,
  });
  const emlFilename = `STAHIZA-Application-${app.id}.eml`;

  // Copy rich HTML synchronously before launching compose so browser user-gesture activation stays intact
  const autoCopyPromise = copyRichEmailPreservingGesture(htmlBody, payloadSummary);
  showTemporaryPasteTabReminder(deviceType);
  let popupBlocked = false;

  if (deviceType === 'pc') {
    popupBlocked = !triggerWebEmailSafely(gmailUrl);
  } else {
    triggerMailtoSafely(mailtoUrl);
  }

  const autoCopied = await autoCopyPromise;

  return {
    success: true,
    message:
      deviceType === 'pc'
        ? `PC detected: Finished preview copied & Gmail Web opened for ${recipient}`
        : `Mobile detected: Finished preview copied & Mail App opened for ${recipient}`,
    recipient,
    subject,
    refCode: app.id,
    emailKind: 'admission',
    sentAt: now,
    payloadSummary,
    htmlBody,
    emlContent,
    emlFilename,
    deviceType,
    methodUsed: deviceType === 'pc' ? 'Gmail Web' : 'Mail App',
    mailtoUrl,
    gmailUrl,
    popupBlocked,
    autoCopyPromise: Promise.resolve(autoCopied),
  };
}

/**
 * Automatically detects PC vs Mobile for general contact inquiries:
 * 1. Copies the live finished branded HTML email (with STAHIZA badge) to clipboard synchronously while focused.
 * 2. On PC: opens clean Gmail Web compose (ready to Ctrl+V / Cmd+V & send).
 * 3. On Mobile: opens the device's Mail App directly (ready to tap Paste & send).
 */
export async function dispatchContactInquiryEmail(inquiry: ContactInquiryInput): Promise<EmailSendResult> {
  const recipient = SCHOOL_CONTACTS.email;
  const now = new Date().toLocaleString();
  const deviceType = detectDeviceType();
  const refCode = inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const normalizedInquiry: ContactInquiryInput = {
    ...inquiry,
    id: refCode,
    submittedAt: inquiry.submittedAt || now
  };
  const payloadSummary = buildContactSummary(normalizedInquiry, recipient);
  const htmlBody = buildContactEmailHtml(normalizedInquiry, recipient);
  const subject = `STAHIZA Inquiry: ${normalizedInquiry.subject} - ${normalizedInquiry.name} [${refCode}]`;
  const mailtoUrl = buildSafeMailtoUrl(recipient, subject);
  const gmailUrl = buildGmailComposeUrl(recipient, subject);
  const emlContent = buildEmlFileContent({
    recipient,
    subject,
    htmlBody,
    plainTextBody: payloadSummary,
    replyTo: normalizedInquiry.email,
  });
  const emlFilename = `STAHIZA-Inquiry-${refCode}.eml`;

  const autoCopyPromise = copyRichEmailPreservingGesture(htmlBody, payloadSummary);
  showTemporaryPasteTabReminder(deviceType);
  let popupBlocked = false;

  if (deviceType === 'pc') {
    popupBlocked = !triggerWebEmailSafely(gmailUrl);
  } else {
    triggerMailtoSafely(mailtoUrl);
  }

  const autoCopied = await autoCopyPromise;

  return {
    success: true,
    message:
      deviceType === 'pc'
        ? `PC detected: Finished preview copied & Gmail Web opened for ${recipient}`
        : `Mobile detected: Finished preview copied & Mail App opened for ${recipient}`,
    recipient,
    subject,
    refCode,
    emailKind: 'contact',
    sentAt: now,
    payloadSummary,
    htmlBody,
    emlContent,
    emlFilename,
    deviceType,
    methodUsed: deviceType === 'pc' ? 'Gmail Web' : 'Mail App',
    mailtoUrl,
    gmailUrl,
    popupBlocked,
    autoCopyPromise: Promise.resolve(autoCopied),
  };
}
