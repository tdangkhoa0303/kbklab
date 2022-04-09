import {LabDTO} from '@kbklab/api-interfaces';
import {createValidator} from 'utils';
import {createIsExistedByIdValidator} from 'utils/validators';
import {LabModel} from 'infra/database/models';
import {AttemptPlaygroundPayload} from './playground.types';

export const attemptPlaygroundPayloadValidator = createValidator<AttemptPlaygroundPayload>({
  playgroundId: [createIsExistedByIdValidator<LabDTO>(LabModel)]
})
