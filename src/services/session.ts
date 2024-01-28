import session, { SessionOptions } from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true },
};

export default session(sessionOptions);
