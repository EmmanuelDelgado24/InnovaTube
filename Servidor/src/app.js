import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';

const app = express();// Inicializa la aplicación Express

// Middleware de configuración global
// Habilita CORS para permitir peticiones desde diferentes orígenes.
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type'
}))
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', authRoutes);
export default app;