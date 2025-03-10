import dotenv from 'dotenv'
import path from 'path';

dotenv.config({ 
  path: path.resolve(__dirname, '../.env') 
});
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

import express from 'express';
import cors from 'cors'
import * as functions from 'firebase-functions';
import userRoutes from '../routes/userRoutes';
const PORT = process.env.PORT || 9999;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const api = functions.https.onRequest({
  region: 'asia-southeast2',
  cpu: 1
}, app);

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

export default app;