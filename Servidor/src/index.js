// index.js
import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./database/config.js";
import axios from "axios";
import path from "path";
import express from "express";

dotenv.config();

const YOUTUBE_BASE_URL = process.env.YOUTUBE_BASE_URL; 
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Ruta YouTube
app.get("/api/youtube/videos", async (req, res) => {
  const searchQuery = req.query.q || "angular tutorial";
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        q: searchQuery,
        part: "snippet",
        type: "video",
        maxResults: 40,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener videos de YouTube:", error.message);
    res.status(500).json({ error: "Error al obtener videos" });
  }
});

// Servir Angular
const angularPath = path.resolve(process.cwd(), 'dist', 'innova-tube');
app.use(express.static(angularPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(angularPath, 'index.html'));
});

// Conexión a la BD
try {
  dbConnection();
  console.log("Paso 2: Conexión a la base de datos exitosa.");
} catch (error) {
  console.error("Paso 2 (Error): Falló la conexión a la base de datos.", error);
  process.exit(1);
}

// Puerto del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});
