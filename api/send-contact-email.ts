import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactInquiryViaEmailJsRest } from './_lib/emailjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { inquiry, payloadSummary } = req.body || {};
  const result = await sendContactInquiryViaEmailJsRest(inquiry, payloadSummary);

  return res.status(result.statusCode).json(result);
}
