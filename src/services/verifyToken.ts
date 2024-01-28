import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.query.token as string; // Assuming the token is sent as a query parameter
  const jwtSecret: string = process.env.JWT_SECRET || 'defaultSecret';

  jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded.user; // Attach the user object to the request for further handling
    next();
  });
};

export default verifyToken;
