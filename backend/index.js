import express from 'express';
import dotenv from 'dotenv';
import { router_solutions } from './routes/solutions.js';
import { corsMiddleware } from './middelwares/cors.js';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware());

app.use('/api/', router_solutions)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});