import {Lab} from 'entities';
import {LabModel} from 'infra/database/models';
import {createValidator} from 'utils';
import {createIsExistedByIdValidator} from 'utils/validators';
import {AttemptPlaygroundPayload} from './playground.types';

export const attemptPlaygroundPayloadValidator = createValidator<AttemptPlaygroundPayload>({
  playgroundId: [createIsExistedByIdValidator<Lab>(LabModel)]
})
