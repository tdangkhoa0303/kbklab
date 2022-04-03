import {NextFunction, Request, RequestHandler, Response} from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>
export const catchMiddleware = (middleware: Middleware): RequestHandler => {
  return (req, res, next) => {
    middleware(req, res, next)
      .catch(next)
  }
};
