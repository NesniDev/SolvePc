
import cors from 'cors';

const ACEPPTED_ORIGINS = ['http://localhost:4321']

export const corsMiddleware = () => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || ACEPPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }
  })

}