import jwt from 'jsonwebtoken';
import BlacklistedToken from '../models/BlackListedToken.js';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  const blacklisted = await BlacklistedToken.findOne({ token });
  if (blacklisted) return res.status(403).json({ message: 'Token is blacklisted' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
