import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./database/config.js";
import axios from "axios";

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



// Ruta para manejar el envío del formulario (el 'action' de tu formulario HTML)
app.post('/register', async (req, res) => {
    // 1. Obtener la respuesta de reCAPTCHA del cuerpo de la solicitud
    const recaptchaResponse = req.body['g-recaptcha-response'];

    // 2. Verificar si la respuesta de reCAPTCHA existe
    if (!recaptchaResponse) {
        return res.status(400).send('Por favor, marca la casilla "No soy un robot" para continuar..');
    }

    try {
        // 3. Enviar la respuesta de reCAPTCHA y tu clave secreta a la API de verificación de Google
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const response = await axios.post(googleVerifyUrl, null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: recaptchaResponse,
                // remoteip: req.ip // Opcional: la IP del usuario, Express tiene req.ip
            }
        });

        const data = response.data;

        if (data.success) {
            // reCAPTCHA verificado con éxito
            // Aquí puedes procesar el resto de los datos del formulario:
            const { floating_full_name, floating_email, floating_password, floating_repeat_password, floating_username } = req.body;

            console.log('Datos del formulario:', {
                nombreCompleto: floating_full_name,
                email: floating_email,
                password: floating_password, // En producción, ¡hashea la contraseña!
                confirmPassword: floating_repeat_password,
                username: floating_username
            });

            // Lógica para guardar en base de datos, enviar emails, etc.
            // ...

            res.status(200).send('¡Formulario enviado con éxito! Eres un humano. Cuenta creada.');

        } else {
            // reCAPTCHA falló la verificación
            console.error('Error en la verificación de reCAPTCHA:', data['error-codes']);
            res.status(400).send('Error en la verificación de reCAPTCHA. Por favor, inténtalo de nuevo.');
        }

    } catch (error) {
        console.error('Error al comunicarse con la API de reCAPTCHA:', error);
        res.status(500).send('Ocurrió un error en el servidor al verificar reCAPTCHA.');
    }
});


// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});

// Conectar a la base de datos
dbConnection();
