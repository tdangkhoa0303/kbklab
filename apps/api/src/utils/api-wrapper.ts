import {RequestHandler} from 'express';


export default <TResponseData>(handler: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    try {
      const data = handler(req, res, next);
      res
    } catch(error) {
      next(error)
    }
  };
};
