import {ErrorRequestHandler} from 'express';
import {environment} from '../environments/environment';
import {AppError} from '../models';
import {isAppError, logger} from '../utils';

export const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  let operationalError: AppError;
  console.log(error);
  if(!isAppError(error)) {
    operationalError = {
      ...error,
      operational: false,
      status: 500,
      data: {},
    };
  } else {
    operationalError = error;
  }

  logger.error(`${req.user ? req.user.id : 'Anonymous'} ${req.path} ${req.method} ${JSON.stringify(error)}`);
  const {status, message, stack, data, operational} = operationalError;
  if (environment.production) {
    res.status(status).json({
      data,
      message: operational ? message : "Something went wrong. Please try again or contact the admin for more information.",
    });
  } else {
    res.status(status).json({
      data,
      message: stack || message,
    });
  }
};
