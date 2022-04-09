import {isRejected} from '@reduxjs/toolkit';
import get from 'lodash/get';
import {AnyAction, Middleware} from 'redux';
import {AppCommonRoute, HttpStatusCode} from '../../constants';

export const errorHandling: Middleware = () => next => (action: AnyAction) => {
  const {payload} = action;
  const status = get(payload, ['response', 'status'], -1);
  if(isRejected(action)
    && status === HttpStatusCode.Unauthorized
    && window.location.pathname !== AppCommonRoute.LogIn
  ) {
    window.location.replace(`${AppCommonRoute.LogIn}?expired=true`);
  }
  return next(action);
}
