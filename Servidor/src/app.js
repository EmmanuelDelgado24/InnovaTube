import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import  login  from './routes/login.routes.js'
import  register  from './routes/register.routes.js';
import logout from './routes/logout.routes.js'

const app = express();// Inicializa la aplicación Express

// Middleware de configuración global
// Habilita CORS para permitir peticiones desde diferentes orígenes.
app.use(cors({
    origin: 'https://innovatube-gfyl.onrender.com',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type'
}))
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', login);
app.use('/api', register);
app.use('/api', logout);

export default app;