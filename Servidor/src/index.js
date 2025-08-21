import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./database/config.js";
import axios from "axios";
import path from "path";
import express from "express";

// Configurar dotenv
dotenv.config();

const YOUTUBE_BASE_URL = process.env.YOUTUBE_BASE_URL; 
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const RECAPTCHA_SECRET= process.env.RECAPTCHA_SECRET;

app.get("/api/youtube/videos", async (req, res) => {
  const searchQuery = req.query.q || "angular tutorial";
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        q: searchQuery,//la búsqueda del usuario.
        part: "snippet",//pide los datos básicos del video (título, descripción, etc.).
        type: "video", //solo quiere resultados de tipo "video"
        maxResults: 40,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al obtener videos de YouTube:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Error al obtener videos" });
  }
});


// Ruta a la carpeta 'dist' de tu aplicación Angular
// Usar process.cwd() y path.resolve para construir la ruta de manera segura
const angularPath = path.resolve(process.cwd(), 'dist', 'innova-tube'); 

// Sirve los archivos estáticos del frontend
app.use(express.static(angularPath));

// Para las rutas que no sean de API, redirige a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(angularPath, 'index.html'));
});



// Puerto del servidor
const PORT = process.env.PORT || 8080;

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});

// Conectar a la base de datos
dbConnection();
