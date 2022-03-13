import {RequestHandler} from 'express';
import {APIAction} from '../models';
import {logger} from './logger';

export const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export const catchAsync = (handler: Midd): RequestHandler => {
  return (req, res, next) => {
    handler(req, res, next)
      .catch(next)
  }
};
