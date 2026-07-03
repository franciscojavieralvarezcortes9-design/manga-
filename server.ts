import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API route for Player Evaluation
app.post("/api/evaluate-player", async (req: express.Request, res: express.Response) => {
  try {
    const { name, position, playstyle, customAura } = req.body;
    if (!name || !position || !playstyle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const systemInstruction = `Eres el legendario creador e inspector de fútbol shonen de la obra de manga "LOKY: EL EMPERADOR DE LOKY".
Tu tarea es evaluar a un nuevo aspirante a jugador y otorgarle un informe de aura real de emperador de fútbol ultra-estilizado, dramático y épico en español.
La personalidad debe ser extremadamente intensa, inspiradora, competitiva, llena de pasión deportiva del manga.
El formato de respuesta debe ser JSON puro que coincida exactamente con la estructura requerida. Usa terminología de fútbol de alta gama y tropos de manga (como aura mística, instinto asesino, el trono del emperador, etc.).`;

    const prompt = `Evalúa al siguiente jugador de fútbol shonen:
Nombre: ${name}
Posición: ${position}
Estilo de Juego: ${playstyle}
Elemento/Aura Especial: ${customAura || "Ninguno"}

Genera una evaluación que determine su rango de emperador, su apodo de fútbol legendario, su movimiento especial definitivo de nivel mundial, y su frase motivacional shonen característica.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nickname: {
              type: Type.STRING,
              description: "An epic, high-stakes football nickname, e.g. 'La Ventisca Negra', 'El Tirano del Área Chica'"
            },
            auraColor: {
              type: Type.STRING,
              description: "The visual color and vibe of their spiritual aura, e.g. 'Fuego Negro y Destellos Dorados'"
            },
            specialMove: {
              type: Type.STRING,
              description: "A legendary football technique name, e.g. 'Tornado Celestial del Emperador'"
            },
            specialMoveDescription: {
              type: Type.STRING,
              description: "A short, exciting shonen style description of how this move works on the field."
            },
            sovereignRank: {
              type: Type.STRING,
              description: "Sovereign Rank from SSS, SS, S, A, B, C, D"
            },
            tacticalAnalysis: {
              type: Type.STRING,
              description: "A short, dramatic tactical breakdown of their raw talent and potential under the reign of Loky."
            },
            emperorQuote: {
              type: Type.STRING,
              description: "An epic, blood-pumping motivational quote tailored to them, starting with or embodying 'No soy un récord, soy una leyenda'."
            },
            stats: {
              type: Type.OBJECT,
              properties: {
                velocidad: { type: Type.INTEGER, description: "Value from 50 to 99" },
                fuerza: { type: Type.INTEGER, description: "Value from 50 to 99" },
                tecnica: { type: Type.INTEGER, description: "Value from 50 to 99" },
                vision: { type: Type.INTEGER, description: "Value from 50 to 99" },
                mentalidad: { type: Type.INTEGER, description: "Value from 50 to 99" },
              },
              required: ["velocidad", "fuerza", "tecnica", "vision", "mentalidad"]
            }
          },
          required: [
            "nickname",
            "auraColor",
            "specialMove",
            "specialMoveDescription",
            "sovereignRank",
            "tacticalAnalysis",
            "emperorQuote",
            "stats"
          ]
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini evaluation failed:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// Serve Vite in dev or static files in prod
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
