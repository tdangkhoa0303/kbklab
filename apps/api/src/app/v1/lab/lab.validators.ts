import {createValidator} from '../../../utils';
import {requiredValidator} from '../../../utils/validators';
import {UpdateClassLabPayload} from '../class/class.types';

export const updateClassLabPayloadValidator = createValidator<UpdateClassLabPayload>({
  classLabId: [requiredValidator],
})
