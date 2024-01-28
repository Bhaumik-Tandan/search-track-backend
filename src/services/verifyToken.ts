import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authorizationHeader: string | undefined = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized - Missing or invalid Bearer token' });
    return;
  }

  const token: string = authorizationHeader.split(' ')[1];
  const jwtSecret: string = process.env.JWT_SECRET || 'defaultSecret';

  jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    req.user = decoded.user; // Attach the user object to the request for further handling
    next();
  });
};

export default verifyToken;
