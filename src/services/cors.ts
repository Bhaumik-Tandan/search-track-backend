import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [process.env.FRONTEND_URI];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, isAllowed?: boolean) => void) => {
    const isAllowed = origin ? allowedOrigins.includes(origin) : true;
    callback(null, isAllowed);
  },
  credentials: true,
};

export default cors(corsOptions);
