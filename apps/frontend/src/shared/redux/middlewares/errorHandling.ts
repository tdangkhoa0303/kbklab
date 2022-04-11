import {isRejected} from '@reduxjs/toolkit';
import get from 'lodash/get';
import {AnyAction, Middleware} from 'redux';
import {AppCommonRoute, HttpStatusCode} from '../../constants';

const REDIRECT_PATH_EXCLUSION = [
  AppCommonRoute.LogIn,
  AppCommonRoute.Root,
]

export const errorHandling: Middleware = () => next => (action: AnyAction) => {
  const {payload} = action;
  const status = get(payload, ['response', 'status'], -1);

  if(isRejected(action)
    && status === HttpStatusCode.Unauthorized
    && !REDIRECT_PATH_EXCLUSION.some(path => window.location.pathname === path)
  ) {
    window.location.replace(`${AppCommonRoute.LogIn}?expired=true`);
  }
  return next(action);
}
