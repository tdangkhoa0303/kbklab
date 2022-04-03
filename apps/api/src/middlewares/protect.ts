import {NextFunction} from 'express';
import {UserModel} from 'infra/database/models';
import {JwtPayload, verify} from 'jsonwebtoken';
import {AppError} from 'models';
import {environment} from '../environments/environment';

const createSendUnauthorizedError = (next: NextFunction): VoidFunction => () => next(new AppError('Unauthorized request', 401))

export const protect = async (req, _, next) => {
  const sendUnauthorizedError = createSendUnauthorizedError(next);
  try {
    const {jwt: jwtToken} = req.signedCookies;
    const {jwtSecret} = environment;
    const decoded = await verify(jwtToken, jwtSecret) as JwtPayload;
    const currentUser = await UserModel.findById(decoded.id);
    if(!currentUser) {
      sendUnauthorizedError();
    }

    req.user = currentUser;
    next();
  } catch (_) {
    sendUnauthorizedError();
  }
};
