import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import login from './routes/login.routes.js';
import register from './routes/register.routes.js';
import logout from './routes/logout.routes.js';

const app = express();

// Orígenes permitidos (Render y local)
const allowedOrigins = [
  'https://innovatube-u371.onrender.com',
  'http://localhost:4200'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(morgan('dev'));
app.use(express.json());

// Rutas API
app.use('/api', login);
app.use('/api', register);
app.use('/api', logout);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Innovatube funcionando 🚀' });
});

export default app;