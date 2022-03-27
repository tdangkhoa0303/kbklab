import {ClassLabDTO} from '@kbklab/api-interfaces';
import {AuthenticatedRequest} from 'models';
import {apiWrapper} from 'utils';
import * as InstanceActions from './instance.actions';

export const createInstance = apiWrapper<ClassLabDTO>((req: AuthenticatedRequest) => {
  const {user, params} = req;
  return InstanceActions.createInstance(user, params.classLabId);
});

export const finishAttempt = apiWrapper<string>((req: AuthenticatedRequest) => {
  const {user, body} = req;
  return InstanceActions.finishAttempt(user, body.classLabId);
});
