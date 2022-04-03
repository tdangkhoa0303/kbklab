import {createValidator} from 'utils';
import {requiredValidator} from 'utils/validators';
import {ImportClassPayload} from './class.types';

export const importClassValidator = createValidator<ImportClassPayload>({
  file: [requiredValidator],
  classCode: [requiredValidator],
  lecturerId: [requiredValidator]
})


