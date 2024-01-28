import express, { Request, Response } from 'express';
import passport from 'passport';
import "../services/Passport";

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', (req, res, next) => {
  // Always set the Access-Control headers

  // Allow specified methods if specified in the request
  res.setHeader(
    "access-control-allow-methods",
    req.headers["access-control-request-method"] || "*"
  );

  // Allow specified headers if specified in the request
  res.setHeader(
    "access-control-allow-headers",
    req.headers["access-control-request-headers"] || "*"
  );

  // Allow the requesting origin and set credentials to true
  if (req.headers.origin) {
    res.setHeader("access-control-allow-origin", req.headers.origin);
    res.setHeader("access-control-allow-credentials", "true");
  }

  // Continue with the Google OAuth authentication using Passport
  passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_URI,
  })(req, res, next);
});



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
