import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db';
import passport from 'passport';
import authentication from "./src/routes/Authentication";
import session from 'express-session';
import cors from "cors";
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = ['http://localhost:3000', 'chrome-extension://ipdjbgblacikhnfcpgifbbopbpnbhnpn'];
    
    // Check if origin is defined before using it
    const isAllowed = origin ? allowedOrigins.includes(origin) : true;

    // Set the Access-Control-Allow-Origin header dynamically based on the request's origin
    callback(null, isAllowed ? origin : false);
  },
  credentials: true,
}));




app.use(
    session({
      secret: 'key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    })
  );
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/v1/auth', authentication);

app.listen('4500', () => console.log('Server is connected'));
