import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('name').notEmpty(),
  body('role').isIn(['admin', 'user']),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('phone').if(body('role').equals('admin')).notEmpty().withMessage('Phone is required for admin'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
