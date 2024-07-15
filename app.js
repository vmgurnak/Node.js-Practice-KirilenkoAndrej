import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import productsRouter from './routes/api/productsRouter.js';

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

app.use((_, res) => res.status(404).json({ message: 'Route not found' }));

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.err('Database connection error', err);
    process.exit(1);
  });
