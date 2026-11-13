export interface AdmissionEmailPayload {
  id?: string;
  studentName?: string;
  gender?: string;
  dob?: string;
  targetClass?: string;
  residenceType?: string;
  combination?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  previousSchool?: string;
  gradesAggregate?: string;
  sourceForm?: string;
  submittedAt?: string;
  notes?: string;
}

export interface ContactInquiryPayload {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  submittedAt?: string;
}

export interface EmailJsDispatchResponse {
  ok: boolean;
  statusCode: number;
  method: 'emailjs_rest' | 'fallback_required';
  configured: boolean;
  fallbackRequired: boolean;
  recipient: string;
  attempts?: number;
  message: string;
  error?: string;
}

const ADMIN_EMAIL = 'hasty0joel@gmail.com';
const SELECTION_CODE = '2624';
const UNEB_CENTER_NO = 'U0833';
const EMAILJS_REST_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const REQUEST_TIMEOUT_MS = 10000;
const RETRY_DELAY_MS = 1100;

function isConfiguredValue(value?: string): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !trimmed.startsWith('MY_EMAILJS_');
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

async function postToEmailJsWithRetry(
  requestBody: Record<string, unknown>,
  successMessage: string
): Promise<EmailJsDispatchResponse> {
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const emailJsRes = await fetch(EMAILJS_REST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const responseText = await emailJsRes.text();

      if (emailJsRes.ok) {
        return {
          ok: true,
          statusCode: 200,
          method: 'emailjs_rest',
          configured: true,
          fallbackRequired: false,
          recipient: ADMIN_EMAIL,
          attempts: attempt,
          message: successMessage
        };
      }

      console.error(
        `[EmailJS REST] Attempt ${attempt}/${maxAttempts} rejected (${emailJsRes.status}): ${responseText}`
      );

      if (attempt < maxAttempts && isRetryableStatus(emailJsRes.status)) {
        await delay(RETRY_DELAY_MS);
        continue;
      }

      return {
        ok: false,
        statusCode: 502,
        method: 'fallback_required',
        configured: true,
        fallbackRequired: true,
        recipient: ADMIN_EMAIL,
        attempts: attempt,
        message: 'EmailJS REST service could not deliver right now; falling back to mailto.',
        error: responseText || `EmailJS responded with status ${emailJsRes.status}`
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof Error && err.name === 'AbortError';
      const errMsg = isAbort
        ? 'EmailJS REST API request timed out'
        : err instanceof Error
          ? err.message
          : 'Network error calling EmailJS REST API';

      console.error(`[EmailJS REST] Attempt ${attempt}/${maxAttempts} exception:`, errMsg);

      if (attempt < maxAttempts) {
        await delay(RETRY_DELAY_MS);
        continue;
      }

      return {
        ok: false,
        statusCode: 502,
        method: 'fallback_required',
        configured: true,
        fallbackRequired: true,
        recipient: ADMIN_EMAIL,
        attempts: attempt,
        message: 'Network error reaching EmailJS REST API; falling back to mailto.',
        error: errMsg
      };
    }
  }

  return {
    ok: false,
    statusCode: 502,
    method: 'fallback_required',
    configured: true,
    fallbackRequired: true,
    recipient: ADMIN_EMAIL,
    attempts: maxAttempts,
    message: 'EmailJS delivery exhausted retries; falling back to mailto.'
  };
}

export async function sendAdmissionViaEmailJsRest(
  application: AdmissionEmailPayload | undefined,
  payloadSummary?: string
): Promise<EmailJsDispatchResponse> {
  if (
    !application ||
    !application.studentName?.trim() ||
    !application.parentPhone?.trim() ||
    !application.parentEmail?.trim() ||
    !application.targetClass?.trim()
  ) {
    return {
      ok: false,
      statusCode: 400,
      method: 'fallback_required',
      configured: true,
      fallbackRequired: false,
      recipient: ADMIN_EMAIL,
      message: 'Missing required admission application fields.',
      error: 'studentName, targetClass, parentPhone, and parentEmail are required.'
    };
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!isConfiguredValue(serviceId) || !isConfiguredValue(templateId) || !isConfiguredValue(publicKey)) {
    return {
      ok: false,
      statusCode: 503,
      method: 'fallback_required',
      configured: false,
      fallbackRequired: true,
      recipient: ADMIN_EMAIL,
      message: 'EmailJS server credentials are not configured; use mailto fallback.',
      error: 'Missing EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, or EMAILJS_PUBLIC_KEY in server environment.'
    };
  }

  const refCode = application.id || `STH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const parentName = application.parentName?.trim() || 'Parent / Guardian';
  const parentEmail = application.parentEmail.trim();
  const studentName = application.studentName.trim();
  const targetClass = application.targetClass.trim();
  const subjectTitle = `STAHIZA Admission Application - ${studentName} (${targetClass}) [${refCode}]`;

  const templateParams = {
    // Standard EmailJS template aliases for out-of-the-box compatibility
    name: `${parentName} (Parent of ${studentName})`,
    from_name: parentName,
    email: parentEmail,
    from_email: parentEmail,
    title: subjectTitle,
    subject: subjectTitle,
    message: payloadSummary || subjectTitle,

    // STAHIZA structured fields
    to_email: ADMIN_EMAIL,
    reply_to: parentEmail,
    student_name: studentName,
    gender: application.gender || 'Not specified',
    dob: application.dob || 'Not specified',
    target_class: targetClass,
    residence_type: application.residenceType || 'Boarding',
    combination: application.combination || 'N/A (O-Level)',
    parent_name: parentName,
    parent_phone: application.parentPhone.trim(),
    parent_email: parentEmail,
    previous_school: application.previousSchool?.trim() || 'Not specified',
    grades_aggregate: application.gradesAggregate?.trim() || 'N/A',
    source_form: application.sourceForm || 'Admissions Portal',
    notes: application.notes?.trim() || 'None',
    ref_code: refCode,
    submitted_at: application.submittedAt || new Date().toISOString(),
    selection_code: SELECTION_CODE,
    center_no: UNEB_CENTER_NO,
    message_summary: payloadSummary || ''
  };

  const requestBody: Record<string, unknown> = {
    service_id: serviceId.trim(),
    template_id: templateId.trim(),
    user_id: publicKey.trim(),
    template_params: templateParams
  };

  if (isConfiguredValue(privateKey)) {
    requestBody.accessToken = privateKey.trim();
  }

  return postToEmailJsWithRetry(
    requestBody,
    `Application dispatched automatically via EmailJS to ${ADMIN_EMAIL}.`
  );
}

export async function sendContactInquiryViaEmailJsRest(
  inquiry: ContactInquiryPayload | undefined,
  payloadSummary?: string
): Promise<EmailJsDispatchResponse> {
  if (!inquiry || !inquiry.name?.trim() || !inquiry.email?.trim() || !inquiry.message?.trim()) {
    return {
      ok: false,
      statusCode: 400,
      method: 'fallback_required',
      configured: true,
      fallbackRequired: false,
      recipient: ADMIN_EMAIL,
      message: 'Missing required contact inquiry fields.',
      error: 'name, email, and message are required.'
    };
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const contactTemplateId = process.env.EMAILJS_CONTACT_TEMPLATE_ID;
  const templateId = isConfiguredValue(contactTemplateId)
    ? contactTemplateId
    : process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!isConfiguredValue(serviceId) || !isConfiguredValue(templateId) || !isConfiguredValue(publicKey)) {
    return {
      ok: false,
      statusCode: 503,
      method: 'fallback_required',
      configured: false,
      fallbackRequired: true,
      recipient: ADMIN_EMAIL,
      message: 'EmailJS server credentials are not configured; use mailto fallback.',
      error: 'Missing EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, or EMAILJS_PUBLIC_KEY in server environment.'
    };
  }

  const refCode = inquiry.id || `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const senderName = inquiry.name.trim();
  const senderEmail = inquiry.email.trim();
  const inquirySubject = inquiry.subject?.trim() || 'General Admissions Inquiry';
  const subjectTitle = `STAHIZA Inquiry: ${inquirySubject} - ${senderName} [${refCode}]`;

  const templateParams = {
    name: senderName,
    from_name: senderName,
    email: senderEmail,
    from_email: senderEmail,
    title: subjectTitle,
    subject: subjectTitle,
    message: payloadSummary || inquiry.message.trim(),
    to_email: ADMIN_EMAIL,
    reply_to: senderEmail,
    parent_name: senderName,
    parent_email: senderEmail,
    parent_phone: inquiry.phone?.trim() || 'Not provided',
    source_form: 'Contact & Inquiries Desk',
    ref_code: refCode,
    submitted_at: inquiry.submittedAt || new Date().toISOString(),
    selection_code: SELECTION_CODE,
    center_no: UNEB_CENTER_NO,
    message_summary: payloadSummary || inquiry.message.trim()
  };

  const requestBody: Record<string, unknown> = {
    service_id: serviceId.trim(),
    template_id: templateId.trim(),
    user_id: publicKey.trim(),
    template_params: templateParams
  };

  if (isConfiguredValue(privateKey)) {
    requestBody.accessToken = privateKey.trim();
  }

  return postToEmailJsWithRetry(
    requestBody,
    `Inquiry dispatched automatically via EmailJS to ${ADMIN_EMAIL}.`
  );
}
