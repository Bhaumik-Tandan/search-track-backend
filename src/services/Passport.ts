import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// Check if googleClientID is present in the environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
    console.error('Error: googleClientID is absent in the environment variables');
    process.exit(1); // Exit the process with an error code
}

// Check if GOOGLE_CLIENT_SECRET is present in the environment variables
if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Error: GOOGLE_CLIENT_SECRET is absent in the environment variables');
    process.exit(1); // Exit the process with an error code
}


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any
        ) => {
            // Your strategy implementation here
        }
    )
);
