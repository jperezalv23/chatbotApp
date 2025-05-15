import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { db } from './db';
import messagesRouter from './routes/messages';
import { initializeDatabase } from './initDataBase';

dotenv.config(); 

initializeDatabase(); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api', messagesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
