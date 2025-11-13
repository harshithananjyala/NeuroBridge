import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// POST /api/companion/message
router.post("/message", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {
          role: "system",
          content:
            "You are NeuroBridge, a calm, friendly, supportive assistant. You speak warmly but NOT overly emotional. You support anyone — men, women, LGBTQ+ — without gender assumptions. Keep responses concise, kind, helpful, and mentally-safe.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "AI failed to respond", details: err });
  }
});

export default router;

