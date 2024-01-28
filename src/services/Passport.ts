import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
if (!process.env.GOOGLE_CLIENT_ID) {
    console.error('Error: googleClientID is absent in the environment variables');
    process.exit(1); // Exit the process with an error code
}

// Check if GOOGLE_CLIENT_SECRET is present in the environment variables
if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Error: GOOGLE_CLIENT_SECRET is absent in the environment variables');
    process.exit(1); // Exit the process with an error code
}

passport.serializeUser((user:any, done) => {
    done(null, user?._id)
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
            callbackURL: `https://search-track.cyclic.app/api/v1/auth/google/callback`,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any
        ) => {
            const existingUser = await User.findOneAndUpdate({ googleId: profile.id }, {
                accessToken,
                refreshToken,
                name: profile.displayName,
                avatarUrl: profile.picture,
                isVerified: profile.emails[0].verified,
            })
        
            if (existingUser) {
                return done(null, existingUser)
            }
        
            const user = await new User({
                accessToken,
                refreshToken,
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatarUrl: profile.picture,
                isVerified: profile.emails[0].verified,
            }).save()
        
            done(null, user)
        }
    )
);
