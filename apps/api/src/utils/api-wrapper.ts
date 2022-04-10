import {RequestHandler} from 'express';
import {APIAction} from 'models';
import {logger} from './logger';

export const apiWrapper = <TResponseData>(handler: APIAction<TResponseData>): RequestHandler => {
  return (req, res, next) => {
    logger.info(`${req.user ? req.user.id : 'Anonymous'}  ${req.path}  ${req.method} ${JSON.stringify(req.body)}`);

    handler(req, res, next)
      .then(data => {
        return res
          .status(200)
          .json({data});
      })
      .catch(next)
  }
};
