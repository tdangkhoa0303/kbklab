import {UserModel} from 'infra/database/models';
import {JwtPayload, verify} from 'jsonwebtoken';
import {AppError} from 'models';
import {catchMiddleware} from 'utils';
import {environment} from '../environments/environment';

export const protect = catchMiddleware(async (req, _, next) => {
  const {jwt: jwtToken} = req.signedCookies;
  if (!jwtToken) {
    throw new AppError('You have to login first', 401)
  }

  const {jwtSecret} = environment;
  const decoded = await verify(jwtToken, jwtSecret) as JwtPayload;
  const currentUser = await UserModel.findById(decoded.id);

  if (!currentUser) {
    throw new AppError('You have to login first', 401);
  }

  req.user = currentUser;
  next();
});
