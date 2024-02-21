import express from 'express'
import { createConnection } from './database.js';
import cors from 'cors';
import  authRoutes from './routes/authRoutes.js'
// import userRoutes from './routes/userRoutes.js'
import hospitalRoutes from './routes/hospitalRoutes.js'
import errorHandler from './errorHandler.js';

const app = express();
const PORT = 8000; 
createConnection();

app.use(express.json());
app.use(cors({
  
}))

app.use('/api/auth', authRoutes);
// app.use('/api/users',userRoutes);
app.use('/api/hospitals', hospitalRoutes);

app.use(errorHandler);












app.listen(PORT, () => {
    console.log("server running at port" + PORT);
})