import {UserRole} from '@kbklab/api-interfaces';
import {createValidator, FieldValidator} from 'utils';
import {fuEmailValidator, requiredValidator, studentEmailValidator} from 'utils/validators';
import {CreateUserPayload, ImportLecturerPayload, LoginPayload} from './user.types';

export const createUserEmailValidator: FieldValidator<CreateUserPayload> = async (email, values) => {
  const {role} = values;
  return role === UserRole.Student ? await studentEmailValidator(email, values) : await fuEmailValidator(email, values)
}

export const createUserPayloadValidator = createValidator<CreateUserPayload>({
  email: [requiredValidator, createUserEmailValidator],
  name: [requiredValidator],
  role: [requiredValidator],
});

export const loginPayloadValidator = createValidator<LoginPayload>({
  email: [requiredValidator],
  password: [requiredValidator],
});

export const importLecturersValidator = createValidator<ImportLecturerPayload>({
  file: [requiredValidator],
})
