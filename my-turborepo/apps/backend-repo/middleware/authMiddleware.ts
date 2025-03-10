import { Response, NextFunction } from 'express';
import { verifyToken } from '../helper/helper';
import { AuthenticatedRequest } from '../entities/user';

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;

    const [type, token] = authorization?.split(" ") ?? [];
    if (type !== "Bearer") throw new Error('Login Validation');
    if(!token) throw new Error('Access Denied');

    const user: any = verifyToken(token);

    req.user = user

    return next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    });
    return
  }
};
