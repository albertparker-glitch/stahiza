import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendAdmissionViaEmailJsRest } from './_lib/emailjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { application, payloadSummary } = req.body || {};
  const result = await sendAdmissionViaEmailJsRest(application, payloadSummary);

  return res.status(result.statusCode).json(result);
}
