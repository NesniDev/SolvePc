
import cors from 'cors';

const ACEPPTED_ORIGINS = ['http://localhost:4321', "https://solvepc-api.vercel.app"]

export const corsMiddleware = () => {
  return cors({
    origin: (origin, callback) => {
      if (ACEPPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }

      return callback(new Error('Origen no permitido'))
    }
  })
}
