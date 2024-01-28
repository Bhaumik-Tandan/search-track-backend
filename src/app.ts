import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import passport from 'passport';
import authentication from "./routes/Authentication";
import corsMiddleware from './services/cors';
import searchRoute from "./routes/Search";
import session from './services/session';


connectDB();

const app = express();


// middleware
app.use(session);
app.use(express.json());
app.use(corsMiddleware);
app.use(passport.initialize());
app.use(passport.session());

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/auth`, authentication);
app.use(`${API_PREFIX}/search`, searchRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected on port ${process.env.PORT}`);
});