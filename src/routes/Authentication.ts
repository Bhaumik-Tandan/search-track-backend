import express, { Request, Response } from 'express';
import passport from 'passport';
import "../services/Passport";

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard',
}));
export default router;
