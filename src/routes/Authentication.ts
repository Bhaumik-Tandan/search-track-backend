import express, { Request, Response } from 'express';
import passport from 'passport';
import '../services/Passport';
import jwt, { Secret } from 'jsonwebtoken';

const router = express.Router();


// Authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/', // Redirect to the home page in case of authentication failure
  session: false // Disable session since you're using JWT
}), (req ,res) => {
  const jwtSecret: Secret = process.env.JWT_SECRET || 'defaultSecret'; 
  const token = jwt.sign({ user: req.user }, jwtSecret, { expiresIn: '1d' });
  res.redirect(`${process.env.FRONTEND_URI}?token=${token}`);
});



router.get('/me', (req, res) => {
  res.send(req.user)
})




export default router;
