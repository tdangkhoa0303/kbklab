import {environment} from 'environments/environment';
import {Response} from 'express';
import {sign} from 'jsonwebtoken';
import {ImportDataResult} from '../../../models';

export const signToken = (id: string) => {
  const {jwtSecret, jwtExpiredIn} = environment
  return sign({id}, jwtSecret, {
    expiresIn: jwtExpiredIn,
  });
};

export const setTokenToCookies = (res: Response, token: string) => {
  const {jwtCookieExpiredIn} = environment;
  const cookieExpires = new Date(
    Date.now() + jwtCookieExpiredIn * 24 * 60 * 60 * 1000,
  );

  // TODO: Buu Nguyen - set secure next phase
  res.cookie('jwt', token, {
    expires: cookieExpires,
    httpOnly: true,
    signed: true,
  });
  res.cookie('signed', true, {
    expires: cookieExpires,
  });
};

export const normalizeSettledResult = <TData>(settledResults:  PromiseSettledResult<TData>[]): ImportDataResult<TData> => (
  settledResults.reduce((result: ImportDataResult<TData>, settledResult, index) => {
    if(settledResult.status === 'fulfilled') {
      const {value} = settledResult as unknown as PromiseFulfilledResult<TData>
      return {
        ...result,
        data: [
          ...result.data,
          value
        ]
      }
    }

    return {
      ...result,
      errorRows: [
        ...result.errorRows,
        index
      ]
    }
  }, {data: [], errorRows: []})
)
