import express, { Request, Response } from 'express';
import passport from 'passport';
import '../services/Passport';

const router = express.Router();

// Authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', async (req, res, next) => {
  passport.authenticate('google', async (err: Error, { user, token }: { user: any, token: string }) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      // Redirect the user to the frontend with the JWT token as a query parameter
      res.redirect(`${process.env.FRONTEND_URI}?token=${token}`);
  })(req, res, next);
});



export default router;
