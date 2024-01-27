import express from 'express';
import connectDB from './src/config/db';
import passport from 'passport';
import authentication from "./src/routes/Authentication";
require('dotenv').config();

connectDB();

const app = express();

// middleware
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/api/v1/auth', authentication);

app.listen('4500', () => console.log('Server is connected'));
