import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const sessionOptions = {
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000,sameSite: false },
};

export default session(sessionOptions);