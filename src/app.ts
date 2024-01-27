import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import passport from 'passport';
import authentication from "./routes/Authentication";

dotenv.config({ path: './.env' });

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/v1/auth', authentication);

app.listen('4500', () => console.log('Server is connected'));
