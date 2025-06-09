import app from './app.js'
import dbConnection from './database/config.js';
import auth from './routes/auth.routes.js';

app.listen(3000);
dbConnection();

//Rutas
app.use('/api/auth', auth);

console.log('Servidor levantado en puerto', 3000);


