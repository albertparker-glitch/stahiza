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

export interface EmailJsDispatchResponse {
  ok: boolean;
  statusCode: number;
  method: 'emailjs_rest' | 'fallback_required';
  configured: boolean;
  fallbackRequired: boolean;
  recipient: string;
  message: string;
  error?: string;
}

const ADMIN_EMAIL = 'hasty0joel@gmail.com';
const SELECTION_CODE = '2624';
const UNEB_CENTER_NO = 'U0833';
const EMAILJS_REST_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

function isConfiguredValue(value?: string): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !trimmed.startsWith('MY_EMAILJS_');
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

  const templateParams = {
    to_email: ADMIN_EMAIL,
    reply_to: application.parentEmail.trim(),
    student_name: application.studentName.trim(),
    gender: application.gender || 'Not specified',
    dob: application.dob || 'Not specified',
    target_class: application.targetClass.trim(),
    residence_type: application.residenceType || 'Boarding',
    combination: application.combination || 'N/A (O-Level)',
    parent_name: application.parentName?.trim() || 'Parent / Guardian',
    parent_phone: application.parentPhone.trim(),
    parent_email: application.parentEmail.trim(),
    previous_school: application.previousSchool?.trim() || 'Not specified',
    grades_aggregate: application.gradesAggregate?.trim() || 'N/A',
    source_form: application.sourceForm || 'Admissions Portal',
    notes: application.notes?.trim() || 'None',
    ref_code: application.id || `STH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
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

  try {
    const emailJsRes = await fetch(EMAILJS_REST_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await emailJsRes.text();

    if (!emailJsRes.ok) {
      console.error(`[EmailJS REST] Upstream rejected dispatch (${emailJsRes.status}): ${responseText}`);
      return {
        ok: false,
        statusCode: 502,
        method: 'fallback_required',
        configured: true,
        fallbackRequired: true,
        recipient: ADMIN_EMAIL,
        message: 'EmailJS REST service could not deliver right now; falling back to mailto.',
        error: responseText || `EmailJS responded with status ${emailJsRes.status}`
      };
    }

    return {
      ok: true,
      statusCode: 200,
      method: 'emailjs_rest',
      configured: true,
      fallbackRequired: false,
      recipient: ADMIN_EMAIL,
      message: `Application dispatched automatically via EmailJS to ${ADMIN_EMAIL}.`
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Network error calling EmailJS REST API';
    console.error('[EmailJS REST] Network exception:', errMsg);
    return {
      ok: false,
      statusCode: 502,
      method: 'fallback_required',
      configured: true,
      fallbackRequired: true,
      recipient: ADMIN_EMAIL,
      message: 'Network error reaching EmailJS REST API; falling back to mailto.',
      error: errMsg
    };
  }
}
