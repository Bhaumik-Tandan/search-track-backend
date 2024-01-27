import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/User";

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((id: string, done: any) => {
    User.findById(id).then((user: any) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.googleClientID||"",
            clientSecret: process.env.googleClientSecret||"",
            callbackURL: '/api/v1/auth/google/callback',
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any
        ) => {
            const existingUser = await User.findOneAndUpdate(
                { googleId: profile.id },
                {
                    accessToken,
                    refreshToken,
                    name: profile.displayName,
                    avatarUrl: profile.picture,
                    isVerified: profile.emails[0].verified,
                }
            );

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({
                accessToken,
                refreshToken,
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatarUrl: profile.picture,
                isVerified: profile.emails[0].verified,
            }).save();

            done(null, user);
        }
    )
);
