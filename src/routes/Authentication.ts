import express, { Request, Response } from 'express';
import passport from 'passport';
import '../services/Passport';

const router = express.Router();

// Authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful authentication
router.get('/google/callback', async (req, res, next) => {
    passport.authenticate('google', async (err: Error, { user, token }: { user: any, token: string }) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Send the JWT token in the response
        res.json({ token, user });
    })(req, res, next);
});


export default router;
