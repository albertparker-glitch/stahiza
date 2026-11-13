import http from 'http';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { sendAdmissionViaEmailJsRest } from './api/_lib/emailjs';

dotenv.config();

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const portArgIdx = process.argv.indexOf('--port');
  const cliPort = portArgIdx !== -1 ? Number(process.argv[portArgIdx + 1]) : NaN;
  const PORT =
    Number.isFinite(cliPort) && cliPort > 0
      ? cliPort
      : process.env.NODE_ENV === 'production'
        ? Number(process.env.PORT) || 3000
        : 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily/only when API key is configured
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // API endpoint for STAHIZA AI Admissions / Guidance Counselor
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!ai || !apiKey) {
        return res.status(500).json({ 
          error: 'Gemini API key is not configured. Please add GEMINI_API_KEY in secrets.' 
        });
      }

      const systemInstruction = `You are STAHIZA AI Assistant, the official virtual guidance counselor and admissions officer for Standard High School, Zzana (STAHIZA).
Motto: "Education Is The Way".
Key Facts about STAHIZA:
- Location: Along Entebbe Road, Zzana/Nyanama (~8 km from Kampala city center).
- Academics: Premier UNEB O-Level (Lower Secondary) and A-Level (Arts & Sciences) with outstanding national ranking.
- Sports Powerhouse: USSSA National Football Champions, Basketball, Athletics, Netball, Volleyball champions.
- Facilities: Modern science laboratories, high-tech computer lab, well-stocked library, comfortable boarding dormitories, spacious sports grounds, and dedicated mentoring.
- Contacts: +256 772 428034 / +256 752 210755, email: stahiza2020@gmail.com.
- Portal: eCampus and student results management portal available online.

Be polite, inspiring, professional, and helpful in answering prospective students and parents about admissions, fees, subject combinations, boarding life, and school culture.`;

      const chatModel = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          ...((history || []).map((h: any) => ({ role: h.role, parts: [{ text: h.text }] }))),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const response = await chatModel;
      const reply = response.text || "Welcome to Standard High School Zzana! How can I assist you with admissions or academics today?";

      res.json({ reply });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  // API endpoint for automatic admission application email dispatch via EmailJS REST API
  app.post('/api/send-admission-email', async (req, res) => {
    try {
      const { application, payloadSummary } = req.body || {};
      const result = await sendAdmissionViaEmailJsRest(application, payloadSummary);
      return res.status(result.statusCode).json(result);
    } catch (error: any) {
      console.error('Admission Email Route Error:', error);
      return res.status(500).json({
        ok: false,
        method: 'fallback_required',
        fallbackRequired: true,
        error: error?.message || 'Unexpected server error dispatching application email'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`STAHIZA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
