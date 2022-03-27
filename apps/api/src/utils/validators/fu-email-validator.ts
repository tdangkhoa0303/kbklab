import {ConstraintErrorCode} from 'models';
import {FieldValidator} from '../create-validator';
import {fuEmailRegex} from '../regex/fu-email-regex';

export const fuEmailValidator: FieldValidator = async (email: string) => fuEmailRegex.test(email) ? null : ConstraintErrorCode.Invalid;
