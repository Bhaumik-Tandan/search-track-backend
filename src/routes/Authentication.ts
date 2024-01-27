import express, { Request, Response } from 'express';
import passport from 'passport';

interface UserRequest extends Request {
  user: any; // Adjust the type accordingly
}

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard',
}));
export default router;
