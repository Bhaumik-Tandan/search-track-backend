import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/config/db';
import passport from 'passport';
import authentication from "./src/routes/Authentication";
import corsMiddleware from './src/services/cors';
import sessionMiddleware from './src/services/session';
import searchRoute from "./src/routes/search";


connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/auth`, authentication);
app.use(`${API_PREFIX}/search`, searchRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected on port ${process.env.PORT}`);
});