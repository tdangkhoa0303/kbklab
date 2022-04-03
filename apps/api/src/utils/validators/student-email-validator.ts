import {ConstraintErrorCode} from 'models';
import {FieldValidator} from '../create-validator';
import {fuStudentEmailRegex} from '../regex/fu-email-regex';

export const studentEmailValidator: FieldValidator = async (value: string) => fuStudentEmailRegex.test(value) ? null : ConstraintErrorCode.Invalid;
