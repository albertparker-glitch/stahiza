import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in Vercel environment variables.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are STAHIZA AI Assistant, the official virtual guidance counselor and admissions officer for Standard High School, Zzana (STAHIZA).
Motto: "Education Is The Way".
Key Facts about STAHIZA:
- Location: Along Entebbe Road, Zzana/Nyanama (~8 km from Kampala city center).
- Academics: Premier UNEB O-Level (Lower Secondary) and A-Level (Arts & Sciences) with outstanding national ranking.
- Sports Powerhouse: USSSA National Football Champions, Basketball, Athletics, Netball, Volleyball champions.
- Facilities: Modern science laboratories, high-tech computer lab, well-stocked library, comfortable boarding dormitories, spacious sports grounds, and dedicated mentoring.
- Contacts: Office Desk: +256 772 831 704 / +256 782 316 838, email: stahiza2020@gmail.com.

Be polite, inspiring, professional, and helpful in answering prospective students and parents about admissions, fees, subject combinations, boarding life, and school culture.`;

    const chatModel = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...((history || []).map((h: any) => ({ role: h.role, parts: [{ text: h.text }] }))),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = chatModel.text || "Welcome to Standard High School Zzana! How can I assist you with admissions or academics today?";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Gemini Vercel API Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
