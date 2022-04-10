import {LabDTO, PlaygroundDTO} from '@kbklab/api-interfaces';
import {environment} from 'environments/environment';
import {LabModel, PlaygroundInstanceModel} from 'infra/database/models';
import moment from 'moment';
import {promisified_exec} from 'utils';
import {AppError} from '../../../models';
import {initDockerInstance} from '../instance/instance.utils';
import * as PlaygroundQueries from './playground.queries';
import {AttemptPlaygroundPayload} from './playground.types';
import {attemptPlaygroundPayloadValidator} from './playground.validator';

export const getAllPlaygrounds = async (userId: string): Promise<PlaygroundDTO[]> => {
  return PlaygroundQueries.getAllPlaygrounds(userId);
}

export const attemptPlayground = async (payload: AttemptPlaygroundPayload): Promise<string> => {
  const {user, playgroundId} = payload;
  await attemptPlaygroundPayloadValidator(payload);

  const existingPlaygroundInstance = await PlaygroundInstanceModel.findOne({
    user: user.id,
    playground: playgroundId,
  });

  // If the instance has existed -> return the instance url directly
  if(existingPlaygroundInstance) {
    return existingPlaygroundInstance.instanceUrl
  }
  console.log(playgroundId)
  const playground = await LabModel
    .findById(playgroundId)
    .select('+location');

  if(!playground) {
    throw new AppError('Cannot find requesting playground', 500);
  }

  const {imageNames, location} = playground;
  const {url, containerId} = await initDockerInstance({
    location,
    imageNames,
    userCode: user.code,
  });

  await PlaygroundInstanceModel.create({
    containerId,
    instanceUrl: url,
    user: user.id,
    playground: playgroundId,
    startTime: Date.now(),
    endTime: moment().add(environment.playgroundTimeout, 'h').valueOf(),
  });

  return url;
}

export const finishPlayground = async (payload: AttemptPlaygroundPayload): Promise<boolean> => {
  const {user, playgroundId} = payload;
  await attemptPlaygroundPayloadValidator(payload);

  const playgroundInstance = await PlaygroundInstanceModel
    .findOne({playground: playgroundId})
    .populate<{playground: LabDTO}>('playground');

  if(playgroundInstance) {
    await playgroundInstance.delete();
    await promisified_exec(
      `python3 ${environment.toolPath}/instance.py --stop --student-code=${user.code} --image=${playgroundInstance.playground.imageNames}`
    );
  }

  return true;
}
