import * as dotenv from 'dotenv';
import express from 'express';
import cookieSession from 'cookie-session';
import connectDB from './config/db';
import passport from 'passport';

dotenv.config({ path: './.env' });

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY||""] }));
app.use(passport.initialize());
app.use(passport.session());

const authentication = require('./src/routes/authentication');

app.use('/api/v1/auth', authentication);

app.listen('4500', () => console.log('Server is connected'));
