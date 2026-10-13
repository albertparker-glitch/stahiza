var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(import_express.default.json());
  app.use("/pages", import_express.default.static("pages"));
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY in secrets."
        });
      }
      const ai = new import_genai.GoogleGenAI({ apiKey });
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
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...(history || []).map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      const reply = response.text || "Welcome to Standard High School Zzana! How can I assist you with admissions or academics today?";
      res.json({ reply });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(import_express.default.static("dist"));
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STAHIZA server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
