import {PlaygroundDTO} from '@kbklab/api-interfaces';
import {AuthenticatedRequest} from 'models';
import {apiWrapper} from 'utils';
import * as PlaygroundActions from './playground.actions';

export const getAllPlaygrounds = apiWrapper<PlaygroundDTO[]>((req: AuthenticatedRequest) => PlaygroundActions.getAllPlaygrounds(req.user.id));

export const attemptPlayground = apiWrapper<string>((req: AuthenticatedRequest) => {
  const {params: {playgroundId}, user} = req;
  return PlaygroundActions.attemptPlayground({playgroundId, user});
});

export const finishPlayground = apiWrapper<boolean>((req: AuthenticatedRequest) => {
  const {params: {playgroundId}, user} = req;
  return PlaygroundActions.finishPlayground({playgroundId, user})
})
