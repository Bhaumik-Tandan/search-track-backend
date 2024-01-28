import passport from 'passport';
import jwt, { Secret } from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.JWT_SECRET) {
    console.error('Error: jwt secret, Google client ID, or client secret is absent in the environment variables');
    process.exit(1); // Exit the process with an error code
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.BACKEND_URI,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any
        ) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User already exists, update the tokens and return user
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    user.name = profile.displayName;
                    user.avatarUrl = profile.picture;
                    user.isVerified = profile.emails[0].verified;
                    await user.save();

                    return done(null, user);
                }

                // User does not exist, create a new user
                user = await new User({
                    accessToken,
                    refreshToken,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    avatarUrl: profile.picture,
                    isVerified: profile.emails[0].verified,
                }).save();

                // Generate JWT token
                const jwtSecret: Secret = process.env.JWT_SECRET || 'defaultSecret'; // Provide a default value if undefined
                const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });
                done(null, { user, token });
            } catch (error) {
                done(error, null);
            }
        }
    )
);
