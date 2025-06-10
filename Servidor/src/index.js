import dotenv from 'dotenv';
import app from './app.js';
import dbConnection from './database/config.js';

// Configurar dotenv
dotenv.config();

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor levantado en puerto ${PORT}`);
});

// Conectar a la base de datos
dbConnection();


