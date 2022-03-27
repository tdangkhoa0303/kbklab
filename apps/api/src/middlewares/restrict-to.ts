import {UserRole} from '@kbklab/api-interfaces';
import {RequestHandler} from 'express';
import {AppError} from '../models';

export const restrictTo = (...roles: UserRole[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to do this', 403));
    }

    next();
  };
};
