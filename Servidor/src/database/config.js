import mongoose from 'mongoose';
import 'dotenv/config.js';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de Datos Conectada!')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inizializar la Base de Datos')
    }
}

export default dbConnection;