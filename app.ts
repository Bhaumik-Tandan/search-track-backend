import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db';
import passport from 'passport';
import authentication from "./src/routes/Authentication";
import cookieSession from 'cookie-session';

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: ["key"] }))
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/v1/auth', authentication);

app.listen('4500', () => console.log('Server is connected'));
