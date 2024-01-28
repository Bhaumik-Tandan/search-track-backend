import express, { Request, Response } from 'express';
import passport from 'passport';
import "../services/Passport";

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: process.env.FRONTEND_URI,
}));

router.get('/me', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
});

export default router;
