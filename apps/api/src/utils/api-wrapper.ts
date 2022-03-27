import {RequestHandler} from 'express';
import {APIAction} from 'models';
import {logger} from './logger';

export const apiWrapper = <TResponseData>(handler: APIAction<TResponseData>): RequestHandler => {
  return (req, res, next) => {
    handler(req, res, next)
      .then(data => {
        logger.info(`${req.user ? req.user.id : 'Anonymous'}  ${req.path}  ${req.method}`);
        const responseBody = data ? {data} : undefined;
        return res
          .status(200)
          .json(responseBody);
      })
      .catch(next)
  }
};
