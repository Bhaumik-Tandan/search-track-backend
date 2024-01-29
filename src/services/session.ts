import session from 'express-session';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// Generating a random string as the default session secret
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(20).toString('hex');

// Defining a separate cookie key (you need to set this in your environment variables)
const cookieKey = process.env.COOKIE_KEY || 'defaultCookieKey';

const sessionOptions = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    name: process.env.COOKIE_NAME||'customSessionCookieName', // Set a custom name for the session cookie
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  keys: [cookieKey], // keys property for signing the session cookie
};

export default session(sessionOptions);
