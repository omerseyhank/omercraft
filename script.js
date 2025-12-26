import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 get current folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 serve static files
app.use(express.static(__dirname));

// 🔹 explicit routes (IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/ai.html", (req, res) => {
  res.sendFile(path.join(__dirname, "ai.html"));
});

app.get("/cart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "cart.html"));
});

app.get("/request.html", (req, res) => {
  res.sendFile(path.join(__dirname, "request.html"));
});

// 🔹 AI endpoint
app.post("/ai", async (req, res) => {
  const { idea } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Rewrite Minecraft world ideas clearly and professionally." },
        { role: "user", content: idea }
      ]
    })
  });

  const data = await response.json();
  res.json({ result: data.choices[0].message.content });
});

// 🔹 start server
app.listen(3000, () => {
  console.log("AI server running on http://localhost:3000");
});
