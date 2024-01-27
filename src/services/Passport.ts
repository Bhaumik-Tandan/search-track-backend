import  passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.googleClientID||"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET||"",
            callbackURL: '/api/v1/auth/google/callback',
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any
        ) => {
        }
    )
);
